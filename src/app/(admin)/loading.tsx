import DataTableLoading from "@/components/table/data-table/data-table-loading";
import { driverColumnsLoading } from "@/components/table/driver/columns-loading";
import { EmptyDriver } from "@/lib/data";
import { IDriver } from "@/types/driver";

export default function Loading() {
  const dataLoading: IDriver[] = Array(10).map((_) => EmptyDriver);
  return <DataTableLoading data={dataLoading} columns={driverColumnsLoading} />;
}
