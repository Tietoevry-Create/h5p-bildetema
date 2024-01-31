import styles from "./SearchView.module.scss";
import SearchInput from "../SearchInput/SearchInput";

export type SearchFieldPros = {
  handleSearch: (value: string) => void;
  search: string;
};

const SearchResultView = ({
  handleSearch,
  search,
}: SearchFieldPros): JSX.Element => {
  return (
    <div className={styles.searchField}>
      <h1 className={styles.title}>Søk etter ord</h1>
      <SearchInput handleSearch={handleSearch} search={search} />
      <div>Søk på</div>
    </div>
  );
};

export default SearchResultView;
