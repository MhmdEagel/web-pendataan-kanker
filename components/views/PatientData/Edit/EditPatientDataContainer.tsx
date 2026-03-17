import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getPatientDetailData } from "@/data/patient";
import Link from "next/link";
import EditPatientData from "./EditPatientData";

export default async function EditPatientDataContainer({
  patientId,
}: {
  patientId: string;
}) {
  const patientData = await getPatientDetailData(patientId);
  if (!patientData) {
    
    return (
      <Card>
        <CardContent>
          <div className="flex flex-col text-center justify-center items-center min-h-[400px] text-primary space-y-4">
            <div className="text-foreground text-2xl font-bold mb-2">
              Data Tidak Ditemukan
            </div>
            <Link href={"/dashboard"}>
              <Button className="bg-primary hover:bg-primary/70">
                Kembali
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  return <EditPatientData data={patientData} />;
}
