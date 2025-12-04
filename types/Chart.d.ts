export interface IChartData {
  kabupaten: string | undefined;
  patients: number;
  fill: string | undefined;
}

export interface IDetailChartData {
 outcome: string;
 patients: number
}

export interface IChartStatusData {
  kabupaten: string;
  drop_out: number;
  meninggal: number;
  pindah_layanan: number;
  relaps_metastase: number;
  survivor: number;
}


export type {IChartData, IChartStatusData}