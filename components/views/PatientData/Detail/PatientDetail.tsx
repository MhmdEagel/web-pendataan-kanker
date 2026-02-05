import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { getPatientDetailData } from "@/data/patient";
import { cn, generateDateString } from "@/lib/utils";
import { LinkIcon, SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
export default function DetailData({ patientId }: { patientId: string }) {
  return (
    <Card>
      <CardContent>
        <Suspense
          fallback={
            <div className="flex justify-center items-center h-[400px] text-primary">
              <Spinner size={50} variant="circle" />
            </div>
          }
        >
          <DetailDataCard patientId={patientId} />
        </Suspense>
      </CardContent>
    </Card>
  );
}
async function DetailDataCard({ patientId }: { patientId: string }) {
  const data = await getPatientDetailData(patientId);
  if (!data) {
    return (
      <div className="flex flex-col text-center justify-center items-center min-h-[400px] space-y-4">
        <div className="text-foreground text-2xl font-bold mb-2">
          Data Tidak Ditemukan
        </div>
        <Link href={"/dashboard/data-pasien"}>
          <Button className="bg-[#157145] hover:bg-[#157145]/70">
            Kembali
          </Button>
        </Link>
      </div>
    );
  }

  const { patient, epidemiologiValues, klinisData, klinisValues } = data;

  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <div className="font-bold">Identitas Pasien</div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <DetailItem>
              <DetailItemLabel>NIK</DetailItemLabel>
              <DetailItemContent>{patient.nik}</DetailItemContent>
            </DetailItem>
            <DetailItem>
              <DetailItemLabel>Nama</DetailItemLabel>
              <DetailItemContent>{patient.nama}</DetailItemContent>
            </DetailItem>
            <DetailItem>
              <DetailItemLabel>Jenis Kelamin</DetailItemLabel>
              <DetailItemContent>
                {patient.jenis_kelamin.toLowerCase()}
              </DetailItemContent>
            </DetailItem>
            <DetailItem>
              <DetailItemLabel>Asal Daerah</DetailItemLabel>
              <DetailItemContent>{patient.asal_daerah}</DetailItemContent>
            </DetailItem>
            <DetailItem>
              <DetailItemLabel>Tanggal Lahir</DetailItemLabel>
              <DetailItemContent>
                {generateDateString(patient.tanggal_lahir)}
              </DetailItemContent>
            </DetailItem>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <div className="font-bold">Pekerjaan Orang Tua</div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <DetailItem>
              <DetailItemLabel>Pekerjaan Ayah</DetailItemLabel>
              <DetailItemContent>{patient.pekerjaan_ayah}</DetailItemContent>
            </DetailItem>
            <DetailItem>
              <DetailItemLabel>Pekerjaan Ibu</DetailItemLabel>
              <DetailItemContent>{patient.pekerjaan_ibu}</DetailItemContent>
            </DetailItem>
            <DetailItem>
              <DetailItemLabel>No. Telepon Orang tua</DetailItemLabel>
              <DetailItemContent>{patient.nomor_telepon}</DetailItemContent>
            </DetailItem>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <div className="font-bold">Detail Penyakit</div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {/* First Collumn */}
            <div className="flex flex-col gap-4">
              <DetailItem>
                <DetailItemLabel>Nama Dokter</DetailItemLabel>
                <DetailItemContent>{patient.dokter}</DetailItemContent>
              </DetailItem>
              <DetailItem>
                <DetailItemLabel>Informasi Gizi</DetailItemLabel>
                <div className="flex gap-2 items-center">
                  <DetailItemContent>{patient.berat}</DetailItemContent>
                  <div>kg</div>
                </div>
                <div className="flex gap-2 items-center">
                  <DetailItemContent>{patient.tinggi}</DetailItemContent>
                  <div>cm</div>
                </div>
              </DetailItem>
              <DetailItem>
                <DetailItemLabel>Klinis</DetailItemLabel>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={klinisValues.includes("LABORATORIUM")}
                      />
                      <DetailItemLabel>Laboratorium</DetailItemLabel>
                    </div>
                    <Card>
                      <CardContent>
                        {klinisData.LABORATORIUM.images.length > 0 ? (
                          klinisData.LABORATORIUM.images.map((item) => (
                            <ImageItem
                              key={item.id}
                              imageName={item.fileName}
                              previewUrl={item.url}
                            />
                          ))
                        ) : (
                          <div className="h-32 flex items-center justify-center text-black/60">
                            Tidak ada gambar yang dilampirkan
                          </div>
                        )}
                        {klinisValues.includes("LABORATORIUM") ? (
                          <div className="grid gap-2 mt-4">
                            <Label>Deskripsi</Label>
                            <DetailItemContent className="min-h-8">
                              {klinisData.LABORATORIUM.caption}
                            </DetailItemContent>
                          </div>
                        ) : null}
                      </CardContent>
                    </Card>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Checkbox checked={klinisValues.includes("RADIOLOGI")} />
                      <DetailItemLabel>Radiologi</DetailItemLabel>
                    </div>
                    <Card>
                      <CardContent>
                        {klinisData.RADIOLOGI.images.length > 0 ? (
                          klinisData.RADIOLOGI.images.map((item) => (
                            <ImageItem
                              key={item.id}
                              imageName={item.fileName}
                              previewUrl={item.url}
                            />
                          ))
                        ) : (
                          <div className="h-32 flex items-center justify-center">
                            Tidak ada gambar yang dilampirkan
                          </div>
                        )}
                        {klinisValues.includes("RADIOLOGI") ? (
                          <div className="grid gap-2 mt-4">
                            <Label>Deskripsi</Label>
                            <DetailItemContent className="min-h-8">
                              {klinisData.RADIOLOGI.caption}
                            </DetailItemContent>
                          </div>
                        ) : null}
                      </CardContent>
                    </Card>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={klinisValues.includes("PATOLOGI_ANATOMI")}
                      />
                      <DetailItemLabel>Patologi Anatomi</DetailItemLabel>
                    </div>
                    <Card>
                      <CardContent>
                        {klinisData.PATOLOGI_ANATOMI.images.length > 0 ? (
                          klinisData.PATOLOGI_ANATOMI.images.map((item) => (
                            <ImageItem
                              key={item.id}
                              imageName={item.fileName}
                              previewUrl={item.url}
                            />
                          ))
                        ) : (
                          <div className="h-32 flex items-center justify-center">
                            Tidak ada gambar yang dilampirkan
                          </div>
                        )}
                        {klinisValues.includes("PATOLOGI_ANATOMI") ? (
                          <div className="grid gap-2 mt-4">
                            <Label>Deskripsi</Label>
                            <DetailItemContent className="min-h-8">
                              {klinisData.PATAOLOGI_ANATOMI.caption}
                            </DetailItemContent>
                          </div>
                        ) : null}
                      </CardContent>
                    </Card>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={klinisValues.includes("PEMERIKSAAN_JANTUNG")}
                      />
                      <DetailItemLabel>Pemeriksaan Jantung</DetailItemLabel>
                    </div>
                    <Card>
                      <CardContent>
                        {klinisData.PEMERIKSAAN_JANTUNG.images.length > 0 ? (
                          klinisData.PEMERIKSAAN_JANTUNG.images.map((item) => (
                            <ImageItem
                              key={item.id}
                              imageName={item.fileName}
                              previewUrl={item.url}
                            />
                          ))
                        ) : (
                          <div className="h-32 flex items-center justify-center">
                            Tidak ada gambar yang dilampirkan
                          </div>
                        )}
                        {klinisValues.includes("PEMERIKSAAN_JANTUNG") ? (
                          <div className="grid gap-2 mt-4">
                            <Label>Deskripsi</Label>
                            <DetailItemContent className="min-h-8">
                              {klinisData.PEMERIKSAAN_JANTUNG.caption}
                            </DetailItemContent>
                          </div>
                        ) : null}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </DetailItem>
            </div>
            {/* Second Collumn */}
            <div className="flex flex-col gap-4">
              <DetailItem>
                <div className="space-y-2">
                  <DetailItemLabel>Pemeriksaan Fisik</DetailItemLabel>
                  <Card>
                    <CardContent>
                      {patient.pemeriksaanFisikDetail.images.map((item) => (
                        <ImageItem
                          key={item.id}
                          imageName={item.fileName}
                          previewUrl={item.url}
                        />
                      ))}
                      {patient.pemeriksaanFisikDetail.description ? (
                        <div className="grid gap-2 mt-4">
                          <Label>Deskripsi</Label>
                          <DetailItemContent className="min-h-8">
                            {patient.pemeriksaanFisikDetail.description}
                          </DetailItemContent>
                        </div>
                      ) : null}
                    </CardContent>
                  </Card>
                </div>
              </DetailItem>
              <DetailItem>
                <DetailItemLabel>Penyelidikan Epidemiologi</DetailItemLabel>
                <DetailItemContent className="min-h-16">
                  {epidemiologiValues.map((item) =>
                    item !== "Tumor" ? `${item}, ` : null,
                  )}
                </DetailItemContent>
              </DetailItem>
              <DetailItem>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Checkbox checked={epidemiologiValues.includes("TUMOR")} />
                    <DetailItemLabel>Tumor</DetailItemLabel>
                  </div>
                  <Card>
                    <CardContent>
                      {patient.tumorImages > 0 ? (
                        patient.tumorImages.map((item) => (
                          <ImageItem
                            key={item.id}
                            imageName={item.fileName}
                            previewUrl={item.url}
                          />
                        ))
                      ) : (
                        <div className="h-32 flex items-center justify-center text-black/60">
                          Tidak ada gambar yang dilampirkan
                        </div>
                      )}
                      {epidemiologiValues.includes("TUMOR") ? (
                        <div className="grid gap-2 mt-4">
                          <Label>Deskripsi</Label>
                          <DetailItemContent className="min-h-8">
                            {patient.tumorDescription}
                          </DetailItemContent>
                        </div>
                      ) : null}
                    </CardContent>
                  </Card>
                </div>
              </DetailItem>
              <DetailItem>
                <DetailItemLabel>Terapi</DetailItemLabel>
                <DetailItemContent className="min-h-18">
                  {patient.terapi.join(", ")}
                </DetailItemContent>
              </DetailItem>
              <DetailItem>
                <DetailItemLabel>Outcome Pasien</DetailItemLabel>
                <DetailItemContent>{patient.outcome}</DetailItemContent>
              </DetailItem>
              <DetailItem>
                <DetailItemLabel>5th Survivor</DetailItemLabel>
                <DetailItemContent className="capitalize">{patient.fifth_survivor.toLowerCase()}</DetailItemContent>
              </DetailItem>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ImageItem({
  imageName,
  previewUrl,
}: {
  imageName: string;
  previewUrl: string;
}) {
  return (
    <Link href={previewUrl} target="_blank" className="flex items-center gap-2">
      <div className="w-full rounded-lg border py-2 text-center text-sm">
        {imageName}
      </div>
      <Button size={"icon"}>
        <SquareArrowOutUpRight />
      </Button>
    </Link>
  );
}

function DetailItem({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("grid gap-2", className)} {...props} />;
}

function DetailItemLabel({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("font-bold text-sm", className)} {...props} />;
}
function DetailItemContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex w-full border px-3 py-2 rounded-lg capitalize",
        className,
      )}
      {...props}
    />
  );
}
