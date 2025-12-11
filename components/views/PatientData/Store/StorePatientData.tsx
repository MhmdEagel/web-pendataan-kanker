"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useStorePatientData } from "./useStorePatientData";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DatePicker from "@/components/ui/date-picker";
import { Textarea } from "@/components/ui/textarea";
import ComboBox from "@/components/ui/combo-box";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { kabupaten } from "@/components/constants/kabupaten.constant";
import { cn } from "@/lib/utils";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@/components/ui/dropzone";
import { UploadIcon } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

export default function StorePatientData() {
  const router = useRouter();

  const {
    form,
    handleNewPatientData,
    activeTab,
    setActiveTab,
    files,
    isPendingUpload,
    handleDrop
  } = useStorePatientData();
  return (
    <Card className="p-8">
      <div className="flex">
        <Button
          className={cn("rounded-r-none border", {
            "bg-primary hover:bg-primary/90 text-white":
              activeTab === "form_tambah",
          })}
          onClick={() => setActiveTab("form_tambah")}
          type="button"
          variant={"ghost"}
        >
          Form
        </Button>
        <Button
          className={cn("rounded-l-none border", {
            "bg-primary hover:bg-primary/90 text-white":
              activeTab === "upload_excel",
          })}
          onClick={() => setActiveTab("upload_excel")}
          type="button"
          variant={"ghost"}
        >
          Upload{" "}
        </Button>
      </div>
      <CardContent>
        {activeTab === "upload_excel" ? (
          <>
            <div className="text-lg font-bold mb-2">Upload File</div>
            <Dropzone
              maxFiles={1}
              accept={{
                "application/vnd.ms-excel": [],
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                  [],
                "application/octet-stream": [],
              }}
              onDrop={handleDrop}
              maxSize={1024 * 1024 * 10}
              minSize={1024}
              onError={console.error}
              src={files}
            >
              <DropzoneEmptyState>
                <div className="flex flex-col items-center justify-center">
                  <div className="flex size-8 items-center justify-center rounded-md bg-muted text-muted-foreground">
                    <UploadIcon size={16} />
                  </div>
                  <p className="my-2 w-full truncate text-wrap font-medium text-sm">
                    Upload File Excel
                  </p>
                  <p className="w-full truncate text-wrap text-muted-foreground text-xs">
                    Klik untuk upload
                  </p>
                </div>
              </DropzoneEmptyState>
              <DropzoneContent>
                {isPendingUpload ? (
                  <Spinner />
                ) : (
                  <p className="w-full text-wrap text-muted-foreground text-xs">
                    Redirecting....
                  </p>
                )}
              </DropzoneContent>
            </Dropzone>{" "}
          </>
        ) : null}
        {activeTab == "form_tambah" ? (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleNewPatientData)}
              className="flex flex-col gap-4"
            >
              <Card>
                <CardHeader>
                  <div className="text-lg font-bold">Identitas Pasien</div>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="nik"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>NIK</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="NIK"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="nama"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Nama"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="jenis_kelamin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Jenis Kelamin</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value || ""}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Pilih Jenis Kelamin" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="PRIA">Pria</SelectItem>
                              <SelectItem value="WANITA">Wanita</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DatePicker name="tanggal_lahir" form={form} />
                  <FormField
                    control={form.control}
                    name="asal_daerah"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Asal Daerah</FormLabel>
                        <FormControl>
                          <ComboBox
                            options={kabupaten}
                            field={field}
                            placeholder="Asal daerah..."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="text-lg font-bold">Pekerjaan Orang Tua</div>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="pekerjaan_ayah"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pekerjaan Ayah</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Pekerjaan Ayah"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="pekerjaan_ibu"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pekerjaan Ibu</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Pekerjaan Ibu"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="font-bold text-lg">Detail Penyakit</div>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="dokter"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama Dokter</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Nama Dokter"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="klinis"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Klinis</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value || ""}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Pilih Jenis Klinis" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="laboratorium">
                                Laboratorium
                              </SelectItem>
                              <SelectItem value="radiologi">
                                Radiologi
                              </SelectItem>
                              <SelectItem value="pa">PA</SelectItem>
                              <SelectItem value="pemeriksaan jantung">
                                Pemeriksaan Jantung
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="diagnosa"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Diagnosa</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Diagnosa"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="terapi"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Terapi</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Terapi"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="operasi"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Operasi</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value || ""}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Pilih Jenis Operasi" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="kemo">Kemo</SelectItem>
                              <SelectItem value="radiasi">Radiasi</SelectItem>
                              <SelectItem value="transplantasi">
                                Transplantasi
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="outcome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Outcome Pasien</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value || ""}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Pilih Outcome Pasien" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Drop Out">Drop out</SelectItem>
                              <SelectItem value="Relaps/Metastase">
                                Relaps / Metastase
                              </SelectItem>
                              <SelectItem value="Meninggal">
                                Meninggal
                              </SelectItem>
                              <SelectItem value="Pindah Layanan">
                                Pindah layanan
                              </SelectItem>
                              <SelectItem value="Survivor">
                                {" "}
                                Survivor
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="fifth_survivor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>5th Survivor</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value || ""}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Pilih" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="YA">Ya</SelectItem>
                              <SelectItem value="TIDAK">Tidak</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
              <div className="flex justify-end col-span-2 space-x-4">
                <Button
                  type="button"
                  onClick={() => {
                    router.push("/dashboard/data-pasien");
                  }}
                  className="px-6 py-2 bg-[#E7000B] hover:bg-[#E7000B]/70 text-white rounded-lg"
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  className="px-6 py-2 bg-[#157145] hover:bg-[#157145]/70 text-white rounded-lg"
                >
                  Simpan
                </Button>
              </div>
            </form>
          </Form>
        ) : null}
      </CardContent>
    </Card>
  );
}
