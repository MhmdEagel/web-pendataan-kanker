import Chart from "../Home/Chart";
import PatientMap from "../PatientMap/PatientMap";
import DashboardNav from "./DashboardNav/DashboardNav";

export default function Dashboard() {
  return (
    <>
      <DashboardNav />
      <div className="flex flex-col sm:flex-row items-center mx-auto select-none mb-12">
        <Chart />
      </div>
      <div className="mb-32">
        <PatientMap />
      </div>
    </>
  );
}
