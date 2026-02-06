import Image from "next/image";
import Chart from "./Chart";
import PatientMap from "../PatientMap/PatientMap";
import StatusTableLayer from "../StatusTable/StatusTableLayer";
import PrintHeader from "../PrintHeader/PrintHeader";
import PrintBtn from "@/components/ui/print-btn";

export default function Home() {
  return (
    <>
      <div className="flex justify-center pt-2 pb-4 bg-primary text-white print:hidden">
        <div className="flex flex-col items-center gap-1">
          <div className="flex justify-center">
            <Image
              src={"/assets/logo/logo_rsud.png"}
              width={80}
              height={80}
              alt="Logo RSUD Arifin Ahmad"
            />
            <Image
              src={"/assets/logo/logo_riau.svg"}
              width={60}
              height={60}
              alt="Logo RSUD Arifin Ahmad"
            />
          </div>
          <div className="text-center px-4 sm:px-0">
            <h1 className="sm:text-2xl font-bold">
              Tabulasi Data Pasien Kanker Provinsi Riau
            </h1>
            <div className="sm:text-lg">RSUD Arifin Achmad Provinsi Riau</div>
          </div>
        </div>
      </div>
      <div className="print:hidden">
        <Chart />
      </div>
      <div className="mb-16">
        <PrintHeader />
        <StatusTableLayer />
        <PrintBtn />
      </div>

      <div className="print:hidden">
        <PatientMap />
      </div>
      <footer className="bg-slate-950 text-gray-300 text-sm flex items-center px-4 min-h-16 mt-16 justify-center text-center print:hidden">
        © 2025 RSUD Arifin Achmad Provinsi Riau. All rights reserved.
      </footer>
    </>
  );
}
