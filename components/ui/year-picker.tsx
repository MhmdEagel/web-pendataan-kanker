"use client";

import { FormField, FormItem, FormLabel, FormMessage } from "./form";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { UseFormReturn } from "react-hook-form";
import { useState } from "react";

type YearPickerProps = {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  startYear?: number;
  endYear?: number;
};

export default function YearPicker(props: YearPickerProps) {
  const {
    form,
    name,
    label,
    startYear = 1950,
    endYear = new Date().getFullYear(),
  } = props;

  const [open, setOpen] = useState(false);
  const defaultValue = form.getValues("fifth_survivor_tahun");

  // generate range tahun (dinamis, bukan asal 100)
  const years: number[] = [];
  for (let y = endYear; y >= startYear; y--) {
    years.push(y);
  }

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        field.value = defaultValue;
        return (
          <FormItem className="flex flex-col items-start">
            <FormLabel>{label}</FormLabel>

            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !field.value && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {field.value ? (
                    format(field.value, "yyyy")
                  ) : (
                    <span>Pilih Tahun</span>
                  )}
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-64 p-2">
                <div className="grid grid-cols-4 gap-2 max-h-60 overflow-y-auto">
                  {years.map((year) => (
                    <Button
                      key={year}
                      variant="ghost"
                      onClick={() => {
                        const date = new Date(year, 0, 1); // standardized date
                        field.onChange(date);
                        setOpen(false);
                      }}
                    >
                      {year}
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
