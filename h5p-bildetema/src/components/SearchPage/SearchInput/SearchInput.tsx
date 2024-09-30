import { useEffect, useRef } from "react";
import { SearchIcon } from "common/components/Icons/Icons";
import styles from "./SearchInput.module.scss";
import { useL10ns } from "../../../hooks/useL10n";

export type SearchInputProps = {
  handleSearch: (value: string) => void;
  search: string;
  placeholder?: string;
  rtl?: boolean;
  lang?: string;
};

const SearchInput = ({
  handleSearch,
  search,
  placeholder,
  rtl,
  lang,
}: SearchInputProps): JSX.Element => {
  const ref = useRef<HTMLInputElement>(null);
  const { searchInputLabel } = useL10ns("searchInputLabel");

  useEffect(() => {
    ref.current?.focus();
  }, []);

  const handleEnter = (): void => {
    ref.current?.blur();
  };

  return (
    <div className={`${styles.searchInputWrapper}`}>
      <label htmlFor={styles.searchInput}>
        <span className={styles.visuallyHidden}>{searchInputLabel}</span>
        <input
          ref={ref}
          id={styles.searchInput}
          type="search"
          lang={lang}
          className={`${styles.searchInput} ${rtl ? styles.rtl : ""}`}
          placeholder={placeholder ?? ""}
          value={search}
          autoComplete="off"
          onChange={e => handleSearch(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleEnter()}
        />
        <span className={styles.searchInputIcon} aria-hidden="true">
          <SearchIcon />
        </span>
      </label>
    </div>
  );
};

export default SearchInput;
