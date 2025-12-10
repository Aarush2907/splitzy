import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowUpRight, ArrowDownLeft, CheckCircle2 } from "lucide-react";

export function BalanceSummary({ balances }) {
  if (!balances) return null;

  const { oweDetails } = balances;
  
  if (!oweDetails) return null;
  
  const hasOwed = oweDetails?.youAreOwedBy?.length > 0;
  const hasOwing = oweDetails?.youOwe?.length > 0;

  return (
    <div className="space-y-6">
      {!hasOwed && !hasOwing && (
        <div className="flex flex-col items-center justify-center py-8 text-center bg-green-50/50 dark:bg-green-900/10 rounded-xl border border-green-100 dark:border-green-800">
          <CheckCircle2 className="h-10 w-10 text-green-500 mb-2" />
          <p className="text-muted-foreground font-medium">Fully settled! No debts.</p>
        </div>
      )}

      {hasOwed && (
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center mb-4">
            <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
            Owed to you
          </h3>
          <div className="space-y-3">
            {oweDetails.youAreOwedBy.map((item) => (
              <Link
                href={`/person/${item.userId}`}
                key={item.userId}
                className="flex items-center justify-between group p-3 rounded-xl hover:bg-muted/50 transition-colors border border-transparent hover:border-border/60"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border-2 border-background shadow-sm">
                    <AvatarImage src={item.imageUrl} />
                    <AvatarFallback className="bg-primary/10 text-primary font-bold">{item.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-foreground">{item.name}</span>
                </div>
                <div className="text-right">
                  <span className="block font-bold text-green-600">
                    +₹{item.amount.toFixed(2)}
                  </span>
                  <p className="text-[10px] text-muted-foreground flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                     Settle <ArrowUpRight className="h-3 w-3" />
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {hasOwing && (
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center mb-4">
            <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>
            You owe These People
          </h3>
          <div className="space-y-3">
            {oweDetails.youOwe.map((item) => (
              <Link
                href={`/person/${item.userId}`}
                key={item.userId}
                className="flex items-center justify-between group p-3 rounded-xl hover:bg-muted/50 transition-colors border border-transparent hover:border-border/60"
              >
                <div className="flex items-center gap-3">
                   <Avatar className="h-10 w-10 border-2 border-background shadow-sm">
                    <AvatarImage src={item.imageUrl} />
                    <AvatarFallback className="bg-destructive/10 text-destructive font-bold">{item.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-foreground">{item.name}</span>
                </div>
                <div className="text-right">
                  <span className="block font-bold text-red-600">
                    -₹{item.amount.toFixed(2)}
                  </span>
                  <p className="text-[10px] text-muted-foreground flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                     Pay <ArrowDownLeft className="h-3 w-3" />
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}