import EditPatientDataContainer from '@/components/views/PatientData/Edit/EditPatientDataContainer';

export default async function EditPatientPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <EditPatientDataContainer patientId={id} />
  )
}
