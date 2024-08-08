import { Button } from "common/components/Button";
import toast, { Toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useL10ns } from "h5p-bildetema/src/hooks/useL10n";
import { replacePlaceholders } from "common/utils/replacePlaceholders";

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
  const { wordSavedInCollection, wordRemovedFromCollection, show } = useL10ns(
    "wordSavedInCollection",
    "wordRemovedFromCollection",
    "show",
  );

  const replacements = {
    collection: <b>{collection}</b>,
  };

  const description = wasRemoved
    ? wordRemovedFromCollection
    : wordSavedInCollection;

  const message = replacePlaceholders(description, replacements);

  return (
    <div className={styles.container}>
      <p>{message}</p>
      <div className={styles.group}>
        <Link to={href}>{show}</Link>
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
