import { Metadata } from "next/types";
import { driverColumns } from "~/components/table/driver/columns";
import { TabsTable } from "~/components/tabs/tabs-table";
import { AddEnum } from "~/lib/enum";
import { getDrivers } from "~/server/driver/gets";

export const metadata: Metadata = {
  title: "Drivers",
  description: "Authentication forms built using the components.",
};

export default async function Home() {
  const drivers = await getDrivers();
  return (
    <TabsTable
      // isAdd={AddEnum.driver}
      columns={driverColumns}
      searchKey="namaLengkap"
      {...drivers}
    />
  );
}
