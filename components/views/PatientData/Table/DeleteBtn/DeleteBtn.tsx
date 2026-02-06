"use client";

import { deleteData } from "@/actions/delete-data";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function DeleteBtn({ patientId }: { patientId? : string }) {
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
        toast.success(res?.message);
      }}
    >
      <input type="hidden" name="id" value={patientId} />
      <Button disabled={isPending} type="submit" variant={"ghost"}>
        <Trash />
        Hapus
      </Button>
    </form>
  );
}
