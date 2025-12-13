"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useConvexMutation, useConvexQuery } from "@/hooks/use-convex-query";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, CheckCircle2, XCircle, Users } from "lucide-react";
import { toast } from "sonner";

export default function InvitePage() {
  const params = useParams();
  const router = useRouter();
  const { user, isLoaded: isUserLoaded, isSignedIn } = useUser();
  const [isRedeeming, setIsRedeeming] = useState(false);
  
  const token = params.token;

  const { data: inviteData, isLoading: isInviteLoading } = useConvexQuery(
    api.invites.getInvite,
    { token }
  );

  const redeemInvite = useConvexMutation(api.invites.redeemInvite);

  const handleJoin = async () => {
    if (!isSignedIn) {
      // Redirect to sign in, preserving the current URL as redirect
      router.push(`/sign-in?redirect_url=${encodeURIComponent(window.location.href)}`);
      return;
    }

    setIsRedeeming(true);
    try {
      const result = await redeemInvite.mutate({ token });
      if (result.success) {
        toast.success("Successfully joined!");
        router.push(`/group/${result.groupId}`);
      }
    } catch (error) {
      toast.error(error.message || "Failed to join");
    } finally {
      setIsRedeeming(false);
    }
  };

  if (!isUserLoaded || isInviteLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!inviteData?.valid) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md border-red-200 bg-red-50 dark:bg-red-950/10">
          <CardHeader className="text-center">
            <div className="mx-auto bg-red-100 dark:bg-red-900/20 p-3 rounded-full w-fit mb-2">
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
            <CardTitle className="text-red-700">Invalid Invite</CardTitle>
            <CardDescription className="text-red-600/80">
              {inviteData?.error || "This invite link is invalid or has expired."}
            </CardDescription>
          </CardHeader>
          <CardFooter className="justify-center">
            <Button variant="outline" onClick={() => router.push("/")}>
              Go Home
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const { invite } = inviteData;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <Card className="w-full max-w-md shadow-xl border-primary/10">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-2">
            <Users className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">You're invited!</CardTitle>
          <CardDescription>
            <span className="font-semibold text-foreground">{invite.inviterName}</span> invited you to join
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="bg-muted/50 p-6 rounded-xl text-center space-y-2 border border-border/50">
            <h3 className="text-xl font-bold text-primary">{invite.targetName}</h3>
            {invite.targetDescription && (
              <p className="text-sm text-muted-foreground">{invite.targetDescription}</p>
            )}
          </div>

          {!isSignedIn && (
            <div className="text-center text-sm text-muted-foreground bg-amber-50 dark:bg-amber-950/10 p-3 rounded-lg border border-amber-200 dark:border-amber-900/20">
              You need to sign in to join this group.
            </div>
          )}
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <Button 
            className="w-full text-lg py-6 shadow-lg shadow-primary/20" 
            size="lg" 
            onClick={handleJoin}
            disabled={isRedeeming}
          >
            {isRedeeming ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Joining...
              </>
            ) : isSignedIn ? (
              "Join Group"
            ) : (
              "Sign in to Join"
            )}
          </Button>
          <Button variant="ghost" className="w-full" onClick={() => router.push("/")}>
            Cancel
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
