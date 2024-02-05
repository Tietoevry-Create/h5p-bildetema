import { useState } from "react";
import { Listbox } from "@headlessui/react";
import { LanguageMenuArrowIcon } from "../Icons/Icons";
import styles from "./Select.module.scss";

export type SelectProps = {
  options: string[];
  handleChange: (option: string) => void;
};

const Select = ({ options, handleChange }: SelectProps): JSX.Element => {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  return (
    <Listbox
      value={selectedOption}
      onChange={o => {
        setSelectedOption(o);
        handleChange(o);
      }}
    >
      {({ open }) => (
        <div className={styles.selectWrapper}>
          <Listbox.Button className={styles.selectButton}>
            {selectedOption}

            <LanguageMenuArrowIcon
              transform={open ? "scale(1) rotate(180)" : "scale(1)"}
              transformOrigin="50% 50%"
            />
          </Listbox.Button>
          <Listbox.Options className={styles.options}>
            {options.map(option => (
              <Listbox.Option key={option} value={option}>
                {({ active }) => (
                  <div
                    className={`${styles.option} ${
                      active ? styles.active : ""
                    }`}
                  >
                    {option}
                  </div>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      )}
    </Listbox>
  );
};

export default Select;
