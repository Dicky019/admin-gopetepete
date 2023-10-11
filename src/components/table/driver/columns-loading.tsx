"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IDriver } from "@/types/driver";
import { Skeleton } from "@/components/ui/skeleton";

export const driverColumnsLoading: ColumnDef<IDriver>[] = [
  {
    accessorKey: "namaLengkap",
    header: "Nama Lengkap",
    cell: () => (
      <div className="flex items-center space-x-2">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[230px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    ),
  },
  {
    accessorKey: "mobil",
    header: "Mobil",
    cell: () => {
      return (
        <div className="flex items-center space-x-2">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[230px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "no Hp",
    header: "No HP",
    cell: () => <Skeleton className="h-4 w-40" />,
  },
  {
    accessorKey: "nik",
    header: "NIK",
    cell: () => <Skeleton className="h-4 w-40" />,
  },
  {
    accessorKey: "alamat",
    header: "Alamat",
    cell: () => <Skeleton className="h-4 w-44" />,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: () => <Skeleton className="h-4 w-20" />,
  },
  {
    id: "actions",
    cell: () => <Skeleton className="h-4 w-8" />,
  },
];
