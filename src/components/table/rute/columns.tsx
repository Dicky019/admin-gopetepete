"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "../data-table/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { IRute } from "@/types/rute";
import { Badge } from "@/components/ui/badge";

export const ruteColumns: ColumnDef<IRute>[] = [
  {
    accessorKey: "kode",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kode" />
    ),
    cell: ({ row }) => (
      <div className="text-left">
        {row.getValue<string>("kode").toUpperCase()}
      </div>
    ),
  },
  {
    accessorKey: "color",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Color" />
    ),
    cell: ({ row }) => {
      const color = row.original?.color ?? "";

      return (
        <div
          style={{
            backgroundColor: color,
          }}
          className="rounded-md p-2 w-24 border-1 border-ring"
        >
          {color.toUpperCase()}
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <div className="text-left">
        {row.getValue<string>("name").toUpperCase()}
      </div>
    ),
  },
  {
    accessorKey: "locations",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location" />
    ),
    cell: ({ row }) => (
      // <div className="text-left">
      <div className="text-left flex gap-2">
        <div className="font-semibold p-3 rounded-full">
          {row.original?.locations.length}
        </div>
        <div className="font-semibold flex flex-col gap-1">
          {row.original?.locations.map(
            (location) => (
              <div key={location.id} className="grid grid-cols-2 gap-1 w-fit">
                <Badge variant={"outline"} className="w-fit">
                  {location.latAwal}, {location.longAwal}
                </Badge>
                <Badge variant={"outline"} className="w-fit">
                  {location.latAkhir}, {location.longAkhir}
                </Badge>
              </div>
            )
          )}
          {/* <span className="font-bold text-lg">/</span> */}
        </div>
      </div>
    ),
  },

  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
