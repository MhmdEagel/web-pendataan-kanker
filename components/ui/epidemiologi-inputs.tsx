"use client";

import { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Dropzone, DropzoneEmptyState } from "./dropzone";
import { UploadIcon, X } from "lucide-react";
import { Card, CardContent } from "./card";
import { Button } from "./button";
import Link from "next/link";
import { useState } from "react";
import { Checkbox } from "./checkbox";
import { epidemiologi } from "../constants/input.constant";
import { Textarea } from "./textarea";

interface FormImageUploadProps {
  form: UseFormReturn<any>;
  label: string;
}

interface PreviewImage {
  name: string;
  previewUrl: string;
}

export function EpidemiologiImageInput({ form, label }: FormImageUploadProps) {
  const [previews, setPreviews] = useState<PreviewImage[]>([]);
  const selectedValues: string[] =
    form.watch("penyelidikan_epidemiologi") ?? [];
  const isChecked = selectedValues.includes("TUMOR");

  return (
    <>
      {/* ===== CHECKBOX ===== */}
      <div className="grid gap-4">
        <FormField
          name="penyelidikan_epidemiologi"
          render={() => (
            <>
              <div className="mb-4">
                <FormLabel>{label}</FormLabel>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {epidemiologi.map(({ label, value }) => (
                  <FormField
                    key={value}
                    name="penyelidikan_epidemiologi"
                    render={({ field }) => {
                      const values: string[] = Array.isArray(field.value)
                        ? field.value
                        : [];

                      return (
                        <FormItem className="flex items-start space-x-3">
                          <FormControl>
                            <Checkbox
                              checked={values.includes(value)}
                              onCheckedChange={(checked) => {
                                const next = checked
                                  ? [...values, value]
                                  : values.filter((v) => v !== value);

                                field.onChange(next);

                                if (next.length === 0) {
                                  form.setValue("epidemiologiImages", []);
                                  setPreviews([]);
                                }
                              }}
                            />
                          </FormControl>
                          <FormLabel className="cursor-pointer font-normal">
                            {label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </>
          )}
        />
        {/* ===== IMAGE UPLOAD ===== */}
        <Card>
          <CardContent>
            <FormField
              control={form.control}
              name="tumorImages"
              render={({ field }) => {
                const files: File[] = Array.isArray(field.value)
                  ? field.value
                  : [];

                const handleDrop = (dropped: File[]) => {
                  const file = dropped[0];
                  if (!file) return;

                  field.onChange([...files, file]);
                  setPreviews((prev) => [
                    ...prev,
                    {
                      name: file.name,
                      previewUrl: URL.createObjectURL(file),
                    },
                  ]);
                };

                const handleDelete = (fileName: string) => {
                  field.onChange(files.filter((f) => f.name !== fileName));
                  setPreviews((prev) =>
                    prev.filter((p) => p.name !== fileName),
                  );
                };

                return (
                  <FormItem>
                    <FormControl>
                      <Dropzone
                        disabled={!isChecked}
                        accept={{ "image/*": [] }}
                        onDrop={handleDrop}
                      >
                        <DropzoneEmptyState>
                          <div className="flex flex-col items-center justify-center">
                            <div className="flex size-8 items-center justify-center rounded-md bg-muted text-muted-foreground">
                              <UploadIcon size={16} />
                            </div>
                            <p className="my-2 text-sm font-medium">
                              Upload Gambar Tumor
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Klik untuk upload
                            </p>
                          </div>
                        </DropzoneEmptyState>
                      </Dropzone>
                    </FormControl>
                    <div className="mt-4 space-y-2">
                      {previews.map((item) => (
                        <ImageItem
                          key={item.name}
                          imageName={item.name}
                          previewUrl={item.previewUrl}
                          onDelete={handleDelete}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              name="tumorDescription"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      disabled={!isChecked}
                      placeholder="Deskripsi tumor..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
}

function ImageItem({
  imageName,
  previewUrl,
  onDelete,
}: {
  imageName: string;
  previewUrl: string;
  onDelete: (fileName: string) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <Link
        href={previewUrl}
        target="_blank"
        className="w-full rounded-lg border py-2 text-center text-sm"
      >
        {imageName}
      </Link>
      <Button
        type="button"
        size="icon"
        variant="ghost"
        onClick={() => onDelete(imageName)}
      >
        <X className="size-4" />
      </Button>
    </div>
  );
}
