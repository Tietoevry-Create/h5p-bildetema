import { SearchIcon } from "../../Icons/Icons";
import styles from "./SearchInput.module.scss";

export type SearchInputProps = {
  handleSearch: (value: string) => void;
  search: string;
};

const SearchInput = ({
  handleSearch,
  search,
}: SearchInputProps): JSX.Element => {
  return (
    <div className={`${styles.searchInputWrapper}`}>
      <input
        // TODO needs a label
        id={styles.searchInput}
        // TODO fix static Søk value
        placeholder="Søk"
        value={search}
        onChange={e => handleSearch(e.target.value)}
      />
      <span className={styles.searchInputIcon}>
        <SearchIcon width={20} height={20}/>
      </span>
    </div>
  );
};

export default SearchInput;
