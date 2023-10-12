import { ruteColumns } from "@/components/table/rute/columns";
import { TabsTable } from "@/components/tabs-table";
import { IRutes } from "@/types/rute";

interface RutesProps {
  all: IRutes;
  todays: IRutes;
}

export default function Rutes(props: RutesProps) {
  return <TabsTable columns={ruteColumns} searchKey="name" {...props} />;
}
