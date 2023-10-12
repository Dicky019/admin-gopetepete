import { Metadata } from "next/types";
import { userColumns } from "@/components/table/user/columns";
import { TabsTable } from "@/components/tabs-table";
import { serverClient } from "@/utils/server";

export const metadata: Metadata = {
  title: "Users",
  description: "Authentication forms built using the components.",
};

export default async function Users() {
  const trpc = await serverClient();
  const users = await trpc.user.getAll();
  return <TabsTable columns={userColumns} searchKey="name" {...users} />;
}
