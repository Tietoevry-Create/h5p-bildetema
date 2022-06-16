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
        label: "Footer contact info label",
        name: "footerContactInfoLabel",
        default: "Contact info",
        type: "text",
      },
      {
        label: "Footer link 1 label",
        name: "footerLink1Label",
        default: "NAFO - Nasjonalt senter for flerkulturell opplæring",
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
        default: "OsloMet - Storbyuniversitetet",
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
        default:
          "LEXIN - Nettbasert ordbok på norsk og forskjellige språk for minoritetsspråklige",
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
        default: "Tema",
        type: "text",
      },
    ],
  },
];
