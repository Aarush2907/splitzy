"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useConvexMutation, useConvexQuery } from "@/hooks/use-convex-query";
import { api } from "@/convex/_generated/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trash2, LogOut, UserX, Shield } from "lucide-react";
import { toast } from "sonner";

export function GroupSettingsModal({ isOpen, onClose, group, members, currentUserId }) {
  const router = useRouter();
  const deleteGroup = useConvexMutation(api.groups.deleteGroup);
  const removeMember = useConvexMutation(api.groups.removeMember);
  const leaveGroup = useConvexMutation(api.groups.leaveGroup);

  const [confirmAction, setConfirmAction] = useState(null); // { type: 'delete' | 'leave' | 'kick', data: any }
  const [isLoading, setIsLoading] = useState(false);

  const isAdmin = group?.createdBy === currentUserId;

  const handleAction = async () => {
    if (!confirmAction) return;
    setIsLoading(true);
    try {
      if (confirmAction.type === "delete") {
        await deleteGroup.mutate({ groupId: group.id });
        toast.success("Group deleted");
        router.push("/contacts");
      } else if (confirmAction.type === "leave") {
        await leaveGroup.mutate({ groupId: group.id });
        toast.success("Left group");
        router.push("/contacts");
      } else if (confirmAction.type === "kick") {
        await removeMember.mutate({ groupId: group.id, userId: confirmAction.data.id });
        toast.success("Member removed");
      }
      onClose();
    } catch (error) {
      toast.error(error.message || "Action failed");
    } finally {
      setIsLoading(false);
      setConfirmAction(null);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Group Settings</DialogTitle>
            <DialogDescription>
              Manage group members and settings.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Members List (Admin View) */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Members</h3>
              <ScrollArea className="h-[200px] rounded-md border p-2">
                <div className="space-y-2">
                  {members.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={member.imageUrl} />
                          <AvatarFallback>{member.name?.[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium flex items-center gap-1">
                            {member.name}
                            {member.id === group.createdBy && (
                              <Shield className="h-3 w-3 text-primary fill-primary/20" />
                            )}
                            {member.id === currentUserId && (
                              <span className="text-xs text-muted-foreground">(You)</span>
                            )}
                          </span>
                          <span className="text-xs text-muted-foreground">{member.email}</span>
                        </div>
                      </div>
                      
                      {isAdmin && member.id !== currentUserId && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:text-red-500"
                          onClick={() => setConfirmAction({ type: "kick", data: member })}
                        >
                          <UserX className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Danger Zone */}
            <div className="space-y-2 pt-4 border-t">
              <h3 className="text-sm font-medium text-red-500">Danger Zone</h3>
              {isAdmin ? (
                <Button 
                  variant="destructive" 
                  className="w-full" 
                  onClick={() => setConfirmAction({ type: "delete" })}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Group
                </Button>
              ) : (
                <Button 
                  variant="destructive" 
                  className="w-full"
                  onClick={() => setConfirmAction({ type: "leave" })}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Leave Group
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!confirmAction} onOpenChange={(open) => !open && setConfirmAction(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              {confirmAction?.type === "delete" && "This action cannot be undone. This will permanently delete the group and all its expenses."}
              {confirmAction?.type === "leave" && "Are you sure you want to leave this group?"}
              {confirmAction?.type === "kick" && `Are you sure you want to remove ${confirmAction?.data?.name} from the group?`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleAction}
              className="bg-red-500 hover:bg-red-600 focus:ring-red-500"
            >
              {isLoading ? "Processing..." : "Confirm"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
