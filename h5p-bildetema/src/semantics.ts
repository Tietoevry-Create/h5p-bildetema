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

const langOption = (
  isoCode: typeof languages[number],
  label: string,
): { label: string; value: string } => ({
  label,
  value: isoCode,
});

export const semantics: Readonly<Array<H5PField | H5PBehaviour | H5PL10n>> = [
  {
    name: "l10n",
    type: "group",
    common: true,
    label: "Localize",
    fields: [
      {
        label: "Language code",
        name: "htmlLanguageCode",
        description:
          "Two character language code, used for setting language in code (English: en, Norwegian Bokmål: nb)",
        default: "en",
        type: "text",
      },
      {
        label: "Page is loading",
        name: "pageIsLoading",
        default: "Loading…",
        type: "text",
      },
      {
        label: "Skip to main content label",
        name: "mainContentLink",
        default: "Skip to main content",
        type: "text",
      },
      {
        label: "Show written words label",
        name: "showWrittenWordsLabel",
        default: "Show written words",
        type: "text",
      },
      {
        label: "Show articles label",
        name: "showArticlesLabel",
        default: "Show articles",
        type: "text",
      },
      {
        label: "Print label",
        name: "printLabel",
        default: "Print",
        type: "text",
      },
      {
        label: "Print img label",
        name: "printImgLabel",
        default: "images in width",
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
        label: "Footer about label",
        name: "footerAboutLabel",
        default: "About Bildetema",
        type: "text",
      },
      {
        label: "Footer about URL",
        name: "footerAboutHref",
        default: "/about-bildetema",
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
      {
        label: "Previous image label",
        name: "prevImageLabel",
        default: "Previous image",
        type: "text",
      },
      {
        label: "Next image label",
        name: "nextImageLabel",
        default: "Next image",
        type: "text",
      },
      {
        label: "No topic selected",
        name: "noTopicSelected",
        default: "No topic selected.",
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
    description:
      "There should be up to three default languages. These are defaults for the current site language. We recommend adding three of them",
    name: "defaultLanguages",
    type: "list",
    entity: "Language",
    field: {
      label: "Language",
      name: "languageCode",
      type: "select",
      default: "nob",
      options: [
        langOption("ara", "Arabic"),
        langOption("ckb", "Sorani"),
        langOption("dan", "Danish"),
        langOption("eng", "English"),
        langOption("fas", "Persian"),
        langOption("fra", "French"),
        langOption("isl", "Icelandic"),
        langOption("kmr", "Kurmanji"),
        langOption("lit", "Lithuanian"),
        langOption("nno", "Norwegian (nynorsk)"),
        langOption("nob", "Norwegian (bokmål)"),
        langOption("pol", "Polish"),
        langOption("prs", "Dari"),
        langOption("pus", "Pashto"),
        langOption("rus", "Russian"),
        langOption("sme", "Northern Sami"),
        langOption("som", "Somali"),
        langOption("spa", "Spanish"),
        langOption("swe", "Swedish"),
        langOption("tgl", "Tagalog"),
        langOption("tha", "Thai"),
        langOption("tir", "Tigrinya"),
        langOption("ukr", "Ukrainian"),
        langOption("vie", "Vietnamese"),
      ],
    },
  },
  {
    label: "Backend Url",
    description: "The Url to the json database",
    default: "https://cdn-prodbildetema.azureedge.net/data/database.json",
    name: "backendUrl",
    type: "text",
  },
];
