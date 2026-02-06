import PrintBtn from "@/components/ui/print-btn";
import Chart from "../Home/Chart";
import PatientMap from "../PatientMap/PatientMap";
import DashboardNav from "./DashboardNav/DashboardNav";
import DataCancerLayer from "./DetailChart/DataCancerLayer/DataCancerLayer";
import EpidemiologiTable from "./DetailSicknessTable/EpidemiologiTable/EpidemiologiTable";
import FifthSurvivorTable from "./DetailSicknessTable/FifthSurvivorTable/FifthSurvivorTable";
import KlinisSicknessTable from "./DetailSicknessTable/KlinisTable/KlinisSicknessTable";
import OutcomeTable from "./DetailSicknessTable/OutcomeTable/OutcomeTable";
import TerapiTable from "./DetailSicknessTable/TerapiTable/TerapiTable";
import PrintHeader from "../PrintHeader/PrintHeader";

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
            <>
              <div className="print:break-after-page print:mt-8">
                <PrintHeader />
                <div className="text-xl font-bold print:mb-4">
                  Tabel Klinis - Laki-Laki
                </div>
                <KlinisSicknessTable gender="LAKI_LAKI" />
              </div>
              <div className="print:mt-12">
                <div className="text-xl font-bold print:mb-4">
                  Tabel Klinis - Perempuan
                </div>
                <KlinisSicknessTable gender="PEREMPUAN" />
              </div>
              <PrintBtn />
            </>
          );
        case "Terapi":
          return (
            <>
              <div className="print:break-after-page print:mt-8">
                <PrintHeader />
                <div className="text-xl font-bold print:mb-4">
                  Tabel Terapi - Laki-Laki
                </div>
                <TerapiTable gender="LAKI_LAKI" />
              </div>
              <div className="print:mt-12">
                <div className="text-xl font-bold print:mb-4">
                  Tabel Terapi - Perempuan
                </div>
                <TerapiTable gender="PEREMPUAN" />
              </div>
              <PrintBtn />
            </>
          );
        case "Outcome":
          return (
            <>
              <div className="print:break-after-page print:mt-8">
                <PrintHeader />
                <div className="text-xl font-bold print:mb-4">
                  Tabel Outcome - Laki-Laki
                </div>
                <OutcomeTable gender="LAKI_LAKI" />
              </div>
              <div className="print:mt-12">
                <div className="text-xl font-bold print:mb-4">
                  Tabel Outcome - Perempuan
                </div>
                <OutcomeTable gender="PEREMPUAN" />
              </div>
              <PrintBtn />
            </>
          );
        case "5th Survivor":
          return (
            <>
              <div className="print:break-after-page print:mt-8">
                <PrintHeader />
                <div className="text-xl font-bold print:mb-4">
                  Tabel 5th Survivor - Laki-Laki
                </div>
                <FifthSurvivorTable gender="LAKI_LAKI" />
              </div>
              <div className="print:mt-12">
                <div className="text-xl font-bold print:mb-4">
                  Tabel 5th Survivor - Perempuan
                </div>
                <FifthSurvivorTable gender="PEREMPUAN" />
              </div>
              <PrintBtn />
            </>
          );
        case "Penyelidikan Epidemologi":
          return (
            <>
              <div className="print:break-after-page print:mt-8">
                <PrintHeader />
                <div className="text-xl font-bold print:mb-4">
                  Tabel Penyelidikan Epidemiologi - Laki-Laki
                </div>
                <EpidemiologiTable gender="LAKI_LAKI" />
              </div>
              <div className="print:mt-12">
                <div className="text-xl font-bold print:mb-4">
                  Tabel Penyelidikan Epidemiologi - Perempuan
                </div>
                <EpidemiologiTable gender="PEREMPUAN" />
              </div>
              <PrintBtn />
            </>
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
