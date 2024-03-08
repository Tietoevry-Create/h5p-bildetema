import React, { useMemo, useState } from "react";
import { useNewDBContext } from "common/hooks/useNewDBContext";
import { getMainTopics } from "common/utils/data.utils";
import { FilterCheckbox } from "../FilterCheckbox/FilterCheckbox";
import style from "./SearchFilter.module.scss";
import { LanguageMenuArrowIcon } from "../../Icons/Icons";

export type SearchFilterProps = {
  handleFilterChange: (topicId: string, checked: boolean) => void;
  filter: string[];
};

const SearchFilter = ({
  handleFilterChange,
  filter,
}: SearchFilterProps): JSX.Element => {
  const [open, setOpen] = useState(true);
  const { idToContent, idToWords } = useNewDBContext();
  const topics = useMemo(() => {
    return getMainTopics(idToWords, idToContent);
  }, [idToContent, idToWords]);

  return (
    <div className={style.wrapper}>
      <button
        type="button"
        className={style.filterDropdownButton}
        onClick={() => setOpen(!open)}
      >
        <h2 className={style.title}>
          <b>Filtrer etter tema</b>
        </h2>
        <LanguageMenuArrowIcon
          transform={open ? "scale(1) rotate(180)" : "scale(1)"}
          transformOrigin="50% 50%"
        />
      </button>
      {open && (
        <div className={style.searchFilterBorderTop}>
          <div className={style.searchFilter}>
            {topics?.map(topic => (
              <FilterCheckbox
                key={topic.id}
                id={topic.id}
                handleChange={(bool: boolean) =>
                  handleFilterChange(topic.id, bool)
                }
                checked={filter.includes(topic.id)}
                label={topic.translations.get("nob")?.labels[0].label || ""}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilter;
