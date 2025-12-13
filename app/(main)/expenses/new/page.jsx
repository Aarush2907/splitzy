"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ExpenseForm } from "./components/expense-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

export default function NewExpensePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const groupId = searchParams.get("groupId");
  const personId = searchParams.get("personId");

  return (
    <div className="container max-w-3xl mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-5xl gradient-title">Add a new expense</h1>
        <p className="text-muted-foreground mt-1">
          Record a new expense to split with others
        </p>
      </div>

      <Card>
        <CardContent>
          <Tabs className="pb-3" defaultValue={groupId ? "group" : "individual"}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="individual" disabled={!!groupId}>Individual Expense</TabsTrigger>
              <TabsTrigger value="group" disabled={!!personId}>Group Expense</TabsTrigger>
            </TabsList>
            <TabsContent value="individual" className="mt-0">
              <ExpenseForm
                type="individual"
                initialPersonId={personId || undefined}
                onSuccess={(id) => router.push(`/person/${id}`)}
              />
            </TabsContent>
            <TabsContent value="group" className="mt-0">
              <ExpenseForm
                type="group"
                initialGroupId={groupId || undefined}
                onSuccess={(id) => router.push(`/group/${id}`)}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}