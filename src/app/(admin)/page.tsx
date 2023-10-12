import { Metadata } from "next/types";
import { driverColumns } from "@/components/table/driver/columns";
import { TabsTable } from "@/components/tabs-table";
import { serverClient } from "@/utils/server";

export const metadata: Metadata = {
  title: "Drivers",
  description: "Authentication forms built using the components.",
};

export default async function Drivers() {
  const trpc = await serverClient();
  const drivers = await trpc.driver.getAll();
  return (
    <TabsTable
      // isAdd={AddEnum.driver}
      columns={driverColumns}
      searchKey="namaLengkap"
      {...drivers}
    />
  );
}
