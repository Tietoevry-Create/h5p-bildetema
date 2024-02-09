import { Language } from "common/types/types";
import styles from "./SearchView.module.scss";
import SearchInput from "../SearchInput/SearchInput";
import Select, { OptionType } from "../../Select/Select";

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
  return (
    <div className={styles.searchField}>
      <h1 className={styles.title}>Søk etter ord</h1>
      <SearchInput handleSearch={handleSearch} search={search} />
      <div className={styles.languageSelectors}>
        <Select
          options={languages}
          handleChange={handleLanguageChange}
          selectedOption={currLang}
        />
        <Select
          options={languages}
          handleChange={handleViewLanguageChange}
          selectedOption={viewLanguage}
        />
      </div>
    </div>
  );
};

export default SearchView;
