export const languages = [
  "ara",
  "ckb",
  "dan",
  "eng",
  "fas",
  "fra",
  "isl",
  "kmr",
  "lit",
  "nno",
  "nob",
  "pol",
  "prs",
  "pus",
  "rus",
  "sme",
  "som",
  "spa",
  "swe",
  "tgl",
  "tha",
  "tir",
  "ukr",
  "vie",
] as const;

export const languagesOriginal = {
  ara: "العربية",
  ckb: "کوردیی ناوەندی",
  dan: "Dansk",
  eng: "English",
  fas: "فارسی",
  fra: "Français",
  isl: "Íslenska",
  kmr: "کورمانجی",
  lit: "Lietuvių",
  nno: "Nynorsk",
  nob: "Bokmål",
  pol: "Polski",
  prs: "دری",
  pus: "پښتو",
  rus: "Русский",
  sme: "Davvisámegiella",
  som: "Soomaali",
  spa: "Español",
  swe: "Svenska",
  tgl: "Tagalog",
  tha: "ไทย",
  tir: "ትግርኛ",
  ukr: "Українська",
  vie: "Việt",
} as const;

/**
 * ISO-639-1 codes are used in cases where there's some lack of support
 * for ISO-639-3 codes, for example with the HTML `lang` attribute.
 */
export const attributeLanguages: Record<typeof languages[number], string> = {
  ara: "ar",
  ckb: "ckb",
  dan: "da",
  eng: "en",
  fas: "fa",
  fra: "fr",
  isl: "is",
  kmr: "kmr",
  lit: "lt",
  nno: "nn",
  nob: "nb",
  pol: "pl",
  prs: "prs",
  pus: "ps",
  rus: "ru",
  sme: "se",
  som: "so",
  spa: "es",
  swe: "sv",
  tgl: "tl",
  tha: "th",
  tir: "ti",
  ukr: "uk",
  vie: "vi",
} as const;
