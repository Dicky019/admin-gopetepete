import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { DataTable } from '@/components/table/data-table'
import { ColumnDef } from '@tanstack/react-table';

interface DataTableLoadingProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export default function DataTableLoading<TData, TValue>({
    columns,
    data,
}: DataTableLoadingProps<TData, TValue>) {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex gap-2 justify-between">
                <Skeleton className="w-24 h-8" />
                <Skeleton className="w-24 h-8" />
            </div>
            <div className="flex justify-between">
                <div className="flex gap-2">
                    <Skeleton className="w-64 h-8" />
                    <Skeleton className="w-24 h-8" />
                </div>
                <Skeleton className="w-20 h-8" />
            </div>
            <DataTable searchKey={"namaLengkap"} isLoading={true} data={data} columns={columns} />
            <div className="flex justify-end gap-8 mx-2">
                <Skeleton className="w-44 h-8" />
                <Skeleton className="w-20 h-8" />
                <Skeleton className="w-40 h-8" />
            </div>
        </div>
    )
}
