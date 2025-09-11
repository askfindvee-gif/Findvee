// Centralized environment validation and typed config

type EnvConfig = {
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
};

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(`[env] ${message}`);
  }
}

function validateUrl(value: string | undefined, name: string): string {
  assert(typeof value === 'string' && value.length > 0, `${name} is missing.`);
  assert(value.startsWith('https://'), `${name} must start with https://`);
  try {
    // eslint-disable-next-line no-new
    new URL(value);
  } catch {
    throw new Error(`[env] ${name} is not a valid URL.`);
  }
  return value;
}

function validateNonEmpty(value: string | undefined, name: string): string {
  assert(typeof value === 'string' && value.length > 0, `${name} is missing.`);
  return value;
}

const isDev = import.meta.env.DEV;

let cached: EnvConfig | null = null;

export function getEnv(): EnvConfig {
  if (cached) return cached;

  const url = validateUrl(import.meta.env.VITE_PUBLIC_SUPABASE_URL, 'VITE_PUBLIC_SUPABASE_URL');
  const anon = validateNonEmpty(import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY, 'VITE_PUBLIC_SUPABASE_ANON_KEY');

  const config: EnvConfig = {
    SUPABASE_URL: url,
    SUPABASE_ANON_KEY: anon,
  };

  // Fail fast in dev if missing
  if (isDev) {
    Object.entries(config).forEach(([key, value]) => {
      assert(Boolean(value), `${key} failed validation`);
    });
  }

  cached = config;
  return config;
}

export type { EnvConfig };

