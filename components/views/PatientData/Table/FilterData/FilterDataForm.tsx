"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFilterData } from "./useFilterData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import DatePicker from "@/components/ui/date-picker";
import ComboBox from "@/components/ui/combo-box";
import { kabupaten } from "@/components/constants/kabupaten.constant";
import { epidemiologi, terapi } from "@/components/constants/input.constant";

export default function FilterDataForm() {
  const { form, handleFilterData, router } = useFilterData();
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFilterData)}
        className="flex flex-col lg:grid lg:grid-cols-2 gap-4"
      >
        <FormField
          control={form.control}
          name="NIK"
          render={({ field }) => (
            <FormItem>
              <FormLabel>NIK</FormLabel>
              <FormControl>
                <Input
                  placeholder="NIK"
                  {...field}
                  value={field.value}
                  autoComplete="off"
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
                    <SelectItem value="LAKI_LAKI">Laki-laki</SelectItem>
                    <SelectItem value="PEREMPUAN">Perempuan</SelectItem>
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
                    <SelectItem value="drop_out">Drop out</SelectItem>
                    <SelectItem value="relaps_metastase">
                      Relaps / Metastase
                    </SelectItem>
                    <SelectItem value="meninggal">Meninggal</SelectItem>
                    <SelectItem value="pindah_layanan">
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
                    <SelectItem value="LABORATORIUM">Laboratorium</SelectItem>
                    <SelectItem value="RADIOLOGI">Radiologi</SelectItem>
                    <SelectItem value="PATOLOGI_ANATOMI">
                      Patologi Anatomi
                    </SelectItem>
                    <SelectItem value="PEMERIKSAAN_JANTUNG">
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
        <FormField
          control={form.control}
          name="terapi"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Terapi</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value || ""}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih Jenis Terapi" />
                  </SelectTrigger>
                  <SelectContent>
                    {terapi.map((item) => (
                      <SelectItem value={item} key={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="penyelidikan_epidemiologi"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Penyelidikan Epidemiologi</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value || ""}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih" />
                  </SelectTrigger>
                  <SelectContent>
                    {epidemiologi.map((item) => (
                      <SelectItem value={item.value} key={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="col-span-2 flex justify-end space-x-2 ">
          <Button
            type="button"
            onClick={() => {
              router.replace("/dashboard/data-pasien");
            }}
            className="w-fit bg-red-600 hover:bg-red-600/80"
          >
            Hapus Filter
          </Button>
          <Button
            type="submit"
            className="w-fit bg-primary hover:bg-primary/80"
          >
            <Search /> Filter
          </Button>
        </div>
      </form>
    </Form>
  );
}
