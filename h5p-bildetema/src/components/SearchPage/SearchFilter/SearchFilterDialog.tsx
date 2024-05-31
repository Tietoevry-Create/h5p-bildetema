import { useMemo, useState } from "react";
import { Button } from "common/components/Button";
import { useNewDBContext } from "common/hooks/useNewDBContext";
import { getMainTopics } from "common/utils/data.utils";
import { toSingleLabel } from "common/utils/word.utils";
import { Close, Filter } from "common/components/Icons/Icons";
import { Dialog } from "@headlessui/react";
import { FilterCheckbox } from "../FilterCheckbox/FilterCheckbox";
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
  const { idToContent, idToWords } = useNewDBContext();
  const topics = useMemo(() => {
    return getMainTopics(idToWords, idToContent).toSorted((a, b) => {
      // TODO NOT HARDCODE "NOB"
      const labelA = toSingleLabel(a.translations.get("nob")?.labels);
      const labelB = toSingleLabel(b.translations.get("nob")?.labels);
      return labelA.localeCompare(labelB);
    });
  }, [idToContent, idToWords]);

  const checkedTopicsAmount = useMemo(() => {
    return topics?.filter(topic => filter.includes(topic.id)).length;
  }, [filter, topics]);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button variant="filter" onClick={() => setIsOpen(true)}>
        <Filter />
        {/* TODO: translate */}
        <span className={styles.buttonLabel}>Filtrer etter tema</span>
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
          <Dialog.Panel className={styles.panel}>
            <Dialog.Title className={styles.titleWrapper}>
              <div className={styles.title}>
                <Filter />
                {/* TODO: translate */}
                <span className={styles.label}>Filtrer etter tema</span>
              </div>

              <button
                type="button"
                className={styles.closeButton}
                onClick={() => setIsOpen(false)}
              >
                <Close />
              </button>
            </Dialog.Title>
            <div className={styles.searchFilterBorderTop}>
              <div className={styles.searchFilter}>
                {topics?.map(topic => (
                  <div key={topic.id} className={styles.checkBoxWrapper}>
                    <FilterCheckbox
                      key={topic.id}
                      id={topic.id}
                      handleChange={(bool: boolean) =>
                        handleFilterChange(topic.id, bool)
                      }
                      checked={filter.includes(topic.id)}
                      label={toSingleLabel(
                        topic.translations.get("nob")?.labels,
                      )}
                    />
                  </div>
                ))}
              </div>
            </div>
            <Button variant="underline" onClick={resetFilter}>
              {/* TODO: translate */}
              Nullstill valg
            </Button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default SearchFilterDialog;
