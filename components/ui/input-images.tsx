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

interface FormImageUploadProps {
  form: UseFormReturn<any>;
  label: string;
  klinisValue:
    | "LABORATORIUM"
    | "RADIOLOGI"
    | "PATOLOGI_ANATOMI"
    | "PEMERIKSAAN_JANTUNG"
}

interface PreviewImage {
  name: string;
  previewUrl: string;
}

export function FormImageUpload({
  form,
  label,
  klinisValue,
}: FormImageUploadProps) {
  const [previews, setPreviews] = useState<PreviewImage[]>([]);
  const selectedValues: string[] = form.watch("klinisValues") ?? [];
  const isChecked = selectedValues.includes(klinisValue);

  return (
    <>
      {/* ===== CHECKBOX ===== */}
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
                    field.value.filter((v: string) => v !== klinisValue),
                  );
                  // reset images kalau uncheck
                  form.setValue(`klinisImages.${klinisValue}`, []);
                  setPreviews([]);
                }
              }}
            />
            <Label>{label}</Label>
          </FormItem>
        )}
      />

      {/* ===== IMAGE UPLOAD ===== */}
      <Card>
        <CardContent>
          <FormField
            control={form.control}
            name={`klinisImages.${klinisValue}`}
            render={({ field }) => {
              const files: File[] = field.value ?? [];

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
                setPreviews((prev) => prev.filter((p) => p.name !== fileName));
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
                  <div className="my-4 space-y-2">
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
            name={`klinisCaptions.${klinisValue}`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea disabled={!isChecked} placeholder="Deskripsi klinis..." {...field} />
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
