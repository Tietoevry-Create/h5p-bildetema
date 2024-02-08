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
    <div className={styles.searchInputWrapper}>
      <input
        placeholder="Søk"
        value={search}
        onChange={e => handleSearch(e.target.value)}
        className={styles.searchInput}
      />
      <span className={styles.searchInputText}>
        <span className={styles.text}>Søk</span>
      </span>
    </div>
  );
};

export default SearchInput;
