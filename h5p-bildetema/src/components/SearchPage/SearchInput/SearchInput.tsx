import { useEffect, useRef } from "react";
import { SearchIcon } from "../../Icons/Icons";
import styles from "./SearchInput.module.scss";

export type SearchInputProps = {
  handleSearch: (value: string) => void;
  search: string;
  placeholder?: string;
  rlt?: boolean;
};

const SearchInput = ({
  handleSearch,
  search,
  placeholder,
  rlt,
}: SearchInputProps): JSX.Element => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  const handleEnter = (): void => {
    ref.current?.blur();
  };

  return (
    <div className={`${styles.searchInputWrapper}`}>
      <input
        ref={ref}
        // TODO needs a label
        id={styles.searchInput}
        // TODO fix static Søk value
        className={`${rlt ? styles.rtl : ""}`}
        placeholder={placeholder ?? "Søk"}
        value={search}
        autoComplete="off"
        onChange={e => handleSearch(e.target.value)}
        onKeyDown={e => e.key === "Enter" && handleEnter()}
      />
      <span className={styles.searchInputIcon}>
        <SearchIcon width={20} height={20} />
      </span>
    </div>
  );
};

export default SearchInput;
