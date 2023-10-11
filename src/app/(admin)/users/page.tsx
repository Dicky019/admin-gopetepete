import { Metadata } from "next/types";
import { getsUser } from "@/server/user/gets";
import { userColumns } from "@/components/table/user/columns";
import { TabsTable } from "@/components/tabs/tabs-table";
import { AddEnum } from "@/lib/enum";

export const metadata: Metadata = {
  title: "Users",
  description: "Authentication forms built using the components.",
};

export default async function Users() {
  const users = await getsUser();
  return (
    <TabsTable
      // isAdd={AddEnum.user}
      columns={userColumns}
      searchKey="name"
      {...users}
    />
  );
}
