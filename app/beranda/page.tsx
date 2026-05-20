import Dashboard from "@/components/views/Dashboard";
export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  
  const allSearchParams = await searchParams;
  return <Dashboard searchParams={allSearchParams} />;
}
