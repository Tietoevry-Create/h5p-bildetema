import { Language } from "common/types/types";
import styles from "./SearchView.module.scss";
import SearchInput from "../SearchInput/SearchInput";
import Select, { OptionType } from "../../Select/Select";
import { Breadcrumbs } from "../../Breadcrumbs/Breadcrumbs";
import { useCurrentLanguageCode } from "../../../hooks/useCurrentLanguage";
import { LeftRightArrow } from "../../Icons/Icons";
import SearchFilter from "../SearchFilter/SearchFilter";

export type SearchViewProps = {
  handleFilterChange: (topicId: string, add: boolean) => void;
  handleSearch: (value: string) => void;
  search: string;
  languages: OptionType<Language>[];
  handleSearchLanguageChange: (lang: OptionType<Language>) => void;
  handleViewLanguageChange: (lang: OptionType<Language>) => void;
  searchLanguage: OptionType<Language>;
  viewLanguage: OptionType<Language>;
  filter: string[];
};

const SearchView = ({
  filter,
  handleFilterChange,
  handleSearch,
  search,
  languages,
  handleSearchLanguageChange,
  handleViewLanguageChange,
  searchLanguage,
  viewLanguage,
}: SearchViewProps): JSX.Element => {
  const langCode = useCurrentLanguageCode();

  const handleSwitchLangs = (): void => {
    handleSearchLanguageChange(viewLanguage);
    handleViewLanguageChange(searchLanguage);
    handleSearch("");
  };

  return (
    <div className={styles.searchField}>
      <Breadcrumbs
        currentLanguageCode={searchLanguage.code}
        // TODO: translate search label
        breadCrumbs={[
          { label: "Home", path: `/${langCode}` },
          { label: "Søk", path: `/sok` },
        ]}
      />
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Søk i Bildetema</h1>
        <div className={styles.searchInputWrapper}>
          <SearchInput handleSearch={handleSearch} search={search} />
        </div>
        <div className={styles.languageSelectors}>
          <Select
            options={languages}
            handleChange={handleSearchLanguageChange}
            selectedOption={searchLanguage}
          />
          <button
            type="button"
            className={styles.arrowButton}
            onClick={handleSwitchLangs}
          >
            <LeftRightArrow width={24} height={24} />
          </button>
          <Select
            options={languages}
            handleChange={handleViewLanguageChange}
            selectedOption={viewLanguage}
          />
        </div>
      </div>
      <SearchFilter handleFilterChange={handleFilterChange} filter={filter} />
    </div>
  );
};

export default SearchView;
