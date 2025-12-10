"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/convex/_generated/api";
import { useConvexQuery } from "@/hooks/use-convex-query";
import { BarLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, ArrowLeftRight, ArrowLeft, Users, Settings } from "lucide-react";
import { ExpenseList } from "@/components/expense-list";
import { SettlementList } from "@/components/settlement-list";
import { GroupBalances } from "@/components/group-balances";
import { GroupMembers } from "@/components/group-members";

export default function GroupExpensesPage() {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("expenses");

  const { data, isLoading } = useConvexQuery(api.groups.getGroupExpenses, {
    groupId: params.id,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 flex items-center justify-center">
        <BarLoader width={"150px"} color="var(--primary)" />
      </div>
    );
  }

  const group = data?.group;
  const members = data?.members || [];
  const expenses = data?.expenses || [];
  const settlements = data?.settlements || [];
  const balances = data?.balances || [];
  const userLookupMap = data?.userLookupMap || {};

  return (
    <div className="container mx-auto py-6 max-w-5xl space-y-8 pb-24">
      {/* Header with Glass Effect */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-primary/10 via-primary/5 to-background border border-primary/10 p-6 sm:p-10 animate-fade-in-up">
        {/* Background blobs */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 h-40 w-40 rounded-full bg-blue-500/5 blur-3xl"></div>
        
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-4 left-4 sm:top-6 sm:left-6 hover:bg-background/50"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4 mr-1" /> Back
        </Button>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-8 sm:pt-4 relative z-10">
          <div className="flex items-center gap-5">
            <div className="bg-white dark:bg-card p-5 rounded-2xl shadow-sm border border-border/50">
              <Users className="h-10 w-10 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">{group?.name}</h1>
              <p className="text-muted-foreground text-lg mt-1 max-w-md line-clamp-2">{group?.description || "No description provided."}</p>
              <div className="flex items-center gap-4 mt-3">
                 <div className="flex -space-x-2">
                   {members.slice(0, 4).map((m, i) => (
                      <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[10px] font-bold">
                        {m.name?.[0]}
                      </div>
                   ))}
                   {members.length > 4 && (
                      <div className="h-8 w-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[10px] font-bold">
                        +{members.length - 4}
                      </div>
                   )}
                 </div>
                 <span className="text-sm font-medium text-muted-foreground">{members.length} members</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 w-full sm:w-auto">
            <Button asChild variant="outline" className="flex-1 sm:flex-none border-primary/20 hover:bg-primary/5 hover:text-primary">
              <Link href={`/settlements/group/${params.id}`}>
                <ArrowLeftRight className="mr-2 h-4 w-4" />
                Settle up
              </Link>
            </Button>
            <Button asChild className="flex-1 sm:flex-none shadow-lg shadow-primary/20">
              <Link href={`/expenses/new`}>
                <Plus className="mr-2 h-4 w-4" />
                Add expense
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground">
               <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Balances & Members */}
        <div className="space-y-8 order-2 lg:order-1 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <Card className="glass-card overflow-hidden">
            <CardHeader className="pb-3 border-b border-border/40 bg-muted/20">
              <CardTitle className="text-lg">Group Balances</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <GroupBalances balances={balances} />
            </CardContent>
          </Card>

          <Card className="glass-card overflow-hidden">
            <CardHeader className="pb-3 border-b border-border/40 bg-muted/20">
              <CardTitle className="text-lg">Members</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <GroupMembers members={members} />
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Activity Feed (Expenses/Settlements) */}
        <div className="lg:col-span-2 order-1 lg:order-2 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <Tabs
            defaultValue="expenses"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-6 p-1 bg-muted/50 rounded-xl h-12">
              <TabsTrigger 
                value="expenses" 
                className="rounded-lg data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm font-medium transition-all"
              >
                Expenses ({expenses.length})
              </TabsTrigger>
              <TabsTrigger 
                value="settlements" 
                className="rounded-lg data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm font-medium transition-all"
              >
                Settlements ({settlements.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="expenses" className="space-y-4 focus-visible:ring-0">
              <ExpenseList
                expenses={expenses}
                showOtherPerson={true}
                isGroupExpense={true}
                userLookupMap={userLookupMap}
              />
            </TabsContent>

            <TabsContent value="settlements" className="space-y-4 focus-visible:ring-0">
              <SettlementList
                settlements={settlements}
                isGroupSettlement={true}
                userLookupMap={userLookupMap}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}