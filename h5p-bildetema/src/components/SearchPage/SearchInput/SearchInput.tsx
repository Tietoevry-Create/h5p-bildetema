import { useEffect, useRef } from "react";
import { Close, SearchIcon } from "../../Icons/Icons";
import styles from "./SearchInput.module.scss";

export type SearchInputProps = {
  handleSearch: (value: string) => void;
  search: string;
  placeholder?: string;
  rtl?: boolean;
};

const SearchInput = ({
  handleSearch,
  search,
  placeholder,
  rtl,
}: SearchInputProps): JSX.Element => {
  const hasSearchValue = search !== "";
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  const handleEnter = (): void => {
    ref.current?.blur();
  };

  const handleClear = (): void => {
    handleSearch("");
    ref.current?.focus();
  }

  return (
    <div className={`${styles.searchInputWrapper}`}>
      <input
        ref={ref}
        // TODO needs a label
        id={styles.searchInput}
        className={rtl ? styles.rtl : ""}
        placeholder={placeholder ?? ""}
        value={search}
        autoComplete="off"
        onChange={e => handleSearch(e.target.value)}
        onKeyDown={e => e.key === "Enter" && handleEnter()}
      />
      <span className={styles.searchInputIcon}>
        <SearchIcon />
      </span>
      {hasSearchValue && (
        <button
          type="button"
          className={`${styles.clearButton} ${rtl ? styles.rtl : ""}`}
          onClick={handleClear}
          // TODO translate
          aria-label="Fjern søkeord"
        >
          <Close />
        </button>
      )}
    </div>
  );
};

export default SearchInput;
