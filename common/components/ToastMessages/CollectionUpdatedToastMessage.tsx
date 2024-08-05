import { Button } from "common/components/Button";
import toast, { Toast } from "react-hot-toast";
import { Link } from "react-router-dom";

import styles from "./CollectionUpdatedToastMessage.module.scss";

type CollectionUpdatedToastMessageProps = {
  t: Toast;
  wasRemoved: boolean;
  word: string;
  collection: string;
  href: string;
};

const CollectionUpdatedToastMessage = ({
  t,
  wasRemoved,
  word,
  collection,
  href,
}: CollectionUpdatedToastMessageProps): JSX.Element => {
  let message = (
    <p>
      Ordet <b>{word}</b> ble lagret i samlingen <b>{collection}</b>.
    </p>
  );

  if (wasRemoved) {
    message = (
      <p>
        Ordet <b>{word}</b> ble fjernet fra samlingen <b>{collection}</b>.
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
