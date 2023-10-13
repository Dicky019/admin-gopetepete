"use client"

import { trpc } from "@/app/_trpc/client";
import { userColumns } from "@/components/table/user/columns";
import { TabsTable } from "@/components/tabs-table";
import { IUsers } from "@/types/user";

interface UsersProps {
  all: IUsers;
  todays: IUsers;
}

export default function Users(props: UsersProps) {
  const { data } = trpc.user.getAll.useQuery(undefined, {
    initialData: props,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  
  return <TabsTable columns={userColumns} searchKey="name" {...data} />;
}
