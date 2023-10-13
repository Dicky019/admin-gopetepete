import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

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
import { Dialog } from "@/components/ui/dialog";

import { IDriver } from "@/types/driver";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { AlertDialogContentDelete } from "@/components/alerts/delete-alerts";
import { AlertDialogContentUpdate } from "@/components/alerts/update-alerts";
import { DropdownMenuRadioItemStatuses } from "../data-table/data-table-dropdown-radio-item-statuses";
import { trpc } from "@/app/_trpc/client";
import { toast } from "sonner";

interface DataTableRowActionsProps {
  row: Row<IDriver>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const data = row.original;

  const trpcContext = trpc.useContext();
  const {
    mutateAsync: mutationChangeStatus,
    isLoading: isLoadingChangeStatus,
  } = trpc.user.changeStatus.useMutation({
    onSettled() {
      trpcContext.driver.getAll.invalidate();
    },
  });

  const { mutateAsync: mutationDelete, isLoading: isLoadingDelete } =
    trpc.driver.delete.useMutation({
      onSettled() {
        trpcContext.driver.getAll.invalidate();
      },
    });

  const isloading = isLoadingChangeStatus || isLoadingDelete;

  async function changeStatus() {
    const changeStatus = mutationChangeStatus({
      id: data.user.id,
      status: data.status == "done" ? false : true,
    });
    toast.promise(changeStatus, {
      loading: "Loading...",
      success: (data) => {
        return `${data.name} status change ${
          data?.status ? "done" : "canceled"
        }`;
      },
      error: "Error",
    });
  }

  async function deleteDriver() {
    const changeStatus = mutationDelete(data.id);
    toast.promise(changeStatus, {
      loading: "Loading...",
      success: (data) => {
        return `Berhasil terhapus ${data.user?.name}`;
      },
      error: "Error",
    });
  }

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
              <DropdownMenuSubTrigger disabled={isloading}>
                Status
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuRadioItemStatuses status={data.status} />
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <AlertDialogTrigger asChild disabled={isloading}>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
        <AlertDialogContentDelete
          title={data.namaLengkap}
          onContinue={deleteDriver}
        />
        <AlertDialogContentUpdate
          title={data.namaLengkap}
          onContinue={changeStatus}
        />
      </AlertDialog>
    </Dialog>
  );
}
