"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { api } from "@/convex/_generated/api";
import { useConvexQuery } from "@/hooks/use-convex-query";
import { BarLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Users, User, ChevronRight } from "lucide-react";
import { CreateGroupModal } from "./_components/create-group-modal";

export default function ContactsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(() => {
    if (typeof window !== "undefined") {
      return searchParams.get("createGroup") === "true";
    }
    return false;
  });

  const { data, isLoading } = useConvexQuery(api.contacts.getAllContacts);

  // Check for the createGroup parameter when the component mounts
  useEffect(() => {
    const createGroupParam = searchParams.get("createGroup");

    if (createGroupParam === "true") {
      // Remove the parameter from the URL
      const url = new URL(window.location.href);
      url.searchParams.delete("createGroup");

      // Replace the current URL without the parameter
      router.replace(url.pathname + url.search);
    }
  }, [searchParams, router]);

  if (isLoading) {
    return (
      <div className="container mx-auto py-12">
        <BarLoader width={"100%"} color="#36d7b7" />
      </div>
    );
  }

  const { users, groups } = data || { users: [], groups: [] };

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold gradient-title leading-tight">Contacts</h1>
          <p className="text-muted-foreground mt-1">Manage your friends and expense groups</p>
        </div>
        <Button onClick={() => setIsCreateGroupModalOpen(true)} size="lg" className="shadow-lg hover:shadow-xl transition-all">
          <Plus className="mr-2 h-4 w-4" />
          Create Group
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Individual Contacts */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold tracking-tight">People</h2>
            <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-full">{users.length} contacts</span>
          </div>
          
          {users.length === 0 ? (
             <div className="border-2 border-dashed border-muted-foreground/25 rounded-xl flex flex-col items-center justify-center py-12 px-4 text-center hover:bg-muted/10 transition-colors">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <User className="h-8 w-8 text-primary/60" />
              </div>
              <h3 className="font-semibold text-lg mb-1">No contacts yet</h3>
              <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                Add an expense with someone to see them appear here.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {users.map((user) => (
                <Link key={user.id} href={`/person/${user.id}`} className="group block">
                  <Card className="hover:shadow-md transition-all duration-300 border-transparent hover:border-primary/20 bg-card/50 hover:bg-card">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-12 w-12 border-2 border-background shadow-sm group-hover:scale-105 transition-transform">
                            <AvatarImage src={user.imageUrl} />
                            <AvatarFallback className="bg-primary/10 text-primary font-bold text-lg">
                              {user.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-base group-hover:text-primary transition-colors">{user.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {user.email}
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Groups */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold tracking-tight">Groups</h2>
            <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-full">{groups.length} groups</span>
          </div>
          
          {groups.length === 0 ? (
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-xl flex flex-col items-center justify-center py-12 px-4 text-center hover:bg-muted/10 transition-colors cursor-pointer" onClick={() => setIsCreateGroupModalOpen(true)}>
              <div className="bg-primary/10 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform">
                <Users className="h-8 w-8 text-primary/60" />
              </div>
              <h3 className="font-semibold text-lg mb-1">No groups yet</h3>
              <p className="text-muted-foreground text-sm max-w-xs mx-auto mb-4">
                Create a group to start tracking shared expenses with friends.
              </p>
              <Button variant="outline" size="sm" className="mt-2">Create your first group</Button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {groups.map((group) => (
                <Link key={group.id} href={`/groups/${group.id}`} className="group block">
                  <Card className="hover:shadow-md transition-all duration-300 border-transparent hover:border-primary/20 bg-card/50 hover:bg-card">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="bg-primary/10 p-3 rounded-xl shadow-sm group-hover:bg-primary/20 transition-colors">
                            <Users className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <p className="font-semibold text-base group-hover:text-primary transition-colors">{group.name}</p>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
                              {group.memberCount} members
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>

      <CreateGroupModal
        isOpen={isCreateGroupModalOpen}
        onClose={() => setIsCreateGroupModalOpen(false)}
        onSuccess={(groupId) => {
          router.push(`/groups/${groupId}`);
        }}
      />
    </div>
  );
}