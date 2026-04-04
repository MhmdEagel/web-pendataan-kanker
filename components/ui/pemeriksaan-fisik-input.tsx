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
import { Textarea } from "./textarea";
import { Label } from "./label";

interface ExistingImage {
  id: string;
  fileName: string;
  url: string;
}

interface FormImageUploadProps {
  form: UseFormReturn<any>;
  existingImages?: ExistingImage[];
  existingCaption?: string;
}

interface PreviewImage {
  id?: string;
  name: string;
  previewUrl: string;
  isNew: boolean;
}

export function PemeriksaanFisikImageInput({ 
  form, 
  existingImages = [],
  existingCaption = "",
}: FormImageUploadProps) {
  const [previews, setPreviews] = useState<PreviewImage[]>(() =>
    existingImages.map((img) => ({
      id: img.id,
      name: img.fileName,
      previewUrl: img.url,
      isNew: false,
    })),
  );

  return (
    <>
      {/* ===== CHECKBOX ===== */}
      <div className="grid gap-4">
        <Label>Pemeriksaan Fisik</Label>
        {/* ===== IMAGE UPLOAD ===== */}
        <Card>
          <CardContent>
            <FormField
              control={form.control}
              name="pemeriksaanFisikImages"
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
                      isNew: true,
                    },
                  ]);
                };

                const handleDelete = (item: PreviewImage) => {
                  if (item.isNew) {
                    field.onChange(files.filter((f) => f.name !== item.name));
                  } else {
                    const deleted = form.getValues("deletedPemeriksaanFisikImageIds") ?? [];
                    form.setValue("deletedPemeriksaanFisikImageIds", [...deleted, item.id]);
                  }
                  setPreviews((prev) =>
                    prev.filter((p) => p.name !== item.name),
                  );
                };

                return (
                  <FormItem>
                    <FormControl>
                      <Dropzone accept={{ "image/*": [] }} onDrop={handleDrop}>
                        <DropzoneEmptyState>
                          <div className="flex flex-col items-center justify-center">
                            <div className="flex size-8 items-center justify-center rounded-md bg-muted text-muted-foreground">
                              <UploadIcon size={16} />
                            </div>
                            <p className="my-2 text-sm font-medium">
                              Upload Gambar Pemeriksaan Fisik
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
            <FormField
              name="pemeriksaanCaption"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Deskripsi pemeriksaan fisik..."
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
