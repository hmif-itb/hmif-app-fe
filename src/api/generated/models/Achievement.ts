/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export interface Achievement {
    id?: string;
    user_id: number;
    jenis_prestasi: string;
    nama_prestasi: string;
    penyelenggara: string;
    periode_prestasi: string;
    url_sertifikat: string;
    url_foto_diri: string;
    url_foto_awarding: string;
    created_at: string;
    updated_at: string;
}

export interface CreateAchievementRequest {
    user_id: number;
    jenis_prestasi: string;
    nama_prestasi: string;
    penyelenggara: string;
    periode_prestasi: string;
    url_sertifikat: string;
    url_foto_diri: string;
    url_foto_awarding: string;
}