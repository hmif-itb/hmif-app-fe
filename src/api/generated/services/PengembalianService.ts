/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PeminjamanAktifSchema } from '../models/PeminjamanAktifSchema';
import type { SubmitPengembalianBodySchema } from '../models/SubmitPengembalianBodySchema';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class PengembalianService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * @returns PeminjamanAktifSchema Daftar peminjaman aktif milik pengguna
   * @throws ApiError
   */
  public getPeminjamanAktif(): CancelablePromise<Array<PeminjamanAktifSchema>> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/pengembalian/saya',
      errors: {
        403: `Error`,
      },
    });
  }
  /**
   * @returns PeminjamanAktifSchema Pengembalian berhasil disubmit, menunggu verifikasi admin
   * @throws ApiError
   */
  public submitPengembalian({
    peminjamanId,
    requestBody,
  }: {
    peminjamanId: string,
    requestBody?: SubmitPengembalianBodySchema,
  }): CancelablePromise<PeminjamanAktifSchema> {
    return this.httpRequest.request({
      method: 'PUT',
      url: '/api/pengembalian/{peminjamanId}',
      path: {
        'peminjamanId': peminjamanId,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Bad request`,
        403: `Error`,
        404: `Error`,
      },
    });
  }
}
