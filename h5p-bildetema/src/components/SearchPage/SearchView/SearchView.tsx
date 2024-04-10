import { Language } from "common/types/types";
import styles from "./SearchView.module.scss";
import SearchInput from "../SearchInput/SearchInput";
import Select, { OptionType } from "../../Select/Select";
import { Breadcrumbs } from "../../Breadcrumbs/Breadcrumbs";
import { useCurrentLanguage } from "../../../hooks/useCurrentLanguage";
// import { LeftRightArrow } from "../../Icons/Icons";
// import SearchFilter from "../SearchFilter/SearchFilter";
import Button from "../../Button/Button";
import { LanguageIcon } from "../../Icons/Icons";
import SearchFilterDialog from "../SearchFilter/SearchFilterDialog";

export type SearchViewProps = {
  handleFilterChange: (topicId: string, add: boolean) => void;
  handleSearch: (value: string) => void;
  search: string;
  languages: OptionType<Language>[];
  handleSearchLanguageChange: (lang: OptionType<Language>) => void;
  searchLanguage: OptionType<Language>;
  // viewLanguage: OptionType<Language>;
  filter: string[];
  searchInputPlaceholder: string;
  resetFilter: () => void;
};

const SearchView = ({
  filter,
  handleFilterChange,
  handleSearch,
  search,
  languages,
  handleSearchLanguageChange,
  searchLanguage,
  // viewLanguage,
  searchInputPlaceholder,
  resetFilter,
}: SearchViewProps): JSX.Element => {
  const currentLang = useCurrentLanguage()
  const langCode = currentLang?.code
  const isRtl = !!(currentLang?.rtl && search !== "");


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
        {/* // TODO: translate */}
        <h1 className={styles.title}>Søk i Bildetema</h1>
        <div className={styles.searchInputWrapper}>
          <SearchInput
            handleSearch={handleSearch}
            search={search}
            placeholder={searchInputPlaceholder}
            rlt={isRtl}
            // rlt
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
          {/* <Button variant="secondary" disabled> */}

          <Button variant="secondary" disabled>
            <b>
              <LanguageIcon />
            </b>
            {/* TODO: translate */}
            <b>Vis på flere språk</b>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchView;
