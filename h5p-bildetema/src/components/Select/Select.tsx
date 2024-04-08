import { Listbox } from "@headlessui/react";
import { LanguageMenuArrowIcon } from "../Icons/Icons";
import styles from "./Select.module.scss";

type Option = {
  label: string;
  secondaryLabel?: string;
};

export type OptionType<T extends Option> = T;

type variants = "primary" | "secondary";

export type SelectProps<T extends Option> = {
  options: OptionType<T>[];
  handleChange: (option: OptionType<T>) => void;
  selectedOption: OptionType<T>;
  variant?: variants;
  labelPrefix?: string;
};

const Select = <T extends Option>({
  options,
  handleChange,
  selectedOption,
  variant = "primary",
  labelPrefix,
}: SelectProps<T>): JSX.Element => {
  const label = labelPrefix ? (
    <>
      {labelPrefix} <b>{selectedOption.label}</b>
    </>
  ) : (
    selectedOption.label
  );

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
            {/* {label ?? selectedOption.label} */}
            {label}

            <LanguageMenuArrowIcon
              transform={open ? "scale(1) rotate(180)" : "scale(1)"}
              transformOrigin="50% 50%"
            />
          </Listbox.Button>
          <Listbox.Options className={styles.options}>
            {options.map(option => (
              <Listbox.Option key={option.label} value={option}>
                {({ selected }) => (
                  <div
                    className={`${styles.option} ${
                      selected ? styles.active : ""
                    }`}
                  >
                    <span>{option.label}</span>
                    {option.secondaryLabel && <span>{option.secondaryLabel}</span>}
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
