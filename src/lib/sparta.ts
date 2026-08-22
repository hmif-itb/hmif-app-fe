export const ELIGIBLE_SPARTA_ANGKATAN = [2025];

// Manually approved exceptions: these NIMs are not angkatan 2025 but have
// been designated eligible for the SPARTA internship form regardless.
// Keep in sync with ELIGIBLE_SPARTA_NIM_OVERRIDES in the backend's
// internship-eligibility.middleware.ts.
export const ELIGIBLE_SPARTA_NIM_OVERRIDES = [
  '13524108', // Daffa Mutaqin Tetaputra
  '18224053', // Nathan Pasha Athallah
  '18224112', // Muhammad Reyna Athallah Agoes
];

export function isSpartaOnlyAngkatan(angkatan: number) {
  return ELIGIBLE_SPARTA_ANGKATAN.includes(angkatan);
}

export function isEligibleForSpartaInternship(user: {
  angkatan: number;
  nim: string;
}) {
  return (
    ELIGIBLE_SPARTA_ANGKATAN.includes(user.angkatan) ||
    ELIGIBLE_SPARTA_NIM_OVERRIDES.includes(user.nim)
  );
}
