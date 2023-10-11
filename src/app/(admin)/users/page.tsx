import { Metadata } from "next/types";
import { userColumns } from "@/components/table/user/columns";
import { TabsTable } from "@/components/tabs-table";

export const metadata: Metadata = {
  title: "Users",
  description: "Authentication forms built using the components.",
};

export default function Users() {
  const users = { all: [], todays: [] };
  return <TabsTable columns={userColumns} searchKey="name" {...users} />;
}
