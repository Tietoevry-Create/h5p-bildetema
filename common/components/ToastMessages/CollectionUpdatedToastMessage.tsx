import { Button } from "common/components/Button";
import { toast, ToastContentProps } from "react-toastify";
import { useL10ns } from "h5p-bildetema/src/hooks/useL10n";
import { replacePlaceholders } from "common/utils/replacePlaceholders";

import styles from "./CollectionUpdatedToastMessage.module.scss";

type CollectionUpdatedToastMessageProps = {
  t: ToastContentProps<unknown>;
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
    collection: <b key={1}>{collection}</b>,
  };

  const description = wasRemoved
    ? wordRemovedFromCollection
    : wordSavedInCollection;

  const message = replacePlaceholders(description, replacements);

  return (
    <div className={styles.container}>
      <span>{message}</span>
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

export default CollectionUpdatedToastMessage;
