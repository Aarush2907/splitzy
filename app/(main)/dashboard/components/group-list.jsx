import Link from "next/link";
import { Users, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function GroupList({ groups }) {
  if (!groups || groups.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center bg-muted/20 rounded-xl border border-dashed border-border">
        <Users className="h-10 w-10 text-muted-foreground/50 mb-3" />
        <p className="text-muted-foreground font-medium">No groups yet</p>
        <p className="text-xs text-muted-foreground mt-1 max-w-[200px]">
          Create a group to split bills with friends or housemates.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {groups.map((group) => {
        const balance = group.balance || 0;
        const hasBalance = balance !== 0;

        return (
          <Link
            href={`/group/${group.id}`}
            key={group.id}
            className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-all duration-200 group border border-transparent hover:border-border/60"
          >
            <div className="flex items-center gap-4">
              <div className="bg-linear-to-br from-primary/10 to-primary/5 p-3 rounded-xl group-hover:from-primary/20 group-hover:to-primary/10 transition-colors">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors">{group.name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                   <Badge variant="secondary" className="text-[10px] h-5 px-1.5 font-normal bg-muted text-muted-foreground">
                      {group.members.length} members
                   </Badge>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {hasBalance && (
                 <div className="text-right">
                    <span
                      className={`block text-sm font-bold ${
                        balance > 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {balance > 0 ? "+" : ""}₹{balance.toFixed(2)}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                       {balance > 0 ? "You are owed" : "You owe"}
                    </span>
                 </div>
              )}
              <ChevronRight className="h-4 w-4 text-muted-foreground/50 group-hover:text-primary transition-colors" />
            </div>
          </Link>
        );
      })}
    </div>
  );
}