"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "../data-table/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { IRute } from "@/types/rute";

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
      const color = row.original.color;

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
      <div className="flex flex-col text-left">
        <div className="font-semibold">
          Rute : {row.original.locations.length}
        </div>
        <div className="font-semibold">
          {row.original.locations
            .map(
              (v) => `${v.latAwal}, ${v.longAwal}/${v.latAkhir}, ${v.longAkhir}`
            )
            .join(" || ")}
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
