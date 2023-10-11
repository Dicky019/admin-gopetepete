import { useState } from "react";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import { Icons } from "../icons";

interface IAlertDialogContentDelete {
  title: string;
  onContinue: () => Promise<void>;
}

export function AlertDialogContentDelete({
  title,
  onContinue,
}: IAlertDialogContentDelete) {
  const [isLoading, setIsLoading] = useState(false)

  const onClick = async () => {
    setIsLoading(true);
    await onContinue();
    setIsLoading(false);
  }

  return (
    <AlertDialogContent id="delete">
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently and remove
          <span className="font-bold"> {title}</span> from servers.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
        <AlertDialogAction variant="destructive" disabled={isLoading} onClick={onClick}>
        {isLoading && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}  Continue
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
