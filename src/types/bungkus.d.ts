// The `bungkus` package ships with an empty `dist/index.d.ts` (just `export {}`),
// so TypeScript has no idea what it exports. This declares the actual runtime
// API, verified by reading `dist/bungkus.es.js` directly (the README only
// documents `daftarkan`/`buangBungkus`/`values`/`status`, but the module also
// exports `setValues` and `bungkus`, a manual per-field writer — needed here
// since `daftarkan()` is built for native `<input onChange>` and doesn't fit
// this app's Radix-based RadioGroup/CheckboxGroup controlled components).
declare module 'bungkus' {
  export type BungkusStatus = 'idle' | 'memulihkan' | 'siap';

  export interface UseBungkusConfig {
    /** Hours before stored data is considered stale and purged. Default 24. */
    kadaluarsa?: number;
    /** Obfuscate string values before persisting. Default true. */
    rahasia?: boolean;
    /** Compress image files before persisting. Default false. */
    compress?: boolean;
  }

  export interface UseBungkusReturn<
    T extends Record<string, unknown> = Record<string, unknown>,
  > {
    values: T;
    status: BungkusStatus;
    daftarkan: (name: string) => {
      name: string;
      value: unknown;
      onChange: (event: {
        target: { value: string; files?: FileList | null };
      }) => void;
    };
    buangBungkus: () => void;
    setValues: (updater: T | ((prev: T) => T)) => void;
    /** Manually persist a single field, bypassing `daftarkan()`. */
    bungkus: (key: string, value: unknown) => void;
  }

  export function useBungkus<
    T extends Record<string, unknown> = Record<string, unknown>,
  >(formId: string, config?: UseBungkusConfig): UseBungkusReturn<T>;
}
