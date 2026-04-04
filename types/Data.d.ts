import { Gender } from "@prisma/client";

interface Patient {
  id: string;
  nama: string;
  nik: string;
  jenis_kelamin: Gender;
  tanggal_lahir: Date;
  asal_daerah: string;
  pekerjaan_ayah: string;
  pekerjaan_ibu: string;
  dokter: string;
  diagnosa: string;
  terapi: string[];
  outcome: string;
  fifth_survivor: string;
  rumah_sakit: string;
}

interface PatientExtended {
  patient: {
    id: string;
    tanggal_input: Date;
    no_rm: string;
    no_register: string;
    nama: string;
    nik: string;
    jenis_kelamin: string;
    tanggal_lahir: Date;
    asal_daerah: string;
    pekerjaan_ayah: string;
    pekerjaan_ibu: string;
    dokter: string;
    rumah_sakit: string;
    diagnosa: string;
    terapi: string;
    outcome: string;
    fifth_survivor: string;
    fifth_survivor_tahun: Date;
    tinggi: string;
    berat: string;
    nomor_telepon: string;
    pemeriksaanFisikDetail: {
      description: string;
      images: Array<{ id: string; fileName: string; url: string; publicId: string }>;
    };
    tumorImages: Array<{ id: string; fileName: string; url: string; publicId: string }>;
    tumorDescription: string;
  };
  klinisValues: string[];
  klinisData: Record<
    string,
    {
      caption: string | null;
      images: any[];
    }
  >;
  epidemiologiValues: string[];
  terapiValues: string[];
}

type NewPatient = Omit<Patient, "id">;

interface IKabupaten {
  value: string;
  label: string;
}

export type { Patient, IKabupaten, NewPatient, PatientExtended };
