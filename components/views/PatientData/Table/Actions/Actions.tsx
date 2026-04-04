"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { EllipsisVertical, ExternalLink, Pen } from "lucide-react";
import { useState } from "react";
import { DeleteDialog } from "../DeleteDialog/DeleteDialog";
import Link from "next/link";

export default function Actions({ id }: { id: string }) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant={"ghost"} size={"icon"}>
          <EllipsisVertical />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="left" className="w-fit">
        <div className="gap-4 flex flex-col">
          <DeleteDialog patientId={id} setOpen={setOpen} />
          <Link href={`/dashboard/data-pasien/${id}/edit`}>
            <Button variant={"ghost"}>
              <Pen />
              Edit
            </Button>
          </Link>
          <Link href={`/dashboard/data-pasien/${id}`}>
            <Button variant={"ghost"}>
              <ExternalLink />
              Detail
            </Button>
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
}
