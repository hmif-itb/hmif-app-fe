export const ELIGIBLE_SPARTA_ANGKATAN = [2025];

export function isSpartaOnlyAngkatan(angkatan: number) {
  return ELIGIBLE_SPARTA_ANGKATAN.includes(angkatan);
}
