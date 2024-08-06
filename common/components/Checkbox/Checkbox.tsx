/* eslint-disable @typescript-eslint/explicit-function-return-type */
import styles from "./checkbox.module.scss";

type CheckboxProps = {
  value: string;
  name: string;
  id: string;
  isChecked: boolean;
  children: React.ReactNode;
  onChange: () => void;
};

export const Checkbox = ({
  value,
  name,
  id,
  isChecked,
  children,
  onChange,
}: CheckboxProps) => {
  return (
    <div className={styles.task}>
      <input
        className={styles.checkbox}
        type="checkbox"
        id={id}
        name={name}
        value={value}
        checked={isChecked}
        onChange={onChange}
        tabIndex={-1}
      />
      <label htmlFor={id}>
        {children}
        <span className={styles.customCheckbox} />
      </label>
    </div>
  );
};
