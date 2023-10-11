import { Metadata } from "next/types";
import { getsRute } from "@/server/rute/gets";
import { ruteColumns } from "@/components/table/rute/columns";
import { TabsTable } from "@/components/tabs/tabs-table";
import { AddEnum } from "@/lib/enum";

export const metadata: Metadata = {
  title: "Rute",
  description: "Authentication forms built using the components.",
};

export default async function Rute() {
  const rutes = await getsRute();

  return (
    <TabsTable
      isAdd={AddEnum.rute}
      columns={ruteColumns}
      searchKey="name"
      {...rutes}
    />
  );
}
