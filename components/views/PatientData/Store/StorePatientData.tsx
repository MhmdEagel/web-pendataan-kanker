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
import kabupaten from "@/components/constants/kabupaten.constant";
import { Textarea } from "@/components/ui/textarea";
import ComboBox from "@/components/ui/combo-box";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function StorePatientData() {
  const router = useRouter()

  const { form, handleNewPatientData } = useStorePatientData();
  return (
    <Card>
      <CardContent>
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
                            <SelectItem value="radiologi">Radiologi</SelectItem>
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
                            <SelectItem value="drop out">Drop out</SelectItem>
                            <SelectItem value="relaps/metastase">
                              Relaps / Metastase
                            </SelectItem>
                            <SelectItem value="mati">Mati</SelectItem>
                            <SelectItem value="pindah layanan">
                              Pindah layanan
                            </SelectItem>
                            <SelectItem value="survivor"> Survivor</SelectItem>
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
                onClick={() => {router.push("/dashboard/data-pasien")}}
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
      </CardContent>
    </Card>
  );
}
