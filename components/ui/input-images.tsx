"use client";

import { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Dropzone, DropzoneEmptyState } from "./dropzone";
import { UploadIcon, X } from "lucide-react";
import { Card, CardContent } from "./card";
import { Button } from "./button";
import Link from "next/link";
import { useState } from "react";
import { Checkbox } from "./checkbox";
import { Label } from "./label";
import { Textarea } from "./textarea";

type KlinisValue =
  | "LABORATORIUM"
  | "RADIOLOGI"
  | "PATOLOGI_ANATOMI"
  | "PEMERIKSAAN_JANTUNG";

interface ExistingImage {
  id: string;
  fileName: string;
  url: string;
}

interface PreviewImage {
  id?: string;
  name: string;
  previewUrl: string;
  isNew: boolean;
}

interface FormImageUploadProps {
  form: UseFormReturn<any>;
  label: string;
  klinisValue: KlinisValue;
  existingImages?: ExistingImage[];
}

export function FormImageUpload({
  form,
  label,
  klinisValue,
  existingImages = [],
}: FormImageUploadProps) {
  /* ================= PREVIEW STATE (INIT LANGSUNG) ================= */
  const [previews, setPreviews] = useState<PreviewImage[]>(
    () =>
      existingImages.map((img) => ({
        id: img.id,
        name: img.fileName,
        previewUrl: img.url,
        isNew: false,
      })),
  );

  const selectedValues: KlinisValue[] = form.watch("klinisValues") ?? [];
  const isChecked = selectedValues.includes(klinisValue);

  return (
    <>
      {/* ================= CHECKBOX ================= */}
      <FormField
        control={form.control}
        name="klinisValues"
        render={({ field }) => (
          <FormItem className="flex items-center gap-2">
            <Checkbox
              checked={isChecked}
              onCheckedChange={(checked) => {
                if (checked) {
                  field.onChange([...field.value, klinisValue]);
                } else {
                  field.onChange(
                    field.value.filter((v: KlinisValue) => v !== klinisValue),
                  );

                  // reset image baru
                  form.setValue(`klinisImages.${klinisValue}`, []);
                  setPreviews([]);
                }
              }}
            />
            <Label>{label}</Label>
          </FormItem>
        )}
      />

      {/* ================= IMAGE INPUT ================= */}
      <Card>
        <CardContent>
          <FormField
            control={form.control}
            name={`klinisImages.${klinisValue}`}
            render={({ field }) => {
              const files: File[] = field.value ?? [];

              /* ===== TAMBAH IMAGE BARU ===== */
              const handleDrop = (dropped: File[]) => {
                const file = dropped[0];
                if (!file) return;

                field.onChange([...files, file]);

                setPreviews((prev) => [
                  ...prev,
                  {
                    name: file.name,
                    previewUrl: URL.createObjectURL(file),
                    isNew: true,
                  },
                ]);
              };

              /* ===== HAPUS IMAGE ===== */
              const handleDelete = (item: PreviewImage) => {
                if (item.isNew) {
                  // image baru → hapus dari RHF
                  field.onChange(
                    files.filter((f) => f.name !== item.name),
                  );
                } else {
                  // image lama → tandai buat delete backend
                  const deleted =
                    form.getValues("deletedKlinisImageIds") ?? [];
                  form.setValue("deletedKlinisImageIds", [
                    ...deleted,
                    item.id,
                  ]);
                }

                setPreviews((prev) =>
                  prev.filter((p) => p.name !== item.name),
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
                            Upload Gambar {label}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Klik untuk upload
                          </p>
                        </div>
                      </DropzoneEmptyState>
                    </Dropzone>
                  </FormControl>

                  {/* ===== PREVIEW ===== */}
                  <div className="my-4 space-y-2">
                    {previews.map((item) => (
                      <ImageItem
                        key={item.id ?? item.name}
                        imageName={item.name}
                        previewUrl={item.previewUrl}
                        onDelete={() => handleDelete(item)}
                      />
                    ))}
                  </div>

                  <FormMessage />
                </FormItem>
              );
            }}
          />

          {/* ================= CAPTION ================= */}
          <FormField
            name={`klinisCaptions.${klinisValue}`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    disabled={!isChecked}
                    placeholder="Deskripsi klinis..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
    </>
  );
}

/* ================= IMAGE ITEM ================= */
function ImageItem({
  imageName,
  previewUrl,
  onDelete,
}: {
  imageName: string;
  previewUrl: string;
  onDelete: () => void;
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
        onClick={onDelete}
      >
        <X className="size-4" />
      </Button>
    </div>
  );
}
