import DataTableLoading from "@/components/table/data-table/data-table-loading";
import { ruteColumnsLoading } from "@/components/table/rute/columns-loading";
import { EmptyRute } from "@/lib/data";

export default function RuteLoading() {
  const dataLoading = Array(10).map((_) => EmptyRute);
  return <DataTableLoading data={dataLoading} columns={ruteColumnsLoading} />;
}
