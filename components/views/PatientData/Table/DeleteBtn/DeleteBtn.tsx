"use client";

import { deleteData } from "@/actions/delete-data";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";

export default function DeleteBtn({
  patientId,
  setOpen,
}: {
  patientId?: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [isPending, setIsPending] = useState(false);
  return (
    <form
      action={async (formData) => {
        setIsPending(true);
        const res = await deleteData(formData);
        if (res?.status === "error") {
          toast.error(res?.message);
          setIsPending(false);
          return;
        }
        setIsPending(false);
        setOpen(false);
        toast.success(res?.message);
      }}
    >
      <input type="hidden" name="id" value={patientId} />
      <Button disabled={isPending} type="submit" variant={"destructive"}>
        {isPending ? <Spinner variant="circle" /> : "Hapus"}
      </Button>
    </form>
  );
}
