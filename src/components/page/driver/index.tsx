"use client"

import { trpc } from "@/app/_trpc/client";
import { driverColumns } from "@/components/table/driver/columns";
import { TabsTable } from "@/components/tabs-table";
import { IDrivers } from "@/types/driver";

interface DriversProps {
  all: IDrivers;
  todays: IDrivers;
}

export default function Drivers(props: DriversProps) {
  const { data } = trpc.driver.getAll.useQuery(undefined, {
    initialData: props,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return (
    <TabsTable columns={driverColumns} searchKey="namaLengkap" {...data} />
  );
}
