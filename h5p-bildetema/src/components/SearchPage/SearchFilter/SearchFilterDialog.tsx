import { useMemo, useState } from "react";
import { useNewDBContext } from "common/hooks/useNewDBContext";
import { getMainTopics } from "common/utils/data.utils";
import { toSingleLabel } from "common/utils/word.utils";
import { Dialog } from "@headlessui/react";
import { FilterCheckbox } from "../FilterCheckbox/FilterCheckbox";
import styles from "./SearchFilterDialog.module.scss";
import { Close, Filter } from "../../Icons/Icons";
import Button from "../../Button/Button";

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
      <Button variant="secondary" onClick={() => setIsOpen(true)}>
        <b>
          <Filter />
        </b>
        {/* TODO: translate */}
        <b>Filtrer etter tema</b>
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
                <b>Filtrer etter tema</b>
              </div>

              <button
                type="button"
                className={styles.closeButton}
                onClick={() => setIsOpen(false)}
              >
                <Close />
              </button>
            </Dialog.Title>
            {/* <Dialog.Description>
            This will permanently deactivate your account XDXD
          </Dialog.Description> */}

            {/* <p>
            Are you sure you want to deactivate your account? All of your data
            will be permanently removed. This action cannot be undone.
          </p> */}
            {/* {open && ( */}
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
            {/* )} */}

            {/* <button type="button" onClick={() => setIsOpen(false)}>Deactivate</button>
          <button type="button" onClick={() => setIsOpen(false)}>Cancel</button> */}
            <Button variant="underline" onClick={resetFilter}>
              Nullstill valg
            </Button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default SearchFilterDialog;
