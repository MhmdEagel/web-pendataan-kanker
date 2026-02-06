import Image from "next/image";

export default function PrintHeader() {
  return (
    <div className="hidden text-center print:flex flex-col justify-center mb-4 border-b border-black/80 pb-3">
      <div className="flex gap-4 justify-between">
        <Image
          src={"/assets/logo/logo_rsud.png"}
          className="block"
          width={70}
          height={70}
          alt="Logo RSUD Arifin Achmad"
        />
        <div className="text-xl font-bold">
          <div>Data Cancer Provinsi Riau</div>
          <div>RSUD Arifin Achmad</div>
        </div>
        <Image
          src={"/assets/logo/logo_riau.svg"}
          className="block"
          width={50}
          height={50}
          alt="Logo Provinsi Riau"
        />
      </div>
    </div>
  );
}
