import { Language } from "common/types/types";
import styles from "./SearchView.module.scss";
import SearchInput from "../SearchInput/SearchInput";
import Select, { OptionType } from "../../Select/Select";
import { Breadcrumbs } from "../../Breadcrumbs/Breadcrumbs";
import { useCurrentLanguageCode } from "../../../hooks/useCurrentLanguage";
import { LeftRightArrow } from "../../Icons/Icons";

export type SearchFieldPros = {
  handleSearch: (value: string) => void;
  search: string;
  languages: OptionType<Language>[];
  handleLanguageChange: (lang: OptionType<Language>) => void;
  handleViewLanguageChange: (lang: OptionType<Language>) => void;
  currLang: OptionType<Language>;
  viewLanguage: OptionType<Language>;
};

const SearchView = ({
  handleSearch,
  search,
  languages,
  handleLanguageChange,
  handleViewLanguageChange,
  currLang,
  viewLanguage,
}: SearchFieldPros): JSX.Element => {
  const langCode = useCurrentLanguageCode();
  return (
    <div className={styles.searchField}>
      <Breadcrumbs
        currentLanguageCode={currLang.code}
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
            handleChange={handleLanguageChange}
            selectedOption={currLang}
          />
          <button type="button" className={styles.arrowButton}>
            <LeftRightArrow width={24} height={24} />
          </button>
          <Select
            options={languages}
            handleChange={handleViewLanguageChange}
            selectedOption={viewLanguage}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchView;
