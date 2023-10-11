// "use server"

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import { statuses } from "@/lib/data";
import { IDriver } from "@/types/driver";
import { deleteDriver } from "@/server/driver/delete";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { AlertDialogContentDelete } from "@/components/alerts/delete-alerts";
import { AlertDialogContentUpdate } from "@/components/alerts/update-alerts";
import { updateStatusDriver } from "@/server/driver/update";
import { DropdownMenuRadioItemStatuses } from "../data-table/data-table-dropdown-radio-item-statuses";

interface DataTableRowActionsProps {
  row: Row<IDriver>;
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
          title={data.namaLengkap}
          onContinue={async () => {
            await deleteDriver(data.id);
          }}
        />
        <AlertDialogContentUpdate
          title={data.namaLengkap}
          onContinue={async () => {
            await updateStatusDriver(data.user.id, !(data.status == "done"));
          }}
        />
      </AlertDialog>
    </Dialog>
  );
}

