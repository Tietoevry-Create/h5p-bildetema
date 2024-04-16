export const STATIC_PATH = {
  SEARCH: "/search",
  COLLECTIONS: "/collections",
} as const;

export const STATIC_PATHS: string[] = Object.values(STATIC_PATH);
