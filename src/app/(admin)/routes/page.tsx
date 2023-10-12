import { Metadata } from "next/types";
import { ruteColumns } from "@/components/table/rute/columns";
import { TabsTable } from "@/components/tabs-table";
import { serverClient } from "@/utils/server";

export const metadata: Metadata = {
  title: "Rute",
  description: "Authentication forms built using the components.",
};

export default async function Rutes() {
  const trpc = await serverClient();
  const rutes = await trpc.rute.getAll();
  return <TabsTable columns={ruteColumns} searchKey="name" {...rutes} />;
}
