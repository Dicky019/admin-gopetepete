"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Skeleton } from "@/components/ui/skeleton";
import { IRute } from "@/types/rute";

export const ruteColumnsLoading: ColumnDef<IRute>[] = [
  {
    accessorKey: "kode",
    header: "Kode",
    cell: () => <Skeleton className="my-2 h-4 w-16" />,
  },
  {
    accessorKey: "color",
    header: "Color",
    cell: () => <Skeleton className="h-4 w-20" />,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: () => <Skeleton className="h-4 w-24" />,
  },
  {
    accessorKey: "locations",
    header: "Location",
    cell: () => (
      <div className="space-y-2">
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[250px]" />
      </div>
    ),
  },
  {
    id: "actions",
    cell: () => <Skeleton className="h-4 w-8" />,
  },
];
