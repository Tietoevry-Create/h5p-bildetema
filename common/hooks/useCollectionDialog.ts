/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState, useCallback, useEffect } from "react";
import { useDialogContext } from "common/hooks/useDialogContext";
import { useMyCollections } from "common/hooks/useMyCollections";
import { Option } from "common/types/types";
import { sortOptions } from "common/utils/sorting.utils";
import { findDifference } from "common/utils/array.utils";

export const useCollectionDialog = () => {
  const { selectedId, handleCloseDialog, isOpen } = useDialogContext();
  const { myCollections, updateCollectionsWithWord, addCollection } =
    useMyCollections();

  const [options, setOptions] = useState<Option[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [showCreateNewOption, setShowCreateNewOption] = useState(false);

  const showCreate = showCreateNewOption || options.length === 0;

  const fetchOptions = useCallback(() => {
    const fetchedOptions: Option[] = myCollections.map(item => ({
      label: item.title,
      id: item.id,
    }));

    const selected = myCollections
      .filter(c => c.wordsIds.includes(selectedId ?? ""))
      .map(c => c.id);

    setSelectedOptions(selected);

    const sortedOptions = sortOptions(fetchedOptions, selected);

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

  const getCollectionChangeDetails = useCallback(() => {
    if (!selectedId) return null;

    const originallySelected = myCollections
      .filter(c => c.wordsIds.includes(selectedId ?? ""))
      .map(c => c.id);

    const [removedElements, addedElements] = findDifference(
      originallySelected,
      selectedOptions,
    );

    if (removedElements.length + addedElements.length > 1) {
      return null;
    }

    if (removedElements.length === 1 && addedElements.length === 0) {
      const collection = myCollections.find(c => c.id === removedElements[0]);
      return {
        wasRemoved: true,
        collection,
      };
    }

    if (removedElements.length === 0 && addedElements.length === 1) {
      const collection = myCollections.find(c => c.id === addedElements[0]);
      return {
        wasRemoved: false,
        collection,
      };
    }

    return null;
  }, [myCollections, selectedId, selectedOptions]);

  const handleCreateNewOption = (optionName: string) => {
    if (!selectedId) return;

    addCollection({
      title: optionName,
      wordIds: [selectedId],
    });
  };

  const handleConfirm = (optionName: string = "") => {
    if (showCreate && optionName) {
      handleCreateNewOption(optionName);
      setShowCreateNewOption(false);
    } else {
      updateCollectionsWithWord(selectedId ?? "", selectedOptions);
    }

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
