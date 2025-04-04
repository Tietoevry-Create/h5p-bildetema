/* eslint-disable jsx-a11y/no-redundant-roles */
import { JSX, useMemo, useState } from "react";
import { Button } from "common/components/Button";
import { useNewDBContext } from "common/hooks/useNewDBContext";
import { getMainTopics } from "common/utils/data.utils";
import { toSingleLabel } from "common/utils/word.utils";
import { Close, Filter } from "common/components/Icons/Icons";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { FilterCheckbox } from "../FilterCheckbox/FilterCheckbox";
import { useSiteLanguage } from "../../../hooks/useSiteLanguage";
import { useL10ns } from "../../../hooks/useL10n";
import styles from "./SearchFilterDialog.module.scss";

export type SearchFilterProps = {
  handleFilterChange: (topicId: string, checked: boolean) => void;
  resetFilter: () => void;
  filter: string[];
};

const SearchFilterDialog = ({
  handleFilterChange,
  resetFilter,
  filter,
}: SearchFilterProps): JSX.Element => {
  const siteLangCode = useSiteLanguage().code;
  const { idToContent, idToWords } = useNewDBContext();
  const { topicFilterTitle, topicFilterReset, topicFilterClose } = useL10ns(
    "topicFilterTitle",
    "topicFilterReset",
    "topicFilterClose",
  );

  const [isOpen, setIsOpen] = useState(false);

  const topics = useMemo(() => {
    return getMainTopics(idToWords, idToContent).toSorted((a, b) => {
      const labelA = toSingleLabel(a.translations.get(siteLangCode)?.labels);
      const labelB = toSingleLabel(b.translations.get(siteLangCode)?.labels);
      return labelA.localeCompare(labelB);
    });
  }, [idToContent, idToWords, siteLangCode]);

  const checkedTopicsAmount = useMemo(() => {
    return topics?.filter(topic => filter.includes(topic.id)).length;
  }, [filter, topics]);

  return (
    <>
      <Button variant="filter" onClick={() => setIsOpen(true)}>
        <Filter />
        <span className={styles.buttonLabel}>{topicFilterTitle}</span>
        {checkedTopicsAmount > 0 && (
          <div className={styles.amount}>{checkedTopicsAmount}</div>
        )}
      </Button>
      <Dialog
        className={styles.dialog}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <div className={styles.backdrop} aria-hidden />
        <div className={styles.panelContainer}>
          <DialogPanel className={styles.panel}>
            <DialogTitle className={styles.titleWrapper}>
              <div className={styles.title}>
                <span aria-hidden="true">
                  <Filter />
                </span>
                <span className={styles.label}>{topicFilterTitle}</span>
              </div>
              <button
                type="button"
                className={styles.closeButton}
                onClick={() => setIsOpen(false)}
              >
                <span aria-hidden="true">
                  <Close />
                </span>
                <span className={styles.visuallyHidden}>
                  {topicFilterClose}
                </span>
              </button>
            </DialogTitle>
            <div className={styles.searchFilterWrapper}>
              <ul role="list" className={styles.searchFilter}>
                {topics?.map(topic => (
                  <li
                    role="listitem"
                    key={topic.id}
                    className={styles.checkBoxWrapper}
                  >
                    <FilterCheckbox
                      key={topic.id}
                      id={topic.id}
                      handleChange={(bool: boolean) =>
                        handleFilterChange(topic.id, bool)
                      }
                      checked={filter.includes(topic.id)}
                      label={toSingleLabel(
                        topic.translations.get(siteLangCode)?.labels,
                      )}
                    />
                  </li>
                ))}
              </ul>
            </div>
            <Button variant="underline" onClick={resetFilter}>
              {topicFilterReset}
            </Button>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default SearchFilterDialog;
