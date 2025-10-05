/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Prestasi = {
  id: string;
  userId: string;
  jenisPrestasi: 'organisasi' | 'kepanitiaan' | 'kompetisi';
  penyelenggara: string;
  deskripsi: string | null;
  bulan: number;
  tahun: number;
  competitionType: 'CP' | 'CTF' | 'BCC' | 'DS' | 'AI' | 'Hackathon' | null;
  createdAt: string;
  user?: {
    id: string;
    nim: string;
    fullName: string;
    picture: string | null;
  };
};

