import { JSX, ReactNode } from "react";
import { replacePlaceholdersWithHTML } from "common/utils/replacePlaceholders";
import { Link } from "react-router-dom";
import { useL10ns } from "../../../hooks/useL10n";
import { useCurrentLanguage } from "../../../hooks/useCurrentLanguage";

const SearchSuggestion = (): JSX.Element => {
  const lang = useCurrentLanguage();
  const { searchSuggestionText } = useL10ns("searchSuggestionText");

  const items: (string | ReactNode)[] =
    searchSuggestionText.split("{{newLine}}");

  if (items.length > 2) {
    const line3 = replacePlaceholdersWithHTML(
      items[2] as string,
      "emStart",
      "emEnd",
      "em",
    );
    items[2] = line3;
  }

  if (items.length > 5) {
    const line6 = replacePlaceholdersWithHTML(
      items[5] as string,
      "linkStart",
      "linkEnd",
      undefined,
      <Link key={1} to={`/${lang.code}`}>
        placeholder
      </Link>,
    );
    items[5] = line6;
  }

  return (
    <div>
      <p>{items[0]}</p>
      <ul>
        <li>{items[1]}</li>
        <li>{items[2]}</li>
        <li>{items[3]}</li>
        <li>{items[4]}</li>
      </ul>
      <p>{items[5]}</p>
    </div>
  );
};

export default SearchSuggestion;
