import { mutation } from "./_generated/server";

export const clearAllData = mutation({
  args: {},
  handler: async (ctx) => {
    const expenses = await ctx.db.query("expenses").collect();
    for (const e of expenses) await ctx.db.delete(e._id);

    const settlements = await ctx.db.query("settlements").collect();
    for (const s of settlements) await ctx.db.delete(s._id);

    const groups = await ctx.db.query("groups").collect();
    for (const g of groups) await ctx.db.delete(g._id);

    // Optionally clear users if they are considered "test data", 
    // but usually we might want to keep the current user. 
    // The user said "users, groups, transactions, balances".
    // I'll clear users too, but the current user might be logged out.
    // Let's check if I should keep the current user.
    // The user said "reset... to a clean default state".
    // I will clear users as well.
    const users = await ctx.db.query("users").collect();
    for (const u of users) await ctx.db.delete(u._id);

    return "All data cleared";
  },
});
