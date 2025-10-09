export const languages = [
  "ara",
  "ckb",
  "dan",
  "eng",
  "fas",
  "fil",
  "fra",
  "isl",
  "kmr",
  "lit",
  "nno",
  "nob",
  "pol",
  "prs",
  "pus",
  "rmy",
  "ron",
  "rus",
  "sme",
  "som",
  "spa",
  "swa",
  "swe",
  "tha",
  "tir",
  "tur",
  "ukr",
  "urd",
  "vie",
] as const;

export const languagesOriginal = {
  ara: "العربية",
  ckb: "کوردیی ناوەندی",
  dan: "Dansk",
  eng: "English",
  fas: "فارسی",
  fil: "Filipino",
  fra: "Français",
  isl: "Íslenska",
  kmr: "Kurmancî",
  lit: "Lietuvių",
  nno: "Nynorsk",
  nob: "Bokmål",
  pol: "Polski",
  prs: "دری",
  pus: "پښتو",
  rmy: "Vlax Romani",
  ron: "Română",
  rus: "Русский",
  sme: "Davvisámegiella",
  som: "Soomaali",
  spa: "Español",
  swa: "Kiswahili",
  swe: "Svenska",
  tha: "ไทย",
  tir: "ትግርኛ",
  tur: "Türkçe",
  ukr: "Українська",
  urd: "اردو",
  vie: "Việt",
} as const;

/**
 * ISO-639-1 codes are used in cases where there's some lack of support
 * for ISO-639-3 codes, for example with the HTML `lang` attribute.
 */
export const attributeLanguages: Record<(typeof languages)[number], string> = {
  ara: "ar",
  ckb: "ckb",
  dan: "da",
  eng: "en",
  fas: "fa",
  fil: "fil",
  fra: "fr",
  isl: "is",
  kmr: "kmr",
  lit: "lt",
  nno: "nn",
  nob: "nb",
  pol: "pl",
  prs: "prs",
  pus: "ps",
  rmy: "rmy",
  ron: "ro",
  rus: "ru",
  sme: "se",
  som: "so",
  spa: "es",
  swa: "sw",
  swe: "sv",
  tha: "th",
  tir: "ti",
  tur: "tr",
  ukr: "uk",
  urd: "ur",
  vie: "vi",
} as const;

/**
 * List of language versions available on the site sorted alphabetically.
 * The `code` property is the ISO-639-3 code used internally in the application.
 * The `attribute` property is the ISO-639-1 code used in the HTML `lang` attribute.
 * The `site` property is the part of the URL path that links to the WordPress site.
 * The `label` property is the text displayed to users for selecting a language version.
 */
export const languageVersions: Array<{
  code: (typeof languages)[number];
  attribute: string;
  site: string;
  label: string;
}> = [
  { code: "eng", attribute: "en", site: "/en", label: "English version" },
  { code: "dan", attribute: "da", site: "/da", label: "Dansk version" },
  { code: "isl", attribute: "is", site: "/is", label: "Íslensk útgáfa" },
  { code: "nob", attribute: "nb", site: "", label: "Norsk versjon (bokmål)" },
  {
    code: "nno",
    attribute: "nn",
    site: "/nn",
    label: "Norsk versjon (nynorsk)",
  },
  { code: "swe", attribute: "sv", site: "/se", label: "Svensk version" },
];
