import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";

// Helper to generate a random code
function generateCode(length = 6) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // No I, O, 1, 0 to avoid confusion
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Helper to generate a random token
function generateToken() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Create a new invite
export const createInvite = mutation({
  args: {
    type: v.string(), // "group"
    targetId: v.string(), // groupId
    maxUses: v.optional(v.number()), // e.g., 100
    expiresInHours: v.optional(v.number()), // e.g., 24
  },
  handler: async (ctx, args) => {
    const user = await ctx.runQuery(internal.users.getCurrentUser);

    // Verify permission (must be group member)
    if (args.type === "group") {
      const group = await ctx.db.get(args.targetId);
      if (!group) throw new Error("Group not found");
      const isMember = group.members.some((m) => m.userId === user._id);
      if (!isMember) throw new Error("You must be a member to invite others");
    }

    // Check for existing active invite for this user/target to reuse?
    // For now, let's just create a new one to allow multiple links (e.g. one for WhatsApp, one for Email)
    // Or we could reuse. Let's create new for flexibility.

    const token = generateToken();
    const code = generateCode();
    
    const expiresAt = args.expiresInHours 
      ? Date.now() + args.expiresInHours * 60 * 60 * 1000 
      : undefined;

    const inviteId = await ctx.db.insert("invites", {
      token,
      code,
      type: args.type,
      targetId: args.targetId,
      createdBy: user._id,
      expiresAt,
      maxUses: args.maxUses,
      usageCount: 0,
      status: "active",
    });

    return { inviteId, token, code };
  },
});

// Get invite details (publicly accessible via token/code, but we validate inside)
export const getInvite = query({
  args: {
    token: v.optional(v.string()),
    code: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    if (!args.token && !args.code) throw new Error("Token or code required");

    let invite;
    if (args.token) {
      invite = await ctx.db
        .query("invites")
        .withIndex("by_token", (q) => q.eq("token", args.token))
        .first();
    } else {
      invite = await ctx.db
        .query("invites")
        .withIndex("by_code", (q) => q.eq("code", args.code.toUpperCase()))
        .first();
    }

    if (!invite || invite.status !== "active") {
      return { valid: false, error: "Invite not found or expired" };
    }

    if (invite.expiresAt && Date.now() > invite.expiresAt) {
      return { valid: false, error: "Invite expired" };
    }

    if (invite.maxUses && invite.usageCount >= invite.maxUses) {
      return { valid: false, error: "Invite usage limit reached" };
    }

    // Fetch target details
    let targetName = "Unknown";
    let targetDescription = "";
    
    if (invite.type === "group") {
      const group = await ctx.db.get(invite.targetId);
      if (group) {
        targetName = group.name;
        targetDescription = group.description;
      }
    }

    const inviter = await ctx.db.get(invite.createdBy);

    return {
      valid: true,
      invite: {
        type: invite.type,
        targetName,
        targetDescription,
        inviterName: inviter?.name || "Someone",
      },
    };
  },
});

// Redeem an invite
export const redeemInvite = mutation({
  args: {
    token: v.optional(v.string()),
    code: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.runQuery(internal.users.getCurrentUser);

    if (!args.token && !args.code) throw new Error("Token or code required");

    let invite;
    if (args.token) {
      invite = await ctx.db
        .query("invites")
        .withIndex("by_token", (q) => q.eq("token", args.token))
        .first();
    } else {
      invite = await ctx.db
        .query("invites")
        .withIndex("by_code", (q) => q.eq("code", args.code.toUpperCase()))
        .first();
    }

    // Validation
    if (!invite || invite.status !== "active") throw new Error("Invalid invite");
    if (invite.expiresAt && Date.now() > invite.expiresAt) throw new Error("Invite expired");
    if (invite.maxUses && invite.usageCount >= invite.maxUses) throw new Error("Invite limit reached");

    // Logic for Group Invite
    if (invite.type === "group") {
      const group = await ctx.db.get(invite.targetId);
      if (!group) throw new Error("Group no longer exists");

      // Check if already a member
      const isMember = group.members.some((m) => m.userId === user._id);
      if (isMember) {
        return { success: true, message: "You are already a member of this group", groupId: group._id };
      }

      // Add to group
      const newMembers = [
        ...group.members,
        { userId: user._id, role: "member", joinedAt: Date.now() },
      ];

      await ctx.db.patch(group._id, { members: newMembers });
    }

    // Update invite usage
    await ctx.db.patch(invite._id, {
      usageCount: invite.usageCount + 1,
      status: (invite.maxUses && invite.usageCount + 1 >= invite.maxUses) ? "expired" : "active"
    });

    return { success: true, groupId: invite.targetId };
  },
});
