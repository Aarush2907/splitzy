"use client";

import { useConvexQuery } from "@/hooks/use-convex-query";
import { api } from "@/convex/_generated/api";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftRight, CheckCircle2 } from "lucide-react";

export function SettlementList({
  settlements,
  isGroupSettlement = false,
  userLookupMap,
}) {
  const { data: currentUser } = useConvexQuery(api.users.getCurrentUser);

  if (!settlements || !settlements.length) {
    return (
      <Card className="glass-card">
        <CardContent className="py-12 flex flex-col items-center justify-center text-center">
             <div className="bg-muted p-4 rounded-full mb-3">
               <span className="text-3xl">🤝</span>
            </div>
          <p className="text-lg font-medium text-foreground">No settlements yet</p>
          <p className="text-muted-foreground text-sm">When you settle up, it will appear here.</p>
        </CardContent>
      </Card>
    );
  }

  // Helper to get user details from cache or look up
  const getUserDetails = (userId) => {
    // Simplified fallback
    return {
      name:
        userId === currentUser?._id
          ? "You"
          : userLookupMap[userId]?.name || "Other User",
      imageUrl: null,
      id: userId,
    };
  };

  return (
    <div className="flex flex-col gap-3">
      {settlements.map((settlement) => {
        const payer = getUserDetails(settlement.paidByUserId);
        const receiver = getUserDetails(settlement.receivedByUserId);
        const isCurrentUserPayer = settlement.paidByUserId === currentUser?._id;
        const isCurrentUserReceiver =
          settlement.receivedByUserId === currentUser?._id;

        return (
          <Card
            className="group hover:bg-muted/40 transition-all duration-200 border-border/50 hover:border-primary/20 backdrop-blur-sm shadow-none hover:shadow-md"
            key={settlement._id}
          >
            <CardContent className="py-4 px-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Settlement icon */}
                  <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-2xl flex items-center justify-center text-green-600 dark:text-green-400">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-base sm:text-lg text-foreground">
                      {isCurrentUserPayer
                        ? `You paid ${receiver.name}`
                        : isCurrentUserReceiver
                          ? `${payer.name} paid you`
                          : `${payer.name} paid ${receiver.name}`}
                    </h3>
                    <div className="flex items-center text-xs sm:text-sm text-muted-foreground gap-1.5 mt-0.5">
                      <span className="bg-muted px-1.5 py-0.5 rounded font-medium text-[10px] uppercase tracking-wide">
                        {format(new Date(settlement.date), "MMM d, yyyy")}
                      </span>
                      {settlement.note && (
                        <>
                          <span className="text-muted-foreground/40">•</span>
                          <span>{settlement.note}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-bold text-lg sm:text-xl text-foreground">
                    ₹{settlement.amount.toFixed(2)}
                  </div>
                  {isGroupSettlement ? (
                    <Badge variant="outline" className="mt-1 text-[10px] font-normal border-border">
                      Group
                    </Badge>
                  ) : (
                    <div className="text-xs sm:text-sm text-muted-foreground/80 mt-0.5 font-medium">
                      {isCurrentUserPayer ? (
                        <span className="text-green-600 dark:text-green-400">You paid</span>
                      ) : isCurrentUserReceiver ? (
                        <span className="text-green-600 dark:text-green-400">Received</span>
                      ) : (
                        <span>Settled</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}