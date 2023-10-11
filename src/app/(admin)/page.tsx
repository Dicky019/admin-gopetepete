import { Metadata } from "next/types";
import { driverColumns } from "@/components/table/driver/columns";
import { TabsTable } from "@/components/tabs-table";

export const metadata: Metadata = {
  title: "Drivers",
  description: "Authentication forms built using the components.",
};

export default function Drivers() {
  const drivers = { all: [], todays: [] };
  return (
    <TabsTable
      // isAdd={AddEnum.driver}
      columns={driverColumns}
      searchKey="namaLengkap"
      {...drivers}
    />
  );
}
