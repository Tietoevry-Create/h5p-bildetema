import { Language } from "common/types/types";
import styles from "./SearchView.module.scss";
import SearchInput from "../SearchInput/SearchInput";
import Select, { OptionType } from "../../Select/Select";

export type SearchFieldPros = {
  handleSearch: (value: string) => void;
  search: string;
  languages: OptionType<Language>[];
  handleLanguageChange: (lang: OptionType<Language>) => void;
  currLang: OptionType<Language>;
};

const SearchResultView = ({
  handleSearch,
  search,
  languages,
  handleLanguageChange,
  currLang,
}: SearchFieldPros): JSX.Element => {
  return (
    <div className={styles.searchField}>
      <h1 className={styles.title}>Søk etter ord</h1>
      <SearchInput handleSearch={handleSearch} search={search} />
      <Select
        options={languages}
        handleChange={handleLanguageChange}
        selectedOption={currLang}
      />
    </div>
  );
};

export default SearchResultView;
