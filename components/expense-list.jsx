"use client";

import { useConvexQuery, useConvexMutation } from "@/hooks/use-convex-query";
import { api } from "@/convex/_generated/api";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getCategoryById, getCategoryIcon } from "@/lib/expense-categories";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function ExpenseList({
  expenses,
  showOtherPerson = true,
  isGroupExpense = false,
  otherPersonId = null,
  userLookupMap = {},
}) {
  const { data: currentUser } = useConvexQuery(api.users.getCurrentUser);
  const deleteExpense = useConvexMutation(api.expenses.deleteExpense);

  if (!expenses || !expenses.length) {
    return (
      <Card className="glass-card">
        <CardContent className="py-12 flex flex-col items-center justify-center text-center">
            <div className="bg-muted p-4 rounded-full mb-3">
               <span className="text-3xl">🧾</span>
            </div>
          <p className="text-lg font-medium text-foreground">No expenses yet</p>
          <p className="text-muted-foreground text-sm">Add one to get started!</p>
        </CardContent>
      </Card>
    );
  }

  // Helper to get user details from cache or look up from expense
  const getUserDetails = (userId) => {
    // For the group context, we need to look up members from somewhere else
    // This is a simplified fallback
    return {
      name:
        userId === currentUser?._id
          ? "You"
          : userLookupMap[userId]?.name || "Other User",
      imageUrl: null,
      id: userId,
    };
  };

  // Check if the user can delete an expense (creator or payer)
  const canDeleteExpense = (expense) => {
    if (!currentUser) return false;
    return (
      expense.createdBy === currentUser._id ||
      expense.paidByUserId === currentUser._id
    );
  };

  // Handle delete expense
  const handleDeleteExpense = async (expense) => {
    // Use basic JavaScript confirm
    const confirmed = window.confirm(
      "Are you sure you want to delete this expense? This action cannot be undone."
    );

    if (!confirmed) return;

    try {
      await deleteExpense.mutate({ expenseId: expense._id });
      toast.success("Expense deleted successfully");
    } catch (error) {
      toast.error("Failed to delete expense: " + error.message);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {expenses.map((expense) => {
        const payer = getUserDetails(expense.paidByUserId, expense);
        const isCurrentUserPayer = expense.paidByUserId === currentUser?._id;
        const category = getCategoryById(expense.category);
        const CategoryIcon = getCategoryIcon(category.id);
        const showDeleteOption = canDeleteExpense(expense);

        return (
          <Card
            className="group hover:bg-muted/40 transition-all duration-200 border-border/50 hover:border-primary/20 backdrop-blur-sm shadow-none hover:shadow-md"
            key={expense._id}
          >
            <CardContent className="py-4 px-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Category icon */}
                  <div className={`p-3 rounded-2xl flex items-center justify-center transition-colors ${category.bg || 'bg-primary/10'}`}>
                    <CategoryIcon className={`h-5 w-5 ${category.color || 'text-primary'}`} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-base sm:text-lg">{expense.description}</h3>
                    <div className="flex items-center text-xs sm:text-sm text-muted-foreground gap-1.5 mt-0.5">
                       <span className="font-medium bg-muted px-1.5 py-0.5 rounded text-[10px] uppercase tracking-wide">
                        {format(new Date(expense.date), "MMM d")}
                      </span>
                      {showOtherPerson && (
                        <>
                          <span className="text-muted-foreground/40">•</span>
                          <span>
                            <span className="font-medium text-foreground">{isCurrentUserPayer ? "You" : payer.name}</span> paid
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="font-bold text-lg sm:text-xl text-primary">
                      ₹{expense.amount.toFixed(2)}
                    </div>
                    {isGroupExpense ? (
                      <Badge variant="outline" className="mt-1 text-[10px] font-normal border-border">
                        Group
                      </Badge>
                    ) : (
                      <div className="text-xs sm:text-sm text-muted-foreground/80 mt-0.5 font-medium">
                        {isCurrentUserPayer ? (
                          <span className="text-green-600 dark:text-green-400">You lent</span>
                        ) : (
                          <span className="text-red-600 dark:text-red-400">
                            {payer.name} lent
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {showDeleteOption && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full text-muted-foreground hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleDeleteExpense(expense)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete expense</span>
                    </Button>
                  )}
                </div>
              </div>

              {/* Display splits info */}
              <div className="mt-4 pt-4 border-t border-border/40 flex gap-2 flex-wrap">
                  {expense.splits.map((split, idx) => {
                    const splitUser = getUserDetails(split.userId, expense);
                    const isCurrentUser = split.userId === currentUser?._id;
                    const shouldShow =
                      showOtherPerson ||
                      (!showOtherPerson &&
                        (split.userId === currentUser?._id ||
                          split.userId === otherPersonId));

                    if (!shouldShow) return null;

                    return (
                      <Badge
                        key={idx}
                        variant="secondary"
                        className={`flex items-center gap-1.5 pr-3 py-1 font-medium bg-muted/50 hover:bg-muted ${split.paid ? "opacity-60" : ""}`}
                      >
                        <Avatar className="h-4 w-4">
                          <AvatarImage src={splitUser.imageUrl} />
                          <AvatarFallback className="text-[9px] bg-primary/20 text-primary">
                            {splitUser.name?.charAt(0) || "?"}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs">
                          {isCurrentUser ? "You" : splitUser.name} &middot; ₹{split.amount.toFixed(2)}
                        </span>
                      </Badge>
                    );
                  })}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}