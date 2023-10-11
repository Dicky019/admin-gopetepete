import { useState } from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogCancel,
  DialogAction,
} from "@/components/ui/dialog";
import { Icons } from "../icons";

interface AlertDialogContentUpdate {
  title: string;
  onContinue: () => Promise<void>;
}

export function AlertDialogContentUpdate({
  title,
  onContinue,
}: AlertDialogContentUpdate) {

  const [isLoading, setIsLoading] = useState(false)

  const onClick = async () => {
    setIsLoading(true);
    await onContinue();
    setIsLoading(false);
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogDescription>
          This action will change <span className="font-bold"> {title}</span>{" "}
          from servers.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogCancel disabled={isLoading}>Cancel</DialogCancel>
        <DialogAction disabled={isLoading} onClick={onClick}> {isLoading && (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        )}  Continue</DialogAction>
      </DialogFooter>
    </DialogContent>
  );
}
