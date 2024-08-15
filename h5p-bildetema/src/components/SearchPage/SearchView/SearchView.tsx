import { Language } from "common/types/types";
import { STATIC_PATH } from "common/constants/paths";
import SearchInput from "../SearchInput/SearchInput";
import Select, { OptionType } from "../../Select/Select";
import { Breadcrumbs } from "../../Breadcrumbs/Breadcrumbs";
import { useCurrentLanguage } from "../../../hooks/useCurrentLanguage";
import SearchFilterDialog from "../SearchFilter/SearchFilterDialog";
import { useL10ns } from "../../../hooks/useL10n";
import styles from "./SearchView.module.scss";

export type SearchViewProps = {
  handleFilterChange: (topicId: string, add: boolean) => void;
  handleSearch: (value: string) => void;
  search: string;
  languages: OptionType<Language>[];
  handleSearchLanguageChange: (lang: OptionType<Language>) => void;
  searchLanguage: OptionType<Language>;
  viewLanguage: OptionType<Language> | null;
  filter: string[];
  searchInputPlaceholder: string;
  resetFilter: () => void;
  handleViewLanguageChange: (lang: OptionType<Language>) => void;
};

const SearchView = ({
  filter,
  handleFilterChange,
  handleSearch,
  search,
  languages,
  handleSearchLanguageChange,
  searchLanguage,
  viewLanguage,
  searchInputPlaceholder,
  resetFilter,
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
          { label: breadcrumbsSearch, path: `${STATIC_PATH.SEARCH}` },
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
        <div className={styles.buttonWrapper}>
          <SearchFilterDialog
            handleFilterChange={handleFilterChange}
            filter={filter}
            resetFilter={resetFilter}
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
