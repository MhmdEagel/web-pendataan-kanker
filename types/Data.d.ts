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
  klinis: string;
  diagnosa: string;
  terapi: string;
  outcome: string;
  fifth_survivor: string;
  rumah_sakit: string;
}
type NewPatient = Omit<Patient, "id">

interface IKabupaten {
  value: string;
  label: string;
}

export type {Patient, IKabupaten, NewPatient}
