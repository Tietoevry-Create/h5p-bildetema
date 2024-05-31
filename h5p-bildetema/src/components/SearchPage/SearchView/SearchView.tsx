import { Language } from "common/types/types";
import { STATIC_PATH } from "common/constants/paths";
import styles from "./SearchView.module.scss";
import SearchInput from "../SearchInput/SearchInput";
import Select, { OptionType } from "../../Select/Select";
import { Breadcrumbs } from "../../Breadcrumbs/Breadcrumbs";
import { useCurrentLanguage } from "../../../hooks/useCurrentLanguage";
import SearchFilterDialog from "../SearchFilter/SearchFilterDialog";

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

  return (
    <div className={styles.searchField}>
      <Breadcrumbs
        currentLanguageCode={searchLanguage.code}
        // TODO: translate search label
        breadCrumbs={[
          { label: "Home", path: `/${langCode}` },
          { label: "Søk", path: `${STATIC_PATH.SEARCH}` },
        ]}
      />
      <div className={styles.wrapper}>
        {/* // TODO: translate */}
        <h1 className={styles.title}>Søk i Bildetema</h1>
        <div className={styles.searchInputWrapper}>
          <SearchInput
            handleSearch={handleSearch}
            search={search}
            placeholder={searchInputPlaceholder}
            rtl={isRtl}
            // rtl
          />
          <Select
            options={languages}
            handleChange={handleSearchLanguageChange}
            selectedOption={searchLanguage}
            variant="secondary"
            // TODO: translate
            labelPrefix="Søk på"
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
            // TODO: translate
            labelPrefix={`${
              viewLanguage == null ? "Vis på flere språk" : "Vis på"
            }`}
            withSelectedIcon
          />
        </div>
      </div>
    </div>
  );
};

export default SearchView;
