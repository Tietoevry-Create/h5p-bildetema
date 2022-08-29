import { H5PBehaviour, H5PField, H5PFieldText, H5PL10n } from "h5p-types";
import { languages } from "../../common/constants/languages";

const lang = (
  isoCode: typeof languages[number],
  label: string,
): H5PFieldText => ({
  label,
  name: `lang_${isoCode}`,
  default: label,
  type: "text",
});

export const semantics: Readonly<Array<H5PField | H5PBehaviour | H5PL10n>> = [
  {
    name: "l10n",
    type: "group",
    common: true,
    label: "Localize",
    fields: [
      {
        label: "Page is loading",
        name: "pageIsLoading",
        default: "Loading…",
        type: "text",
      },
      {
        label: "Show written words label",
        name: "showWrittenWordsLabel",
        default: "Show written words",
        type: "text",
      },
      {
        label: "Play audio",
        name: "playAudio",
        default: "Play audio",
        type: "text",
      },
      {
        label: "Pause audio",
        name: "pauseAudio",
        default: "Pause audio",
        type: "text",
      },
      {
        label: "Footer contact info label",
        name: "footerContactInfoLabel",
        default: "Contact us",
        type: "text",
      },
      {
        label: "Footer contact info URL",
        name: "footerContactInfoHref",
        default: "mailto:support@lexindrift.atlassian.net",
        type: "text",
      },
      {
        label: "Footer link 1 label",
        name: "footerLink1Label",
        default: "NAFO - National Centre of Multicultural Education",
        type: "text",
      },
      {
        label: "Footer link 1 URL",
        name: "footerLink1Href",
        default: "https://nafo.oslomet.no/",
        type: "text",
      },
      {
        label: "Footer link 2 label",
        name: "footerLink2Label",
        default: "OsloMet",
        type: "text",
      },
      {
        label: "Footer link 2 URL",
        name: "footerLink2Href",
        default: "https://oslomet.no/",
        type: "text",
      },
      {
        label: "Footer link 3 label",
        name: "footerLink3Label",
        default: "LEXIN",
        type: "text",
      },
      {
        label: "Footer link 3 URL",
        name: "footerLink3Href",
        default: "https://lexin.oslomet.no/",
        type: "text",
      },
      {
        label: "Breadcrumbs 'Topic' label",
        name: "breadcrumbsTopic",
        default: "Choose a topic",
        type: "text",
      },
      {
        label: "Breadcrumbs 'Home' label",
        name: "breadcrumbsHome",
        default: "Home",
        type: "text",
      },
      {
        label: "Language selection label",
        name: "selectLanguage",
        default: "Language",
        type: "text",
      },
      {
        label: "Copyright",
        name: "footerCopyright",
        default: "Copyright © 2022 · All Rights Reserved",
        type: "text",
      },
      {
        label: "Header title",
        name: "headerTitle",
        default: "Bildetema",
        type: "text",
      },
      {
        label: "Header subtitle",
        name: "headerSubtitle",
        default: "Multi-lingual image dictionary",
        type: "text",
      },
      {
        label: "Topic size big",
        name: "bigTopics",
        default: "Show topics in grid view",
        type: "text",
      },
      {
        label: "Topic size compact",
        name: "compactTopics",
        default: "Show topics in list view",
        type: "text",
      },
      lang("ara", "Arabic"),
      lang("ckb", "Sorani"),
      lang("dan", "Danish"),
      lang("eng", "English"),
      lang("fas", "Persian"),
      lang("fra", "French"),
      lang("isl", "Icelandic"),
      lang("kmr", "Kurmanji"),
      lang("lit", "Lithuanian"),
      lang("nno", "Norwegian (nynorsk)"),
      lang("nob", "Norwegian (bokmål)"),
      lang("pol", "Polish"),
      lang("prs", "Dari"),
      lang("pus", "Pashto"),
      lang("rus", "Russian"),
      lang("sme", "Northern Sami"),
      lang("som", "Somali"),
      lang("spa", "Spanish"),
      lang("swe", "Swedish"),
      lang("tgl", "Tagalog"),
      lang("tha", "Thai"),
      lang("tir", "Tigrinya"),
      lang("ukr", "Ukrainian"),
      lang("vie", "Vietnamese"),
    ],
  },
  {
    label: "Default languages",
    name: "defaultLanguages",
    type: "list",
    entity: "Language",
    field: {
      description:
        "Language code should be on <a href=https://en.wikipedia.org/wiki/List_of_ISO_639-3_codes>ISO-639-3</a> format",
      label: "Language Code",
      name: "languageCode",
      type: "text",
    },
  },
];
