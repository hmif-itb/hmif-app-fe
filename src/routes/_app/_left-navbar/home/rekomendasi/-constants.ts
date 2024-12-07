import { z } from 'zod';
import { isGreater } from '~/lib/date';

export const VoucherSchema = z
  .object({
    title: z.string().min(1),
    imageURL: z.string(),
    link: z.string().min(1),
    periodeAwal: z.string().datetime(),
    periodeAkhir: z.string().datetime(),
    description: z.string(),
  })
  .refine((data) => isGreater(data.periodeAkhir, data.periodeAwal), {
    message: 'Voucher end date must be greater than the start date.',
    path: ['voucherDeadline'],
  });

export type VoucherSchemaType = z.infer<typeof VoucherSchema>;

export const CoWorkingSpaceSchema = z.object({
  title: z.string().min(1),
  imageURL: z.string(),
  location: z.string().min(1),
  address: z.string().min(1),
  mapsURL: z.string().min(1),
  description: z.string().min(1),
});

export type CoWorkingSpaceSchemaType = z.infer<typeof CoWorkingSpaceSchema>;
