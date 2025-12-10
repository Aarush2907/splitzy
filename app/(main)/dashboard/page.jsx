"use client";

import { api } from "@/convex/_generated/api";
import { useConvexQuery } from "@/hooks/use-convex-query";
import { BarLoader } from "react-spinners";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Users, Wallet, ChevronRight, TrendingUp } from "lucide-react";
import Link from "next/link";
import { ExpenseSummary } from "./components/expense-summary";
import { BalanceSummary } from "./components/balance-summary";
import { GroupList } from "./components/group-list";

export default function Dashboard() {
  const { data: user } = useConvexQuery(api.users.getCurrentUser);
  const { data: balances, isLoading: balancesLoading } = useConvexQuery(
    api.dashboard.getUserBalances
  );

  const { data: groups, isLoading: groupsLoading } = useConvexQuery(
    api.dashboard.getUserGroups
  );

  const { data: totalSpent, isLoading: totalSpentLoading } = useConvexQuery(
    api.dashboard.getTotalSpent
  );

  const { data: monthlySpending, isLoading: monthlySpendingLoading } =
    useConvexQuery(api.dashboard.getMonthlySpending);

  const isLoading =
    balancesLoading ||
    groupsLoading ||
    totalSpentLoading ||
    monthlySpendingLoading;

  return (
    <div className="container max-w-5xl mx-auto py-6 space-y-8 pb-24">
      {isLoading ? (
        <div className="w-full h-[60vh] flex flex-col items-center justify-center gap-4">
          <BarLoader width={"150px"} color="var(--primary)" />
          <p className="text-muted-foreground animate-pulse">Loading your happiness...</p>
        </div>
      ) : (
        <>
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in-up">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">
                Namaste, <span className="gradient-text">{user?.name?.split(' ')[0] || "Friend"}</span> 👋
              </h1>
              <p className="text-muted-foreground text-lg mt-1">
                Here&apos;s what&apos;s happening with your expenses.
              </p>
            </div>
            
            <div className="flex gap-3">
               <Button asChild size="lg" className="rounded-full shadow-lg hover:shadow-primary/25 transition-all duration-300">
                <Link href="/expenses/new">
                  <Plus className="mr-2 h-5 w-5" />
                  Add New Expense
                </Link>
              </Button>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            {/* Total Balance Card */}
            <Card className="glass-card border-none relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                 <Wallet className="h-24 w-24 -rotate-12" />
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Net Balance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold tracking-tight">
                  {balances?.totalBalance > 0 ? (
                    <span className="text-green-600">
                      +₹{balances?.totalBalance.toFixed(2)}
                    </span>
                  ) : balances?.totalBalance < 0 ? (
                    <span className="text-red-600">
                      -₹{Math.abs(balances?.totalBalance).toFixed(2)}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">₹0.00</span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-2 font-medium">
                  {balances?.totalBalance > 0
                    ? "You are doing great! 🎉"
                    : balances?.totalBalance < 0
                      ? "Time to settle up soon."
                      : "All settled up! Peace of mind."}
                </p>
              </CardContent>
            </Card>

            {/* You are owed */}
            <Card className="glass-card border-none hover:-translate-y-1 transition-transform duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  You are owed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">
                  ₹{(balances?.youAreOwed || 0).toFixed(2)}
                </div>
                <div className="flex items-center gap-2 mt-2">
                   <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                   <p className="text-xs text-muted-foreground font-medium">
                    Collect from {balances?.oweDetails?.youAreOwedBy?.length || 0} friends
                   </p>
                </div>
              </CardContent>
            </Card>

            {/* You owe */}
            <Card className="glass-card border-none hover:-translate-y-1 transition-transform duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  You owe
                </CardTitle>
              </CardHeader>
              <CardContent>
                 {balances?.oweDetails?.youOwe?.length > 0 ? (
                   <>
                    <div className="text-3xl font-bold text-red-600">
                      ₹{(balances?.youOwe || 0).toFixed(2)}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                      <p className="text-xs text-muted-foreground font-medium">
                        To {balances?.oweDetails?.youOwe?.length || 0} friends
                      </p>
                    </div>
                   </>
                 ) : (
                   <>
                    <div className="text-3xl font-bold text-muted-foreground">₹0.00</div>
                    <p className="text-xs text-muted-foreground mt-2 font-medium">
                      Debt-free life! ✨
                    </p>
                   </>
                 )}
              </CardContent>
            </Card>
          </div>

          {/* Main Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left/Main Column - Charts & Activity */}
            <div className="lg:col-span-2 space-y-6 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <div className="relative">
                 <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                       <TrendingUp className="h-5 w-5 text-primary" />
                       Spending
                    </h2>
                 </div>
                 <ExpenseSummary
                    monthlySpending={monthlySpending || []}
                    totalSpent={totalSpent || 0}
                  />
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Your Groups
                  </h2>
                   <Link href="/contacts?createGroup=true" className="text-sm text-primary font-medium hover:underline">
                      + New Group
                   </Link>
                </div>
                
                <Card className="glass-card">
                  <CardContent className="p-0">
                    <GroupList groups={groups} />
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Right Column - Balance Details */}
            <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <Card className="glass-card h-full">
                <CardHeader className="pb-4 border-b border-border/40">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Balance Details</CardTitle>
                    <Button variant="ghost" size="sm" asChild className="hover:bg-primary/10 hover:text-primary">
                      <Link href="/contacts">
                        View all
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <BalanceSummary balances={balances} />
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      )}
    </div>
  );
}