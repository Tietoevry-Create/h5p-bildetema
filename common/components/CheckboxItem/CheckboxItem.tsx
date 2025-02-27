/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Checkbox } from "common/components/Checkbox/Checkbox";
import { Option } from "common/types/types";
import styles from "./CheckboxItem.module.scss";

type CheckboxItemProps = {
  option: Option;
  isSelected: boolean;
  onToggle: (id: string) => void;
};

const CheckboxItem = ({ option, isSelected, onToggle }: CheckboxItemProps) => {
  return (
    <div
      className={`${styles.container} ${isSelected ? styles.checked : ""}`}
      onClick={() => onToggle(option.id)}
      role="button"
      tabIndex={0}
      onKeyDown={e => {
        // Toggle checkbox if Enter or Space key
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle(option.id);
        }
      }}
    >
      <Checkbox
        isChecked={isSelected}
        id={option.id}
        name={option.label}
        onChange={() => onToggle(option.id)}
        value={option.id}
      >
        {option.label}
      </Checkbox>
    </div>
  );
};

export default CheckboxItem;
