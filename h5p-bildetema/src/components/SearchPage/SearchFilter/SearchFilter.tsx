import React, { useMemo, useState } from "react";
import { useNewDBContext } from "common/hooks/useNewDBContext";
import { getMainTopics } from "common/utils/data.utils";
import { toSingleLabel } from "common/utils/word.utils";
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
  const [open, setOpen] = useState(false);
  const { idToContent, idToWords } = useNewDBContext();
  const topics = useMemo(() => {
    return getMainTopics(idToWords, idToContent).toSorted((a, b) => {
      // TODO NOT HARDCODE "NOB"
      const labelA = toSingleLabel(a.translations.get("nob")?.labels);
      const labelB = toSingleLabel(b.translations.get("nob")?.labels);
      return labelA.localeCompare(labelB);
    });
  }, [idToContent, idToWords]);

  return (
    <div className={style.wrapper}>
      <button
        type="button"
        className={style.filterDropdownButton}
        onClick={() => setOpen(!open)}
      >
        <h2 className={style.title}>Filtrer etter tema</h2>
        <LanguageMenuArrowIcon
          transform={open ? "scale(1) rotate(180)" : "scale(1)"}
          transformOrigin="50% 50%"
        />
      </button>
      {open && (
        <div className={style.searchFilterBorderTop}>
          <div className={style.searchFilter}>
            {topics?.map(topic => (
              <div key={topic.id} className={style.checkBoxWrapper}>
                <FilterCheckbox
                  key={topic.id}
                  id={topic.id}
                  handleChange={(bool: boolean) =>
                    handleFilterChange(topic.id, bool)
                  }
                  checked={filter.includes(topic.id)}
                  label={toSingleLabel(topic.translations.get("nob")?.labels)}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilter;
