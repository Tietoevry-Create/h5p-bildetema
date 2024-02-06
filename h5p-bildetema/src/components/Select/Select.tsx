import { Listbox } from "@headlessui/react";
import { LanguageMenuArrowIcon } from "../Icons/Icons";
import styles from "./Select.module.scss";

type Option = {
  label: string;
};

export type OptionType<T extends Option> = T;

type variants = "default" | "dark";

// export type SelectProps = {
export type SelectProps<T extends Option> = {
  options: OptionType<T>[];
  handleChange: (option: OptionType<T>) => void;
  selectedOption: OptionType<T>;
  variant?: variants;
};

// eslint-disable-next-line react/function-component-definition
const Select = <T extends Option>({
  options,
  handleChange,
  selectedOption,
  variant = "default",
}: SelectProps<T>): JSX.Element => {
  return (
    <Listbox
      value={selectedOption}
      onChange={o => {
        handleChange(o);
      }}
    >
      {({ open }) => (
        <div className={styles.selectWrapper}>
          <Listbox.Button
            className={`${styles.selectButton} ${styles[variant]}`}
          >
            {selectedOption.label}

            <LanguageMenuArrowIcon
              transform={open ? "scale(1) rotate(180)" : "scale(1)"}
              transformOrigin="50% 50%"
            />
          </Listbox.Button>
          <Listbox.Options className={styles.options}>
            {options.map(option => (
              <Listbox.Option key={option.label} value={option}>
                {({ active }) => (
                  <div
                    className={`${styles.option} ${
                      active ? styles.active : ""
                    }`}
                  >
                    {option.label}
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
