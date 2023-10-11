"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import { AlertDialogContentDelete } from "@/components/alerts/delete-alerts";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IUser } from "@/types/user";
import { DropdownMenuRadioItemStatuses } from "../data-table/data-table-dropdown-radio-item-statuses";
import { Dialog } from "@/components/ui/dialog";
import { AlertDialogContentUpdate } from "@/components/alerts/update-alerts";

interface DataTableRowActionsProps {
  row: Row<IUser>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const data = row.original;

  return (
    <Dialog>
      <AlertDialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
            >
              <DotsHorizontalIcon className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Status</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuRadioItemStatuses status={data.status} />
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <AlertDialogTrigger asChild>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
        <AlertDialogContentDelete
          title={data.name}
          onContinue={async () => {
            // await deleteUser(data.id, true);
          }}
        />
        <AlertDialogContentUpdate
          title={data.name}
          onContinue={async () => {
            // await updateStatusUser(data.id, !(data.status == "done"));
          }}
        />
      </AlertDialog>
    </Dialog>
  );
}
