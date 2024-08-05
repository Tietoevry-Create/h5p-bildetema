/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState, useCallback, useEffect } from "react";
import { useDialogContext } from "common/hooks/useDialogContext";
import { useMyCollections } from "common/hooks/useMyCollections";
import { Option } from "common/types/types";
import { sortOptions } from "common/utils/sorting.utils";
import { useNewDBContext } from "common/hooks/useNewDBContext";
import { findDifference } from "common/utils/array.utils";

export const useCollectionDialog = () => {
  const { selectedId, handleCloseDialog, isOpen } = useDialogContext();
  const { myCollections, updateCollectionsWithWord, addCollection } =
    useMyCollections();
  const { idToWords } = useNewDBContext();

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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getCollectionChangeDetails = useCallback(() => {
    if (!selectedId) return null;
    console.log("test 1");

    const word = idToWords.get(selectedId);
    console.log(word);
    const wordName = word?.translations.get("nob")?.labels?.[0].label ?? "";
    console.log("wordName", wordName);

    const originallySelected = myCollections
      .filter(c => c.wordsIds.includes(selectedId ?? ""))
      .map(c => c.id);

    const [removedElements, addedElements] = findDifference(
      originallySelected,
      selectedOptions,
    );
    console.log("removed", removedElements, "added", addedElements);

    console.log("test 2");
    if (removedElements.length + addedElements.length > 1) {
      return null;
    }
    console.log("test 3");

    if (removedElements.length === 1 && addedElements.length === 0) {
      const collectionName =
        myCollections.find(c => c.id === removedElements[0])?.title ?? "";
      return {
        wasRemoved: true,
        wordName,
        collectionName,
      };
    }
    console.log("test 4");

    if (removedElements.length === 0 && addedElements.length === 1) {
      const collectionName =
        myCollections.find(c => c.id === addedElements[0])?.title ?? "";
      return {
        wasRemoved: false,
        wordName,
        collectionName,
      };
    }
    console.log("test 5");

    return null;
  }, [idToWords, myCollections, selectedId, selectedOptions]);

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
