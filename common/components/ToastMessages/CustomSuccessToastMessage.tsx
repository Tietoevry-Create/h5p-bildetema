import { SuccessIcon } from "common/components/Icons/Icons";
import { Button } from "common/components/Button";
import toast, { Toast } from "react-hot-toast";

import styles from "./CustomSuccessToastMessage.module.scss";

type ToastMessageProps = {
  t: Toast;
  children: React.ReactNode;
};

const CustomSuccessToastMessage = ({
  t,
  children,
}: ToastMessageProps): JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={styles.group}>
        <SuccessIcon size={20} />
        <span>{children}</span>
      </div>
      <Button variant="icon" type="button" onClick={() => toast.dismiss(t.id)}>
        &#x2715;
      </Button>
    </div>
  );
};

export default CustomSuccessToastMessage;
