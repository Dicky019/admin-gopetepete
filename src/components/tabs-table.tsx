"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { DataTable, DataTableProps } from "./table/data-table";
import { Button } from "./ui/button";
import Link from "next/link";
import { trpc } from "@/app/_trpc/client";
import { toast } from "sonner";
import { usePathname } from "next/navigation";

interface TabsTableProps<TData, TValue> {
  todays: DataTableProps<TData, TValue>["data"];
  all: DataTableProps<TData, TValue>["data"];
  searchKey: DataTableProps<TData, TValue>["searchKey"];
  columns: DataTableProps<TData, TValue>["columns"];
  isCreate?: boolean;
}

export function TabsTable<TData, TValue>({
  todays,
  all,
  searchKey,
  columns,
  isCreate = false,
}: TabsTableProps<TData, TValue>) {
  const trpcContext = trpc.useContext();
  const pathName = usePathname();

  const { mutateAsync: mutateDriver, isLoading: isLoadingDriver } =
    trpc.driver.create.useMutation({
      onSettled() {
        trpcContext.driver.getAll.invalidate();
      },
    });

  const { mutateAsync: mutateUser, isLoading: isLoadingUser } =
    trpc.user.create.useMutation({
      onSettled() {
        trpcContext.user.getAll.invalidate();
      },
    });

  async function createDriver() {
    const changeStatus = mutateDriver();
    toast.promise(changeStatus, {
      loading: "Loading...",
      success: (data) => {
        return `Berhasil create driver ${data.user.name}`;
      },
      error: "Error",
    });
  }

  async function createUser() {
    const changeStatus = mutateUser();
    toast.promise(changeStatus, {
      loading: "Loading...",
      success: (data) => {
        return `Berhasil create user ${data.name}`;
      },
      error: "Error",
    });
  }

  const isUser = pathName === "/users";

  const isLoading = isLoadingDriver || isLoadingUser;

  return (
    <Tabs defaultValue="today">
      <div className="flex flex-row justify-between">
        <TabsList>
          <TabsTrigger value="today">Today {todays.length}</TabsTrigger>
          <TabsTrigger value="all">All {all.length}</TabsTrigger>
        </TabsList>

        {isCreate ? (
          <Button disabled={isLoading} asChild variant="outline" size="sm">
            <Link href="/routes/create">Create</Link>
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            disabled={isLoading}
            onClick={isUser ? createUser : createDriver}
          >
            Create
          </Button>
        )}

      </div>
      <TabsContent value="today">
        <DataTable searchKey={searchKey} data={todays} columns={columns} />
      </TabsContent>
      <TabsContent value="all">
        <DataTable searchKey={searchKey} data={all} columns={columns} />
      </TabsContent>
    </Tabs>
  );
}

//
