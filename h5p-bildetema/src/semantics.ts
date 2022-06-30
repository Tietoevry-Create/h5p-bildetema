import type { H5PBehaviour, H5PField, H5PL10n } from "h5p-types";

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
        default: "Topic",
        type: "text",
      },
      {
        label: "Language selection label",
        name: "selectLanguage",
        default: "Language",
        type: "text",
      },
      {
        label: "English",
        name: "lang_eng",
        default: "English",
        type: "text",
      },
      {
        label: "Norwegian bokmål",
        name: "lang_nob",
        default: "Norwegian bokmål",
        type: "text",
      },
      {
        label: "Norwegian nynorsk",
        name: "lang_non",
        default: "Norwegian nynorsk",
        type: "text",
      },
      {
        label: "Polish",
        name: "lang_pol",
        default: "Polish",
        type: "text",
      },
      {
        label: "Copyright",
        name: "footerCopyright",
        default: "Copyright © 2022 · All Rights Reserved",
        type: "text",
      },
    ],
  },
];
