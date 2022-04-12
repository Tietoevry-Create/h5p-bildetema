
   
import * as fs from "fs";
import { H5PField, H5PBehaviour, H5PL10n } from "h5p-types";
import { semantics } from "./src/semantics";
import { findDuplicates } from "./src/utils/array.utils";

const semanticsPath = "semantics.json";
const translationKeyPath = "src/types/TranslationKey.ts";

async function createSemanticsJson(): Promise<void> {
  const textContent = JSON.stringify(semantics, null, 2);
  await fs.promises.writeFile(semanticsPath, textContent);
}

const isH5PL10n = (obj: H5PField | H5PBehaviour | H5PL10n): obj is H5PL10n => {
  return obj.name === "l10n";
};

async function deleteTranslationKeysFile(): Promise<void> {
  const hasTranslationKeyFile = fs.existsSync(translationKeyPath);
  if (hasTranslationKeyFile) {
    await fs.promises.rm(translationKeyPath);
  }
}

async function createTranslationKeys(): Promise<void> {
  const translationField = semantics.find(field =>
    isH5PL10n(field),
  ) as H5PL10n | null;

  if (!translationField) {
    await deleteTranslationKeysFile();
    return;
  }

  const translationKeys = translationField.fields.map(({ name }) => name);

  const duplicates = findDuplicates(translationKeys);
  const duplicateKeysExist = duplicates.length > 0;
  if (duplicateKeysExist) {
    throw new Error(
      `Duplicate translation keys exist:\n · ${duplicates.join("\n · ")}\n`,
    );
  }

  const translationKeysString = translationKeys.join(`"\n  | "`);

  const textContent = `// --------- ⚠️  WARNING  ⚠️ ---------
// This file is generated from the values within \`semantics.json\`'s l10n group. 
// Do not change it manually, but rather change \`semantics.ts\` and run
// \`npm run generate-semantics\`.
// -----------------------------------
export type TranslationKey =
  | "${translationKeysString}";
`;

  await fs.promises.writeFile(translationKeyPath, textContent);
}

async function run(): Promise<void> {
  await createSemanticsJson();
  await createTranslationKeys();
}

run();