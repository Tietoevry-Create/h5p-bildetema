import { Button } from "common/components/Button";
import toast, { Toast } from "react-hot-toast";
import { Link } from "react-router-dom";

import styles from "./CustomSuccessToastMessage.module.scss";

type ToastMessageProps = {
  t: Toast;
  href: string;
  children: React.ReactNode;
};

const CustomSuccessToastMessage = ({
  t,
  href,
  children,
}: ToastMessageProps): JSX.Element => {
  return (
    <div className={styles.container}>
      {children}
      <div className={styles.group}>
        <Link to={href}>Vis</Link>
        <Button
          variant="icon"
          type="button"
          onClick={() => toast.dismiss(t.id)}
        >
          &#x2715;
        </Button>
      </div>
    </div>
  );
};

export default CustomSuccessToastMessage;
