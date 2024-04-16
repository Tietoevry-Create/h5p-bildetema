export const STATIC_PATH = {
  SEARCH: "/sok",
  COLLECTIONS: "/collections",
} as const;

export const STATIC_PATHS: string[] = Object.values(STATIC_PATH)