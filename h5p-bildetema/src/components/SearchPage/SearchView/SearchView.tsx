import { Language } from "common/types/types";
import { STATIC_PATH } from "common/constants/paths";
import SearchInput from "../SearchInput/SearchInput";
import Select, { OptionType } from "../../Select/Select";
import { Breadcrumbs } from "../../Breadcrumbs/Breadcrumbs";
import { useCurrentLanguage } from "../../../hooks/useCurrentLanguage";
import { useL10ns } from "../../../hooks/useL10n";
import styles from "./SearchView.module.scss";

export type SearchViewProps = {
  handleSearch: (value: string) => void;
  search: string;
  languages: OptionType<Language>[];
  handleSearchLanguageChange: (lang: OptionType<Language>) => void;
  searchLanguage: OptionType<Language>;
  searchInputPlaceholder: string;
};

const SearchView = ({
  handleSearch,
  search,
  languages,
  handleSearchLanguageChange,
  searchLanguage,
  searchInputPlaceholder,
}: SearchViewProps): JSX.Element => {
  const currentLang = useCurrentLanguage();
  const langCode = currentLang?.code;
  const isRtl = !!(currentLang?.rtl && search !== "");

  const {
    breadcrumbsHome,
    search: breadcrumbsSearch,
    searchLabel,
  } = useL10ns("breadcrumbsHome", "search", "searchLabel");

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
          />
          <Select
            options={languages}
            handleChange={handleSearchLanguageChange}
            selectedOption={searchLanguage}
            variant="secondary"
            labelPrefix={searchLabel}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchView;
