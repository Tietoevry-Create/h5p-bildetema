import TextInput from "common/components/TextInput/TextInput";
import React from "react";

interface NewOptionProps {
  value: string;
  handleChange: (value: string) => void;
  onCreateOption: (optionName: string) => void;
}

const NewOption: React.FC<NewOptionProps> = ({
  value,
  handleChange,
  onCreateOption,
}) => {
  const handleNewOptionChange = (option: string) => {
    handleChange(option);
  };

  const handleCreateOption = () => {
    if (value.trim()) {
      onCreateOption(value);
      handleChange("");
    }
  };

  return (
    <div>
      <TextInput
        handleChange={handleNewOptionChange}
        handleEnter={handleCreateOption}
        value={value}
      />
    </div>
  );
};

export default NewOption;
