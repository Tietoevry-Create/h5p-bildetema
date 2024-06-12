declare const $defaultExport: [
	{
		name: "l10n",
		type: "group",
		common: true,
		label: "Localize",
		fields: [
			{
				label: "Language code",
				name: "htmlLanguageCode",
				description: "Two character language code, used for setting language in code (English: en, Norwegian Bokmål: nb)",
				"default": "en",
				type: "text"
			},
			{
				label: "Page is loading",
				name: "pageIsLoading",
				"default": "Loading…",
				type: "text"
			},
			{
				label: "Skip to main content label",
				name: "mainContentLink",
				"default": "Skip to main content",
				type: "text"
			},
			{
				label: "Main content aria label",
				name: "mainContentAriaLabel",
				"default": "Main content",
				type: "text"
			},
			{
				label: "Show written words label",
				name: "showWrittenWordsLabel",
				"default": "Show written words",
				type: "text"
			},
			{
				label: "Show articles label",
				name: "showArticlesLabel",
				"default": "Show articles",
				type: "text"
			},
			{
				label: "Print label",
				name: "printLabel",
				"default": "Print",
				type: "text"
			},
			{
				label: "Print img label",
				name: "printImgLabel",
				"default": "images in width",
				type: "text"
			},
			{
				label: "Play audio",
				name: "playAudio",
				"default": "Play audio",
				type: "text"
			},
			{
				label: "Stop audio",
				name: "stopAudio",
				"default": "Stop audio",
				type: "text"
			},
			{
				label: "Footer about label",
				name: "footerAboutLabel",
				"default": "About Bildetema",
				type: "text"
			},
			{
				label: "Footer about URL",
				name: "footerAboutHref",
				"default": "/en/om-bildetema",
				type: "text"
			},
			{
				label: "Footer contact info label",
				name: "footerContactInfoLabel",
				"default": "Contact us",
				type: "text"
			},
			{
				label: "Footer contact info URL",
				name: "footerContactInfoHref",
				"default": "mailto:bildetema@oslomet.no",
				type: "text"
			},
			{
				label: "Footer NAFO label",
				name: "footerNAFOLabel",
				"default": "NAFO - National Centre of Multicultural Education",
				type: "text"
			},
			{
				label: "Footer NAFO URL",
				name: "footerNAFOHref",
				"default": "https://nafo.oslomet.no/",
				type: "text"
			},
			{
				label: "Footer link 1 label",
				name: "footerLink1Label",
				"default": "OsloMet - Oslo Metropolitan University",
				type: "text"
			},
			{
				label: "Footer link 1 URL",
				name: "footerLink1Href",
				"default": "https://oslomet.no/",
				type: "text"
			},
			{
				label: "Footer link 2 label",
				name: "footerLink2Label",
				"default": "LEXIN",
				type: "text"
			},
			{
				label: "Footer link 2 URL",
				name: "footerLink2Href",
				"default": "https://lexin.oslomet.no/",
				type: "text"
			},
			{
				label: "Footer privacy statement label",
				name: "footerPrivacyStatementLabel",
				"default": "Privacy statement",
				type: "text"
			},
			{
				label: "Footer privacy statement URL",
				name: "footerPrivacyStatementHref",
				"default": "/en/personvernerklaering",
				type: "text"
			},
			{
				label: "Footer accessibility statement label",
				name: "footerAccessibilityStatementLabel",
				"default": "Accessibility statement",
				type: "text"
			},
			{
				label: "Footer accessibility statement URL",
				name: "footerAccessibilityStatementHref",
				"default": "/en/tilgjengelighetserklaering",
				type: "text"
			},
			{
				label: "Footer creative commons img alt text",
				name: "footerCreativeCommonsImgAlt",
				"default": "Creative Commons License",
				type: "text"
			},
			{
				label: "Footer creative commons text",
				name: "footerCreativeCommonsText",
				"default": "Licensed under a",
				type: "text"
			},
			{
				label: "Footer creative commons link URL",
				name: "footerCreativeCommonsLinkURL",
				"default": "https://creativecommons.org/licenses/by-nc-sa/4.0/",
				type: "text"
			},
			{
				label: "Footer creative commons link text",
				name: "footerCreativeCommonsLinkText",
				"default": "Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License",
				type: "text"
			},
			{
				label: "Breadcrumbs aria label",
				name: "breadcrumbsAriaLabel",
				"default": "Breadcrumbs",
				type: "text"
			},
			{
				label: "Breadcrumbs 'Topic' label",
				name: "breadcrumbsTopic",
				"default": "Choose a topic",
				type: "text"
			},
			{
				label: "Breadcrumbs 'Home' label",
				name: "breadcrumbsHome",
				"default": "Home",
				type: "text"
			},
			{
				label: "Favorite languages aria label",
				name: "favoriteLanguagesAriaLabel",
				"default": "Favorite languages",
				type: "text"
			},
			{
				label: "Choose favorite language aria label part 1",
				name: "chooseFavoriteLanguageAriaLabelPart1",
				"default": "Choose",
				type: "text"
			},
			{
				label: "Choose favorite language aria label part 2",
				name: "chooseFavoriteLanguageAriaLabelPart2",
				"default": "as favorite language",
				type: "text"
			},
			{
				label: "Choose language aria label",
				name: "chooseLanguageAriaLabel",
				"default": "Choose language",
				type: "text"
			},
			{
				label: "Language selection label",
				name: "selectLanguage",
				"default": "Language",
				type: "text"
			},
			{
				label: "Copyright",
				name: "footerCopyright",
				"default": "Copyright © 2023 · All Rights Reserved · National Centre of Multicultural Education (NAFO), OsloMet",
				type: "text"
			},
			{
				label: "Header title",
				name: "headerTitle",
				"default": "Bildetema",
				type: "text"
			},
			{
				label: "Header subtitle",
				name: "headerSubtitle",
				"default": "Multilingual visual dictionary",
				type: "text"
			},
			{
				label: "Header OsloMet logo aria label",
				name: "headerOsloMetlogoAriaLabel",
				"default": "OsloMet - Oslo Metropolitan University",
				type: "text"
			},
			{
				label: "Topic size big",
				name: "bigTopics",
				"default": "Show topics in grid view",
				type: "text"
			},
			{
				label: "Topic size compact",
				name: "compactTopics",
				"default": "Show topics in list view",
				type: "text"
			},
			{
				label: "Previous image label",
				name: "prevImageLabel",
				"default": "Previous image",
				type: "text"
			},
			{
				label: "Next image label",
				name: "nextImageLabel",
				"default": "Next image",
				type: "text"
			},
			{
				label: "No topic selected",
				name: "noTopicSelected",
				"default": "No topic selected.",
				type: "text"
			},
			{
				label: "Topic image label",
				name: "viewTopicImage",
				"default": "Overview image",
				type: "text"
			},
			{
				label: "Grid label",
				name: "viewGrid",
				"default": "Single photos",
				type: "text"
			},
			{
				label: "Search",
				name: "search",
				"default": "Search",
				type: "text"
			},
			{
				label: "Collections",
				name: "collections",
				"default": "Collections",
				type: "text"
			},
			{
				label: "My collections",
				name: "myCollections",
				"default": "My collections",
				type: "text"
			},
			{
				label: "Create a collection",
				name: "createACollection",
				"default": "Create a collection",
				type: "text"
			},
			{
				label: "Change name",
				name: "changeName",
				"default": "Change name",
				type: "text"
			},
			{
				label: "Delete",
				name: "delete",
				"default": "Delete",
				type: "text"
			},
			{
				label: "Name of the collection",
				name: "nameOfTheCollection",
				"default": "Name of the collection",
				type: "text"
			},
			{
				label: "Cancel",
				name: "cancel",
				"default": "Cancel",
				type: "text"
			},
			{
				label: "Save changes",
				name: "saveChanges",
				"default": "Save changes",
				type: "text"
			},
			{
				label: "Copy link",
				name: "copyLink",
				"default": "Copy link",
				type: "text"
			},
			{
				label: "Link copied",
				name: "linkCopied",
				"default": "Link copied",
				type: "text"
			},
			{
				label: "Description text for adding a word to a collection",
				name: "addWordsDescription",
				"default": "Add words by clicking on the bookmark on the images, either via {{search}} or {{topicView}}.",
				type: "text"
			},
			{
				label: "Filter by theme",
				name: "filterByTheme",
				"default": "Filter by theme",
				type: "text"
			},
			{
				label: "Collections Page Description",
				name: "collectionsPageDescription",
				"default": "Here you can see all the collections you have created.",
				type: "text"
			},
			{
				label: "Add word",
				name: "addWord",
				"default": "Add word",
				type: "text"
			},
			{
				label: "Choose a collection",
				name: "chooseACollection",
				"default": "Choose a collection",
				type: "text"
			},
			{
				label: "Choose collection",
				name: "chooseCollection",
				"default": "Choose collection",
				type: "text"
			},
			{
				label: "Create new collection",
				name: "createNewCollection",
				"default": "Create new collection",
				type: "text"
			},
			{
				label: "Delete word",
				name: "deleteWord",
				"default": "Delete word",
				type: "text"
			},
			{
				label: "Delete word confirmation",
				name: "deleteWordConfirmation",
				"default": "Are you sure you want to delete the word",
				type: "text"
			},
			{
				label: "Yes",
				name: "yes",
				"default": "Yes",
				type: "text"
			},
			{
				label: "No",
				name: "no",
				"default": "No",
				type: "text"
			},
			{
				label: "Delete collection",
				name: "deleteCollection",
				"default": "Delete collection",
				type: "text"
			},
			{
				label: "Delete collection confirmation",
				name: "deleteCollectionConfirmation",
				"default": "Are you sure you want to delete the collection",
				type: "text"
			},
			{
				label: "This collection is empty",
				name: "thisCollectionIsEmpty",
				"default": "This collection is empty",
				type: "text"
			},
			{
				label: "Go to search",
				name: "goToSearch",
				"default": "Go to search",
				type: "text"
			},
			{
				label: "Go to topic",
				name: "goToTopic",
				"default": "Go to topic",
				type: "text"
			},
			{
				label: "Topic view",
				name: "topicView",
				"default": "Topic view",
				type: "text"
			},
			{
				label: "Save collection",
				name: "saveCollection",
				"default": "Save collection",
				type: "text"
			},
			{
				label: "Collection saved",
				name: "collectionSaved",
				"default": "Collection saved",
				type: "text"
			},
			{
				label: "Arabic",
				name: "lang_ara",
				"default": "Arabic",
				type: "text"
			},
			{
				label: "Kurdish (Sorani)",
				name: "lang_ckb",
				"default": "Kurdish (Sorani)",
				type: "text"
			},
			{
				label: "Danish",
				name: "lang_dan",
				"default": "Danish",
				type: "text"
			},
			{
				label: "English",
				name: "lang_eng",
				"default": "English",
				type: "text"
			},
			{
				label: "Persian",
				name: "lang_fas",
				"default": "Persian",
				type: "text"
			},
			{
				label: "Filipino",
				name: "lang_fil",
				"default": "Filipino",
				type: "text"
			},
			{
				label: "French",
				name: "lang_fra",
				"default": "French",
				type: "text"
			},
			{
				label: "Icelandic",
				name: "lang_isl",
				"default": "Icelandic",
				type: "text"
			},
			{
				label: "Kurdish (Kurmanji)",
				name: "lang_kmr",
				"default": "Kurdish (Kurmanji)",
				type: "text"
			},
			{
				label: "Lithuanian",
				name: "lang_lit",
				"default": "Lithuanian",
				type: "text"
			},
			{
				label: "Norwegian (nynorsk)",
				name: "lang_nno",
				"default": "Norwegian (nynorsk)",
				type: "text"
			},
			{
				label: "Norwegian (bokmål)",
				name: "lang_nob",
				"default": "Norwegian (bokmål)",
				type: "text"
			},
			{
				label: "Polish",
				name: "lang_pol",
				"default": "Polish",
				type: "text"
			},
			{
				label: "Dari",
				name: "lang_prs",
				"default": "Dari",
				type: "text"
			},
			{
				label: "Pashto",
				name: "lang_pus",
				"default": "Pashto",
				type: "text"
			},
			{
				label: "Romanian",
				name: "lang_ron",
				"default": "Romanian",
				type: "text"
			},
			{
				label: "Russian",
				name: "lang_rus",
				"default": "Russian",
				type: "text"
			},
			{
				label: "Northern Sami",
				name: "lang_sme",
				"default": "Northern Sami",
				type: "text"
			},
			{
				label: "Somali",
				name: "lang_som",
				"default": "Somali",
				type: "text"
			},
			{
				label: "Spanish",
				name: "lang_spa",
				"default": "Spanish",
				type: "text"
			},
			{
				label: "Swahili",
				name: "lang_swa",
				"default": "Swahili",
				type: "text"
			},
			{
				label: "Swedish",
				name: "lang_swe",
				"default": "Swedish",
				type: "text"
			},
			{
				label: "Thai",
				name: "lang_tha",
				"default": "Thai",
				type: "text"
			},
			{
				label: "Tigrinya",
				name: "lang_tir",
				"default": "Tigrinya",
				type: "text"
			},
			{
				label: "Turkish",
				name: "lang_tur",
				"default": "Turkish",
				type: "text"
			},
			{
				label: "Ukrainian",
				name: "lang_ukr",
				"default": "Ukrainian",
				type: "text"
			},
			{
				label: "Urdu",
				name: "lang_urd",
				"default": "Urdu",
				type: "text"
			},
			{
				label: "Vietnamese",
				name: "lang_vie",
				"default": "Vietnamese",
				type: "text"
			}
		]
	},
	{
		label: "Default languages",
		description: "There should be up to three default languages. These are defaults for the current site language. We recommend adding three of them",
		name: "defaultLanguages",
		type: "list",
		entity: "Language",
		field: {
			label: "Language",
			name: "languageCode",
			type: "select",
			"default": "nob",
			options: [
				{
					label: "Arabic",
					value: "ara"
				},
				{
					label: "Kurdish (Sorani)",
					value: "ckb"
				},
				{
					label: "Danish",
					value: "dan"
				},
				{
					label: "English",
					value: "eng"
				},
				{
					label: "Persian",
					value: "fas"
				},
				{
					label: "Filipino",
					value: "fil"
				},
				{
					label: "French",
					value: "fra"
				},
				{
					label: "Icelandic",
					value: "isl"
				},
				{
					label: "Kurdish (Kurmanji)",
					value: "kmr"
				},
				{
					label: "Lithuanian",
					value: "lit"
				},
				{
					label: "Norwegian (nynorsk)",
					value: "nno"
				},
				{
					label: "Norwegian (bokmål)",
					value: "nob"
				},
				{
					label: "Polish",
					value: "pol"
				},
				{
					label: "Dari",
					value: "prs"
				},
				{
					label: "Pashto",
					value: "pus"
				},
				{
					label: "Romanian",
					value: "ron"
				},
				{
					label: "Russian",
					value: "rus"
				},
				{
					label: "Northern Sami",
					value: "sme"
				},
				{
					label: "Somali",
					value: "som"
				},
				{
					label: "Spanish",
					value: "spa"
				},
				{
					label: "Swahili",
					value: "swa"
				},
				{
					label: "Swedish",
					value: "swe"
				},
				{
					label: "Thai",
					value: "tha"
				},
				{
					label: "Tigrinya",
					value: "tir"
				},
				{
					label: "Turkish",
					value: "tur"
				},
				{
					label: "Ukrainian",
					value: "ukr"
				},
				{
					label: "Urdu",
					value: "urd"
				},
				{
					label: "Vietnamese",
					value: "vie"
				}
			]
		}
	},
	{
		label: "Backend Url",
		description: "The Url to the json database",
		"default": "https://cdn-prod-bildetema.azureedge.net/data/data.json.tar.gz",
		name: "backendUrl",
		type: "text"
	}
];
export default $defaultExport;