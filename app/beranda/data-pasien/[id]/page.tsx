import DetailData from "@/components/views/PatientData/Detail/PatientDetail"

export default async function DetailPatientDataPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const {id} = await params
  return (
    <DetailData patientId={id}/>
  )
}
