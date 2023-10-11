import { Metadata } from "next/types";
import { ruteColumns } from "@/components/table/rute/columns";
import { TabsTable } from "@/components/tabs-table";

export const metadata: Metadata = {
  title: "Rute",
  description: "Authentication forms built using the components.",
};

export default  function Rutes() {
  const rutes = { all: [], todays: [] };
  return <TabsTable columns={ruteColumns} searchKey="name" {...rutes} />;
}
