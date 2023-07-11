declare const $defaultExport: [
	{
		label: "Words",
		name: "words",
		type: "list",
		entity: "Word",
		importance: "low",
		widget: "none",
		field: {
			label: "Item",
			name: "wordItems",
			importance: "low",
			type: "group",
			fields: [
				{
					label: "Word",
					name: "label",
					type: "text"
				},
				{
					label: "Images",
					name: "images",
					type: "list",
					entity: "Image",
					field: {
						label: "Image URL",
						name: "imageUrl",
						type: "text"
					}
				},
				{
					label: "Audio URL",
					name: "audio",
					type: "text"
				}
			]
		}
	},
	{
		name: "behaviour",
		type: "group",
		label: "Behavioral settings",
		importance: "low",
		fields: [
		]
	},
	{
		name: "l10n",
		type: "group",
		common: true,
		label: "Localize",
		fields: [
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
				label: "Language code",
				name: "htmlLanguageCode",
				description: "Two character language code, used for setting language in code (English: en, Norwegian Bokmål: nb)",
				"default": "en",
				type: "text"
			}
		]
	},
	{
		label: "Show written words",
		name: "showWrittenWords",
		type: "boolean",
		"default": true,
		importance: "low"
	},
	{
		label: "Show articles",
		name: "showArticles",
		type: "boolean",
		"default": false,
		importance: "low"
	}
];
export default $defaultExport;