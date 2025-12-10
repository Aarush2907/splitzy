"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";

export function ExpenseSummary({ monthlySpending, totalSpent }) {
  // Format monthly data for chart
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  // Ensure monthlySpending is an array
  const spendingData = Array.isArray(monthlySpending) ? monthlySpending : [];

  const chartData =
    spendingData.map((item) => {
      const date = new Date(item.month);
      return {
        name: monthNames[date.getMonth()],
        amount: item.total,
      };
    }) || [];
    
  // Fill in missing months for the last 6 months window if needed, or just show what we have
  // For simplicity using what we have

  // Get current year
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  
  const currentMonthTotal = spendingData.find(m => new Date(m.month).getMonth() === currentMonth)?.total || 0;
  
  // Calculate average spending
  const averageSpending = spendingData.length > 0 
    ? spendingData.reduce((acc, curr) => acc + curr.total, 0) / spendingData.length 
    : 0;

  const isHighSpending = currentMonthTotal > averageSpending;

  return (
    <Card className="glass-card shadow-lg border-none">
      <CardHeader>
        <div className="flex items-center justify-between">
            <div>
                <CardTitle className="text-lg font-bold">Expense Trends</CardTitle>
                <CardDescription>Track your spending habits over time</CardDescription>
            </div>
            <div className="p-2 bg-primary/10 rounded-full">
                <TrendingUp className="h-5 w-5 text-primary" />
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/10">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Total this month</p>
            <h3 className="text-3xl font-extrabold text-primary">
              ₹{currentMonthTotal.toFixed(2)}
            </h3>
            <div className="flex items-center mt-2 text-xs font-medium">
               {isHighSpending ? (
                 <span className="text-red-500 flex items-center ">
                   <TrendingUp className="h-3 w-3 mr-1" /> Higher than avg
                 </span>
               ) : (
                 <span className="text-green-500 flex items-center">
                   <TrendingDown className="h-3 w-3 mr-1" /> Lower than avg
                 </span>
               )}
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-muted/40 border border-border/50">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Total this year</p>
            <h3 className="text-3xl font-extrabold">
              ₹{totalSpent?.toFixed(2) || "0.00"}
            </h3>
             <p className="text-xs text-muted-foreground mt-2">
               Avg. ₹{averageSpending.toFixed(0)} / month
             </p>
          </div>
        </div>

        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="oklch(var(--border))" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: 'oklch(var(--muted-foreground))', fontSize: 12 }} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: 'oklch(var(--muted-foreground))', fontSize: 12 }}
                tickFormatter={(value) => `₹${value}`}
              />
              <Tooltip
                cursor={{ fill: 'oklch(var(--muted))', opacity: 0.3 }}
                contentStyle={{ 
                    borderRadius: '12px', 
                    border: '1px solid oklch(var(--border))',
                    backgroundColor: 'oklch(var(--popover))',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
                }}
                formatter={(value) => [`₹${value.toFixed(2)}`, "Spending"]}
              />
              <Bar 
                dataKey="amount" 
                fill="oklch(var(--primary))" 
                radius={[6, 6, 0, 0]} 
                barSize={32}
                animationDuration={1500}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}