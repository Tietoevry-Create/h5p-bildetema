/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState, useCallback, useEffect } from "react";
import { useDialogContext } from "common/hooks/useDialogContext";
import { useMyCollections } from "common/hooks/useMyCollections";
import { Collection, Option } from "common/types/types";
import { sortBySelectionStatus } from "common/utils/sorting.utils";
import { findDifference } from "common/utils/array.utils";

export const useCollectionDialog = () => {
  const { selectedId, handleCloseDialog, isOpen } = useDialogContext();
  const {
    myCollections,
    updateCollectionsWithWord,
    addCollection,
    updateSortOrder,
  } = useMyCollections();

  const [options, setOptions] = useState<Option[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [showCreateNewOption, setShowCreateNewOption] = useState(false);
  const [sortOrder, setSortOrder] = useState<string[]>([]);

  const showCreate = showCreateNewOption || options.length === 0;

  const fetchOptions = useCallback(() => {
    const fetchedOptions: Option[] = myCollections
      .map(item => ({
        label: item.title,
        id: item.id,
        sortingNumber: item.sortingNumber,
      }))
      .sort((a, b) => (a.sortingNumber ?? 0) - (b.sortingNumber ?? 0))
      .map(({ sortingNumber, ...rest }) => rest);

    setSortOrder(fetchedOptions.map(o => o.id));

    const selected = myCollections
      .filter(c => c.wordsIds.includes(selectedId ?? ""))
      .map(c => c.id);

    setSelectedOptions(selected);

    const sortedOptions = sortBySelectionStatus(fetchedOptions, selected);

    setOptions(sortedOptions);
  }, [myCollections, selectedId]);

  useEffect(() => {
    if (isOpen) {
      fetchOptions();
    }
  }, [isOpen, fetchOptions]);

  useEffect(() => {
    if (!isOpen) {
      setShowCreateNewOption(false);
    }
  }, [isOpen]);

  const getCollectionChangeDetails = useCallback((): {
    wasChanged?: boolean;
    wasRemoved?: boolean;
    collection?: Collection | undefined;
  } | null => {
    if (!selectedId) return null;

    const originallySelected = myCollections
      .filter(c => c.wordsIds.includes(selectedId ?? ""))
      .map(c => c.id);

    const [removedElements, addedElements] = findDifference(
      originallySelected,
      selectedOptions,
    );

    if (removedElements.length === 1 && addedElements.length === 0) {
      const collection = myCollections.find(c => c.id === removedElements[0]);
      return {
        wasChanged: true,
        wasRemoved: true,
        collection,
      };
    }

    if (removedElements.length === 0 && addedElements.length === 1) {
      const collection = myCollections.find(c => c.id === addedElements[0]);
      return {
        wasChanged: true,
        wasRemoved: false,
        collection,
      };
    }

    if (removedElements.length > 1 || addedElements.length > 1) {
      return {
        wasChanged: true,
      };
    }

    return null;
  }, [myCollections, selectedId, selectedOptions]);

  const handleCreateNewOption = (optionName: string) => {
    if (!selectedId) return "";

    const newId = addCollection({
      title: optionName,
      wordIds: [selectedId],
    });

    setSortOrder(prevSortOrder => {
      const newSortOrder = [newId, ...prevSortOrder];
      updateSortOrder(newSortOrder);
      return newSortOrder;
    });

    return newId;
  };

  const handleConfirm = (optionName: string = "") => {
    const selectedOptionsCopy = [...selectedOptions];
    if (showCreate && optionName) {
      const id = handleCreateNewOption(optionName);
      selectedOptionsCopy.push(id);
      setShowCreateNewOption(false);
    } else {
      updateSortOrder(sortOrder);
    }

    updateCollectionsWithWord(selectedId ?? "", selectedOptionsCopy);
    handleCloseDialog();
  };

  const handleCancel = () => {
    if (showCreate) {
      setShowCreateNewOption(false);
    } else {
      setSelectedOptions([]);
      handleCloseDialog();
    }
  };

  const toggleOption = (id: string): void => {
    setSelectedOptions(prevSelected =>
      prevSelected.includes(id)
        ? prevSelected.filter(optionId => optionId !== id)
        : [...prevSelected, id],
    );

    setSortOrder(prevSortOrder => {
      return [id, ...prevSortOrder.filter(x => x !== id)];
    });
  };

  const handleNewOptionClick = () => {
    setShowCreateNewOption(true);
  };

  return {
    options,
    selectedOptions,
    handleNewOptionClick,
    showCreate,
    handleConfirm,
    handleCancel,
    toggleOption,
    getCollectionChangeDetails,
  };
};
