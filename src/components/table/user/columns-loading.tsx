"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Skeleton } from "@/components/ui/skeleton";
import { IUser } from "@/types/user";

export const userColumnsLoading: ColumnDef<IUser>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: () => (
      <Skeleton className="h-12 w-12 rounded-full" />
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: () => <Skeleton className="h-4 w-24" />,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: () => <Skeleton className="h-4 w-36" />,
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
