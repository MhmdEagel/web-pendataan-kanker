import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { getPatientDetailData } from "@/data/patient";
import { generateDateString } from "@/lib/utils";
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
async function DetailDataCard({
  patientId,
}: {
  patientId: string;
}) {
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
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Object.entries(data).map(([key, value]) => {
        const label = key.split("_").join(" ");
        if (key === "id") return null;
        if (value instanceof Date) {
          const dateString = generateDateString(value);
          return <DetailDataItem key={key} label={label} value={dateString} />;
        }
        return <DetailDataItem key={key} label={label} value={value} />;
      })}
    </div>
  );
}
interface PropTypes {
  label: string;
  value: string;
}
function DetailDataItem(props: PropTypes) {
  const { label, value } = props;
  return (
    <div className="grid grid-cols-1 gap-2">
      <Label className="capitalize">{label}</Label>
      <div className="flex w-full border px-3 py-1 rounded-lg capitalize">{value}</div>
    </div>
  );
}
