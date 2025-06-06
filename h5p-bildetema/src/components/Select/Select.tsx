import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/react";
import {
  CheckIcon,
  LanguageMenuArrowIcon,
} from "common/components/Icons/Icons";
import { JSX } from "react";
import styles from "./Select.module.scss";

type Option = {
  label: string;
  secondaryLabel?: string;
  id?: string;
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
  const getLabel = (label: string | undefined): string | JSX.Element => {
    switch (label) {
      case undefined:
        if (labelPrefix) {
          return <b>{labelPrefix}</b>;
        }
        return placeholder || "";
      default:
        if (labelPrefix) {
          return (
            <>
              {labelPrefix} <b className={styles.buttonText}>{label}</b>
            </>
          );
        }
        return label;
    }
  };

  return (
    <Listbox
      value={selectedOption}
      onChange={o => {
        if (o === null) return;
        handleChange(o);
      }}
      by={(a: Option | null, b: Option | null) => {
        if (a?.id && b?.id) return a.id === b.id;
        return a?.label === b?.label;
      }}
    >
      {({ open }) => (
        <div className={styles.selectWrapper}>
          <ListboxButton
            className={`${styles.selectButton} ${styles[variant]}`}
          >
            {getLabel(selectedOption?.label)}

            <LanguageMenuArrowIcon
              transform={open ? "scale(1) rotate(180)" : "scale(1)"}
              transformOrigin="50% 50%"
            />
          </ListboxButton>
          <ListboxOptions
            className={`${styles.options} ${fixed && styles.fixed}`}
          >
            {options.map(option => (
              <ListboxOption key={option.id ?? option.label} value={option}>
                {({ focus, selected }) => {
                  return (
                    <div
                      className={`${styles.option} ${focus && styles.active} 
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
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      )}
    </Listbox>
  );
};

export default Select;
