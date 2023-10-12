"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "../data-table/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { IRute } from "@/types/rute";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export const ruteColumns: ColumnDef<IRute>[] = [
  {
    accessorKey: "kode",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kode" />
    ),
    cell: ({ row }) => (
      <div className="text-left">
        Kode {row.getValue<string>("kode").toUpperCase()}
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
      <div className="flex items-center space-x-2">
        <Avatar>
          <AvatarFallback
            // style={{
            //   backgroundColor: row.original?.color ?? "",
            // }}
          >
            {row.original?.locations.length}
          </AvatarFallback>
        </Avatar>
        <Separator orientation="vertical" className="m-1 h-8 " />
        <div className="font-semibold flex flex-col">
          {row.original?.locations.map((location, index) => (
            <div key={location.id} className="flex-col flex ">
              <div className="grid grid-cols-2 gap-2  w-fit">
                <Badge variant={"outline"} className="w-fit">
                  {location.latAwal}, {location.longAwal}
                </Badge>
                <Badge variant={"outline"} className="w-fit">
                  {location.latAkhir}, {location.longAkhir}
                </Badge>
              </div>
              {index + 1 !== row.original?.locations.length && (
                <Separator className="my-2 m-1" />
              )}
            </div>
          ))}
        </div>
      </div>
    ),
  },

  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
