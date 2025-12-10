"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/convex/_generated/api";
import { useConvexQuery } from "@/hooks/use-convex-query";
import { BarLoader } from "react-spinners";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, ArrowLeftRight, ArrowLeft } from "lucide-react";
import { ExpenseList } from "@/components/expense-list";
import { SettlementList } from "@/components/settlement-list";

export default function PersonExpensesPage() {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("expenses");

  const { data, isLoading } = useConvexQuery(
    api.expenses.getExpensesBetweenUsers,
    { userId: params.id }
  );

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 flex items-center justify-center">
        <BarLoader width={"150px"} color="var(--primary)" />
      </div>
    );
  }

  const otherUser = data?.otherUser;
  const expenses = data?.expenses || [];
  const settlements = data?.settlements || [];
  const balance = data?.balance || 0;

  return (
    <div className="container mx-auto py-6 max-w-5xl space-y-8 pb-24">
      {/* Header with Glass Effect */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-primary/10 via-primary/5 to-background border border-primary/10 p-6 sm:p-10 animate-fade-in-up">
        {/* Background blobs */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-primary/5 blur-3xl"></div>
        
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
            <Avatar className="h-20 w-20 border-4 border-background shadow-lg">
              <AvatarImage src={otherUser?.imageUrl} />
              <AvatarFallback className="text-2xl font-bold bg-primary/20 text-primary">
                {otherUser?.name?.charAt(0) || "?"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">{otherUser?.name}</h1>
              <p className="text-muted-foreground text-lg mt-1">{otherUser?.email}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 w-full sm:w-auto">
            <Button asChild variant="outline" className="flex-1 sm:flex-none border-primary/20 hover:bg-primary/5 hover:text-primary">
              <Link href={`/settlements/user/${params.id}`}>
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
          </div>
        </div>
      </div>

      {/* Balance card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="order-2 lg:order-1 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <Card className="glass-card overflow-hidden sticky top-6">
                <CardContent className="p-6">
                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Current Balance</h3>
                    <div className="flex flex-col gap-1 mb-4">
                        <div className={`text-4xl font-extrabold ${balance > 0 ? "text-green-600 dark:text-green-400" : balance < 0 ? "text-red-600 dark:text-red-400" : "text-muted-foreground"}`}>
                        ₹{Math.abs(balance).toFixed(2)}
                        </div>
                        <p className="text-sm font-medium text-muted-foreground">
                            {balance === 0 ? "You are all settled up" : balance > 0 ? `${otherUser?.name} owes you` : `You owe ${otherUser?.name}`}
                        </p>
                    </div>
                    {balance !== 0 && (
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                            <div className={`h-full ${balance > 0 ? "bg-green-500" : "bg-red-500"} w-full`} />
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>

        {/* Tabs for expenses and settlements */}
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
                    showOtherPerson={false}
                    otherPersonId={params.id}
                    userLookupMap={otherUser ? { [otherUser.id]: otherUser } : {}}
                />
                </TabsContent>

                <TabsContent value="settlements" className="space-y-4 focus-visible:ring-0">
                <SettlementList
                    settlements={settlements}
                    userLookupMap={otherUser ? { [otherUser.id]: otherUser } : {}}
                />
                </TabsContent>
            </Tabs>
        </div>
      </div>
    </div>
  );
}