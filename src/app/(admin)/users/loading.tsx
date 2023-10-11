import DataTableLoading from '@/components/table/data-table/data-table-loading'
import { userColumnsLoading } from '@/components/table/user/columns-loading'
import { EmptyUser } from '@/lib/data'

export default function Loading() {
    const dataLoading = Array(10).map((_) => EmptyUser)
    return (
        <DataTableLoading data={dataLoading} columns={userColumnsLoading} />
    )
}
