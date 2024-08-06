/* eslint-disable @typescript-eslint/explicit-function-return-type */
import CheckboxItem from "common/components/CheckboxItem/CheckboxItem";
import { Option } from "common/types/types";

import styles from "./CheckboxItemList.module.scss";

type CheckboxItemListProps = {
  options: Option[];
  selectedOptions: string[];
  onToggle: (id: string) => void;
};

const CheckboxItemList = ({
  options,
  selectedOptions,
  onToggle,
}: CheckboxItemListProps) => {
  return (
    <div className={styles.container}>
      {options.map(option => (
        <CheckboxItem
          key={option.id}
          option={option}
          isSelected={selectedOptions.includes(option.id)}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
};

export default CheckboxItemList;
