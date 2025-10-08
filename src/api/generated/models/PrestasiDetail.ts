/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type PrestasiDetail = {
  id: string;
  userId: string;
  jenisPrestasi: 'organisasi' | 'kepanitiaan' | 'kompetisi';
  penyelenggara: string;
  deskripsi: string | null;
  bulan: number;
  tahun: number;
  mediaSertifikat: string | null;
  mediaFotoAwarding: string | null;
  mediaFotoPribadi: string | null;
  competitionType: 'CP' | 'CTF' | 'BCC' | 'DS' | 'AI' | 'Hackathon' | null;
  createdAt: string;
  user?: {
    id: string;
    nim: string;
    fullName: string;
    email: string;
    angkatan: number;
    major: 'IF' | 'STI';
    picture: string | null;
    region: 'Ganesha' | 'Jatinangor';
    gender: 'F' | 'M';
    membershipStatus: string;
  };
};

