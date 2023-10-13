"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { AlertDialogContentDelete } from "@/components/alerts/delete-alerts";
import { Dialog } from "@/components/ui/dialog";

import { IRute } from "@/types/rute";
import Link from "next/link";
import { trpc } from "@/app/_trpc/client";
import { toast } from "sonner";

interface DataTableRowActionsProps {
  row: Row<IRute>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const data = row.original;

  const trpcContext = trpc.useContext();

  const { mutateAsync: mutationDelete, isLoading } =
    trpc.rute.delete.useMutation({
      onSettled() {
        trpcContext.rute.getAll.invalidate();
      },
    });

  async function deleteRute() {
    const changeStatus = mutationDelete(data?.id ?? "");
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
      <Dialog>
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
            {/* <DialogTrigger asChild> */}
            <Link href={`/routes/edit/${data?.id}`}>
              <DropdownMenuItem>Edit</DropdownMenuItem>
            </Link>
            {/* </DialogTrigger> */}
            <DropdownMenuSeparator />
            <AlertDialogTrigger asChild>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
        <AlertDialogContentDelete
          title={data?.name ?? ""}
          onContinue={deleteRute}
        />
        {/* <DialogRute data={data} /> */}
      </Dialog>
    </AlertDialog>
  );
}
