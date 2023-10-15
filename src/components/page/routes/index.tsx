"use client";

import { trpc } from "@/app/_trpc/client";
import { ruteColumns } from "@/components/table/rute/columns";
import { TabsTable } from "@/components/tabs-table";
import { IRutes } from "@/types/rute";

interface RutesProps {
  all: IRutes;
  todays: IRutes;
}

export default function Rutes(props: RutesProps) {
  const { data } = trpc.rute.getAll.useQuery(undefined, {
    initialData: props,
  });

  return (
    <TabsTable isCreate columns={ruteColumns} searchKey="name" {...data} />
  );
}
