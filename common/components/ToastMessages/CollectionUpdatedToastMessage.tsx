import { Button } from "common/components/Button";
import toast, { Toast } from "react-hot-toast";
import { Link } from "react-router-dom";

import styles from "./CollectionUpdatedToastMessage.module.scss";

type CollectionUpdatedToastMessageProps = {
  t: Toast;
  wasRemoved: boolean;
  collection: string;
  href: string;
};

const CollectionUpdatedToastMessage = ({
  t,
  wasRemoved,
  collection,
  href,
}: CollectionUpdatedToastMessageProps): JSX.Element => {
  let message = (
    <p>
      Ordet ble lagret i <b>{collection}</b>.
    </p>
  );

  if (wasRemoved) {
    message = (
      <p>
        Ordet ble fjernet fra <b>{collection}</b>.
      </p>
    );
  }

  return (
    <div className={styles.container}>
      {message}
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

export default CollectionUpdatedToastMessage;
