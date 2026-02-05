import Chart from "../Home/Chart";
import PatientMap from "../PatientMap/PatientMap";
import DashboardNav from "./DashboardNav/DashboardNav";
import DataCancerLayer from "./DetailChart/DataCancerLayer/DataCancerLayer";
import EpidemiologiTable from "./DetailSicknessTable/EpidemiologiTable/EpidemiologiTable";
import FifthSurvivorTable from "./DetailSicknessTable/FifthSurvivorTable/FifthSurvivorTable";
import KlinisSicknessTable from "./DetailSicknessTable/KlinisTable/KlinisSicknessTable";
import OutcomeTable from "./DetailSicknessTable/OutcomeTable/OutcomeTable";
import TerapiTable from "./DetailSicknessTable/TerapiTable/TerapiTable";

export default function Dashboard({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const isDetail = searchParams.isDetail;
  const isDetailSickness = searchParams.isDetailSickness;
  const checkup = searchParams.checkup;


  function renderDashboard() {
    if (isDetail && !isDetailSickness) {
      return <DataCancerLayer />;
    }
    if (isDetailSickness && !isDetail) {
      switch (checkup) {
        case "Klinis":
          return (
            <div className="space-y-4 px-2">
              <div className="text-xl font-bold">Tabel Klinis - Laki-Laki</div>
              <KlinisSicknessTable gender="LAKI_LAKI" />
              <div className="text-xl font-bold">Tabel Klinis - Perempuan</div>
              <KlinisSicknessTable gender="PEREMPUAN" />
            </div>
          );
        case "Terapi":
          return (
            <div className="space-y-4 px-2">
              <div className="text-xl font-bold">Tabel Terapi - Laki-Laki</div>
              <TerapiTable gender="LAKI_LAKI" />
              <div className="text-xl font-bold">Tabel Terapi - Perempuan</div>
              <TerapiTable gender="PEREMPUAN" />
            </div>
          );
        case "Outcome":
          return (
            <div className="space-y-4 px-2">
              <div className="text-xl font-bold">Tabel Outcome - Laki-Laki</div>
              <OutcomeTable gender="LAKI_LAKI" />
              <div className="text-xl font-bold">Tabel Outcome - Perempuan</div>
              <OutcomeTable gender="PEREMPUAN" />
            </div>
          );
        case "5th Survivor":
          return (
            <div className="space-y-4 px-2">
              <div className="text-xl font-bold">
                Tabel 5th Survivor - Laki-Laki
              </div>
              <FifthSurvivorTable gender="LAKI_LAKI" />
              <div className="text-xl font-bold">
                Tabel 5th Survivor - Perempuan
              </div>
              <FifthSurvivorTable gender="PEREMPUAN" />
            </div>
          );
        case "Penyelidikan Epidemologi":
          return (
            <div className="space-y-4 px-2">
              <div className="text-xl font-bold">
                Tabel Penyelidikan Epidemiologi - Laki-Laki
              </div>
              <EpidemiologiTable gender="LAKI_LAKI" />
              <div className="text-xl font-bold">
                Tabel Penyelidikan Epidemiologi - Perempuan
              </div>
              <EpidemiologiTable gender="PEREMPUAN" />
            </div>
          );

        default:
          return <div className="text-center">404 Halaman tidak ditemukan</div>;
      }
    }

    return (
      <>
        <Chart />
        <div className="mb-32">
          <PatientMap />
        </div>
      </>
    );
  }

  return (
    <>
      <DashboardNav />
      {renderDashboard()}
    </>
  );
}
