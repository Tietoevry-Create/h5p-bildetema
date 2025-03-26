import { Language } from "common/types/types";
import { STATIC_PATH } from "common/constants/paths";
import { JSX } from "react";
import SearchInput from "../SearchInput/SearchInput";
import Select, { OptionType } from "../../Select/Select";
import { Breadcrumbs } from "../../Breadcrumbs/Breadcrumbs";
import {
  getLanguageAttribute,
  useCurrentLanguage,
} from "../../../hooks/useCurrentLanguage";
import { useL10ns } from "../../../hooks/useL10n";
import styles from "./SearchView.module.scss";

export type SearchViewProps = {
  handleSearch: (value: string) => void;
  search: string;
  languages: OptionType<Language>[];
  handleSearchLanguageChange: (lang: OptionType<Language>) => void;
  searchLanguage: OptionType<Language>;
  searchInputPlaceholder: string;
  viewLanguage: OptionType<Language> | null;
  handleViewLanguageChange: (lang: OptionType<Language>) => void;
};

const SearchView = ({
  handleSearch,
  search,
  languages,
  handleSearchLanguageChange,
  searchLanguage,
  searchInputPlaceholder,
  viewLanguage,
  handleViewLanguageChange,
}: SearchViewProps): JSX.Element => {
  const currentLang = useCurrentLanguage();
  const langCode = currentLang?.code;
  const isRtl = !!(currentLang?.rtl && search !== "");

  const {
    breadcrumbsHome,
    search: breadcrumbsSearch,
    searchLabel,
    viewLanguageLabel,
    viewLanguageLabelShort,
  } = useL10ns(
    "breadcrumbsHome",
    "search",
    "searchLabel",
    "viewLanguageLabel",
    "viewLanguageLabelShort",
  );

  return (
    <div className={styles.searchField}>
      <Breadcrumbs
        currentLanguageCode={searchLanguage.code}
        breadCrumbs={[
          { label: breadcrumbsHome, path: `/${langCode}` },
          {
            label: breadcrumbsSearch,
            path: `${STATIC_PATH.SEARCH}?lang=${langCode}`,
          },
        ]}
      />
      <div className={styles.wrapper}>
        <div className={styles.searchInputWrapper}>
          <SearchInput
            handleSearch={handleSearch}
            search={search}
            placeholder={searchInputPlaceholder}
            rtl={isRtl}
            langAttribute={getLanguageAttribute(searchLanguage.code)}
          />
          <Select
            options={languages}
            handleChange={handleSearchLanguageChange}
            selectedOption={searchLanguage}
            variant="secondary"
            labelPrefix={searchLabel}
          />
          <Select
            options={languages}
            handleChange={handleViewLanguageChange}
            selectedOption={viewLanguage}
            variant="secondary"
            labelPrefix={`${
              viewLanguage == null ? viewLanguageLabel : viewLanguageLabelShort
            }`}
            withSelectedIcon
          />
        </div>
      </div>
    </div>
  );
};

export default SearchView;
