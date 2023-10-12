import { driverColumns } from "@/components/table/driver/columns";
import { TabsTable } from "@/components/tabs-table";
import { IDrivers } from "@/types/driver";

interface DriversProps {
  all: IDrivers;
  todays: IDrivers;
}

export default function Drivers(props: DriversProps) {
  return (
    <TabsTable columns={driverColumns} searchKey="namaLengkap" {...props} />
  );
}
