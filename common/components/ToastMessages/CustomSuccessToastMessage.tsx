import { Button } from "common/components/Button";
import { toast, ToastContentProps } from "react-toastify";
import { useL10ns } from "h5p-bildetema/src/hooks/useL10n";

import styles from "./CustomSuccessToastMessage.module.scss";

type ToastMessageProps = {
  t: ToastContentProps<unknown>;
  href: string;
  children: React.ReactNode;
};

const CustomSuccessToastMessage = ({
  t,
  href,
  children,
}: ToastMessageProps): JSX.Element => {
  const { show } = useL10ns("show");

  return (
    <div className={styles.container}>
      {children}
      <div className={styles.group}>
        <a href={`/#${href}`}>{show}</a>
        <Button
          variant="icon"
          type="button"
          onClick={() => toast.dismiss(t.toastProps.toastId)}
        >
          &#x2715;
        </Button>
      </div>
    </div>
  );
};

export default CustomSuccessToastMessage;
