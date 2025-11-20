import Image from "next/image";
import Chart from "./Chart";

export default function Home() {
  return (
    <>
      <div className="flex justify-center pt-2 pb-4 bg-primary text-white">
        <div className="flex flex-col items-center gap-1">
          <Image
            src={"/assets/logo/logo_rsud.png"}
            width={80}
            height={80}
            alt="Logo RSUD Arifin Ahmad"
          />
          <div className="text-center ">
            <h1 className="text-2xl font-bold">
              Data Pasien Kanker Provinsi Riau
            </h1>
            <div className="text-lg">RSUD Arifin Achmad Provinsi Riau</div>
          </div>
        </div>
      </div>
      <div className="py-16 flex flex-col sm:flex-row justify-center items-center  select-none">
        <Chart />
      </div>
      <footer className="bg-slate-950 text-gray-300 text-sm flex items-center px-4 min-h-16 mt-16 justify-center">
        © 2025 RSUD Arifin Achmad Provinsi Riau. All rights reserved.
      </footer>
    </>
  );
}
