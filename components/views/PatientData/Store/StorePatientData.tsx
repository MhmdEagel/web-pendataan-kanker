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
import { Label } from "@/components/ui/label";
import { terapi } from "@/components/constants/input.constant";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { FormImageUpload } from "@/components/ui/input-images";
import { EpidemiologiImageInput } from "@/components/ui/epidemiologi-inputs";
import { PemeriksaanFisikImageInput } from "@/components/ui/pemeriksaan-fisik-input";

export default function StorePatientData() {
  const router = useRouter();

  const {
    form,
    handleNewPatientData,
    activeTab,
    setActiveTab,
    files,
    isPendingUpload,
    isPending,
    handleDrop,
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
                <CardContent className="grid md:grid-cols-2 gap-4">
                  <FormField
                    {...form.register("nik")}
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
                    {...form.register("nama")}
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
                    {...form.register("jenis_kelamin")}
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
                              <SelectItem value="LAKI_LAKI">
                                Laki-laki
                              </SelectItem>
                              <SelectItem value="PEREMPUAN">
                                Perempuan
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DatePicker name="tanggal_lahir" form={form} />
                  <FormField
                    {...form.register("asal_daerah")}
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
                    {...form.register("pekerjaan_ayah")}
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
                    {...form.register("pekerjaan_ibu")}
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
                  <FormField
                    {...form.register("nomor_telepon")}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nomor Telepon</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Nomor Telepon"
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
              {/* Detail Penyakit */}
              <Card>
                <CardHeader>
                  <div className="font-bold text-lg">Detail Penyakit</div>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4">
                  {/* First Column */}
                  <div className="flex flex-col gap-4">
                    <FormField
                      {...form.register("dokter")}
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

                    <div className="grid gap-2">
                      <Label>Informasi Gizi</Label>
                      <div className="grid gap-2">
                        <FormField
                          {...form.register("berat")}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <div className="relative">
                                  <Input
                                    type="number"
                                    placeholder="Berat"
                                    {...field}
                                    value={field.value || ""}
                                    className="pr-10"
                                  />
                                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                    <span className="text-sm text-gray-500">
                                      kg
                                    </span>
                                  </div>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          {...form.register("tinggi")}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <div className="relative">
                                  <Input
                                    type="number"
                                    placeholder="Tinggi"
                                    {...field}
                                    value={field.value || ""}
                                    className="pr-10"
                                  />
                                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                    <span className="text-sm text-gray-500">
                                      cm
                                    </span>
                                  </div>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    <Label>Klinis</Label>
                    <FormImageUpload
                      klinisValue="LABORATORIUM"
                      form={form}
                      label="Laboratorium"
                    />
                    <FormImageUpload
                      klinisValue="RADIOLOGI"
                      form={form}
                      label="Radiologi"
                    />
                    <FormImageUpload
                      klinisValue="PATOLOGI_ANATOMI"
                      form={form}
                      label="Patologi Anatomi"
                    />
                    <FormImageUpload
                      klinisValue="PEMERIKSAAN_JANTUNG"
                      form={form}
                      label="Pemeriksaan Jantung"
                    />
                  </div>
                  {/* Second Column */}
                  <div className="flex flex-col gap-4">
                    <FormField
                      {...form.register("rumah_sakit")}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Rumah Sakit</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Rumah Sakit"
                              {...field}
                              value={field.value || ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      {...form.register("diagnosa")}
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
                    <PemeriksaanFisikImageInput form={form} />
                    <EpidemiologiImageInput
                      form={form}
                      label="Penyelidikan Epidemiologi"
                    />
                    <FormField
                      {...form.register("terapi")}
                      render={() => (
                        <FormItem>
                          <div className="mb-4">
                            <FormLabel className="text-base">Terapi</FormLabel>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            {" "}
                            {/* Dibuat grid agar rapi */}
                            {terapi.map((item) => (
                              <FormField
                                key={item}
                                {...form.register("terapi")}
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={item}
                                      className="flex flex-row items-start space-x-3 space-y-0"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(item)}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([
                                                  ...field.value,
                                                  item,
                                                ])
                                              : field.onChange(
                                                  field.value?.filter(
                                                    (value: string) =>
                                                      value !== item,
                                                  ),
                                                );
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="font-normal cursor-pointer">
                                        {item}
                                      </FormLabel>
                                    </FormItem>
                                  );
                                }}
                              />
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      {...form.register("outcome")}
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
                                <SelectItem value="drop_out">
                                  Drop out
                                </SelectItem>
                                <SelectItem value="relaps_metastase">
                                  Relaps / Metastase
                                </SelectItem>
                                <SelectItem value="meninggal">
                                  Meninggal
                                </SelectItem>
                                <SelectItem value="pindah_layanan">
                                  Pindah layanan
                                </SelectItem>
                                <SelectItem value="survivor">
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
                      {...form.register("fifth_survivor")}
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
                  </div>
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
                  disabled={isPending}
                  type="submit"
                  className="px-6 py-2 bg-[#157145] hover:bg-[#157145]/70 text-white rounded-lg"
                >
                  {isPending ? <Spinner variant="circle" /> : "Simpan"}
                </Button>
              </div>
            </form>
          </Form>
        ) : null}
      </CardContent>
    </Card>
  );
}
