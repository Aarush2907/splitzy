"use client";

import { useState } from "react";
import { useConvexMutation } from "@/hooks/use-convex-query";
import { api } from "@/convex/_generated/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Check, RefreshCw, Share2 } from "lucide-react";
import { toast } from "sonner";

export function InviteModal({ isOpen, onClose, groupId, groupName }) {
  const createInvite = useConvexMutation(api.invites.createInvite);
  const [inviteData, setInviteData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const generateInvite = async () => {
    setIsLoading(true);
    try {
      const result = await createInvite.mutate({
        type: "group",
        targetId: groupId,
        expiresInHours: 48, // Default 2 days
      });
      setInviteData(result);
    } catch (error) {
      toast.error("Failed to generate invite: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Generate on open if not exists
  if (isOpen && !inviteData && !isLoading) {
    generateInvite();
  }

  const inviteLink = inviteData
    ? `${window.location.origin}/invite/${inviteData.token}`
    : "";

  const copyToClipboard = async (text, setCopied) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Invite to {groupName}</DialogTitle>
          <DialogDescription>
            Share this link or code to add friends to the group.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <RefreshCw className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : inviteData ? (
            <>
              {/* Invite Link Section */}
              <div className="space-y-2">
                <Label>Invite Link</Label>
                <div className="flex gap-2">
                  <Input readOnly value={inviteLink} className="bg-muted/50" />
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => copyToClipboard(inviteLink, setCopiedLink)}
                  >
                    {copiedLink ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Anyone with this link can join. Expires in 48 hours.
                </p>
              </div>

              {/* Invite Code Section */}
              <div className="space-y-2">
                <Label>Room Code</Label>
                <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg border border-dashed border-primary/20">
                  <div className="flex-1 text-center">
                    <span className="text-3xl font-mono font-bold tracking-widest text-primary">
                      {inviteData.code}
                    </span>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(inviteData.code, setCopiedCode)}
                  >
                    {copiedCode ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  Enter this code in the "Join Group" screen.
                </p>
              </div>
            </>
          ) : (
            <div className="text-center py-4 text-red-500">
              Failed to load invite info.
              <Button variant="link" onClick={generateInvite}>
                Try Again
              </Button>
            </div>
          )}
        </div>

        <div className="flex justify-between sm:justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={() => {
             if (navigator.share && inviteData) {
               navigator.share({
                 title: `Join ${groupName} on Splitzy`,
                 text: `Join my group "${groupName}" on Splitzy! Use code: ${inviteData.code}`,
                 url: inviteLink
               }).catch(() => {});
             } else {
               copyToClipboard(inviteLink, setCopiedLink);
             }
          }}>
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
