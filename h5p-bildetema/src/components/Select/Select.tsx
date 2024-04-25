import { Listbox } from "@headlessui/react";
import { CheckIcon, LanguageMenuArrowIcon } from "../Icons/Icons";
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
  selectedOption: OptionType<T> | null;
  variant?: variants;
  labelPrefix?: string;
  placeholder?: string;
  fixed?: boolean;
  withSelectedIcon?: boolean;
};

const Select = <T extends Option>({
  options,
  handleChange,
  selectedOption,
  variant = "primary",
  labelPrefix,
  placeholder,
  fixed,
  withSelectedIcon,
}: SelectProps<T>): JSX.Element => {
  const labelWithPrefix = (
    <>
      {labelPrefix} <b>{selectedOption?.label}</b>
    </>
  );
  const labelWithPrefixOnly = <b>{labelPrefix}</b>;

  const label = labelPrefix
    ? selectedOption === null
      ? labelWithPrefixOnly
      : labelWithPrefix
    : selectedOption?.label;
  return (
    <Listbox
      value={selectedOption}
      onChange={o => {
        if (o === null) return;
        handleChange(o);
      }}
      by={(a: Option | null, b: Option | null) => a?.label === b?.label}
    >
      {({ open }) => (
        <div className={styles.selectWrapper}>
          <Listbox.Button
            className={`${styles.selectButton} ${styles[variant]}`}
          >
            {label === undefined ? placeholder : label}

            <LanguageMenuArrowIcon
              transform={open ? "scale(1) rotate(180)" : "scale(1)"}
              transformOrigin="50% 50%"
            />
          </Listbox.Button>
          <Listbox.Options
            className={`${styles.options} ${fixed && styles.fixed}`}
          >
            {options.map(option => (
              <Listbox.Option key={option.label} value={option}>
                {({ active, selected }) => {
                  return (
                    <div
                      className={`${styles.option} ${active && styles.active} 
                      ${withSelectedIcon && styles.withCheckIcon} ${
                        selected && styles.selected
                      }`}
                    >
                      {withSelectedIcon && (
                        <span className={styles.icon}>
                          {selected && <CheckIcon />}
                        </span>
                      )}
                      <span>{option.label}</span>
                    </div>
                  );
                }}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      )}
    </Listbox>
  );
};

export default Select;
