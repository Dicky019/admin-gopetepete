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
// import { Dialog } from "@/components/ui/dialog";

import { IDriver } from "@/types/driver";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { AlertDialogContentDelete } from "@/components/alerts/delete-alerts";
import {
  DropdownMenuRadioItemRutes,
  DropdownMenuRadioItemStatuses,
} from "../data-table/data-table-dropdown-radio-item-statuses";
import { trpc } from "@/app/_trpc/client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
// import { AlertDialogContentUpdate } from "@/components/alerts/update-alerts";

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

  const { mutateAsync: mutationChangeRute, isLoading: isLoadingChangeRute } =
    trpc.driver.changeRute.useMutation({
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
    console.log({
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

  async function changeRuteDriver(ruteId: string) {
    const changeRute = mutationChangeRute({
      id: data.id,
      ruteId,
    });
    toast.promise(changeRute, {
      loading: "Loading...",
      success: (data) => {
        return `${data.namaLengkap} rute change ${data.rute?.name}`;
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

  const { data: rutes } = trpc.rute.getAll.useQuery();

  return (
    // <Dialog key={"done"} >
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <Icons.dots
              className={cn(
                "h-4 w-4",
                data.rute === null && "fill-cyan-500 fill-curent"
              )}
            />
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
                onClick={changeStatus}
                status={data.status}
              />
            </DropdownMenuSubContent>
          </DropdownMenuSub>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger disabled={isloading}>
              Routes
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuRadioItemRutes
                name={data.rute?.name ?? ""}
                list={rutes?.all ?? []}
                onChangeRuteDriver={changeRuteDriver}
              />
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
      {/* <AlertDialogContentUpdate title={"done"} onContinue={changeStatus} />
      <AlertDialogContentUpdate title={"canceled"} onContinue={changeStatus} />
    </Dialog> */}
    </AlertDialog>
  );
}
