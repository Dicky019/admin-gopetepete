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
import { trpc } from "@/app/_trpc/client";
import { toast } from "sonner";

interface DataTableRowActionsProps {
  row: Row<IUser>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const data = row.original;

  const trpcContext = trpc.useContext();

  const {
    mutateAsync: mutationChangeStatus,
    isLoading: isLoadingChangeStatus,
  } = trpc.user.changeStatus.useMutation({
    onSettled() {
      trpcContext.user.getAll.invalidate();
    },
  });

  const { mutateAsync: mutationDelete, isLoading: isLoadingDelete } =
    trpc.user.delete.useMutation({
      onSettled() {
        trpcContext.user.getAll.invalidate();
      },
    });

  const isloading = isLoadingChangeStatus || isLoadingDelete;

  async function changeStatus() {
    const changeStatus = mutationChangeStatus({
      id: data.id,
      status: !data.status,
    });
    toast.promise(changeStatus, {
      loading: "Loading...",
      success: (data) => {
        return `${data.name} status change ${data.status}`;
      },
      error: "Error",
    });
  }

  async function deleteUser() {
    const changeStatus = mutationDelete(data.id);
    toast.promise(changeStatus, {
      loading: "Loading...",
      success: (data) => {
        return `Berhasil terhapus ${data.name}`;
      },
      error: "Error",
    });
  }

  return (
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
            <DropdownMenuSubTrigger disabled={isloading}>
              Status
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuRadioItemStatuses
                status={data.status ? "done" : "canceled"}
                onClick={changeStatus}
              />
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <AlertDialogTrigger disabled={isloading} asChild>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialogContentDelete
        title={data.name ?? ""}
        onContinue={deleteUser}
      />
    </AlertDialog>
  );
}
