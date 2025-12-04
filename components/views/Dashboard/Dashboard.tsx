import Chart from "../Home/Chart";
import PatientMap from "../PatientMap/PatientMap";
import DashboardNav from "./DashboardNav/DashboardNav";
import DataCancerLayer from "./DetailChart/DataCancerLayer/DataCancerLayer";

export default function Dashboard({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const isDetail = searchParams.isDetail;
  console.log(isDetail);
  return (
    <>
      <DashboardNav />
      {isDetail ? (
        <DataCancerLayer /> 
      ) : (
        <>
          <div className="flex flex-col sm:flex-row items-center mx-auto select-none mb-12">
            <Chart />
          </div>
          <div className="mb-32">
            <PatientMap />
          </div>
        </>
      )}
    </>
  );
}
