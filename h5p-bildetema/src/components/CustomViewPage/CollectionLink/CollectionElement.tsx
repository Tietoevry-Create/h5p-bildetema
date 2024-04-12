import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "@headlessui/react";
import styles from "./CollectionElement.module.scss";
import { DeleteIcon, EditIcon, MoreVertIcon } from "../../Icons/Icons";
import { useMyCollections } from "common/hooks/useMyCollections";
import { Dialog as HeadlessDialog } from "@headlessui/react";
import Dialog from "../../Dialog/Dialog";

type CollectionElementProps = {
  href: string;
  label: string;
  amountOfCollectionItems: number;
};
const CollectionElement = ({
  href,
  label,
  amountOfCollectionItems,
}: CollectionElementProps): React.JSX.Element => {
  const { deleteCollection } = useMyCollections();
  const [open, setIsOpen] = React.useState(false);
  return (
    <div className={styles.collectionElementWrapper}>
      <span className={styles.label}>
        <b>{label}</b>({amountOfCollectionItems})
      </span>
      <Link to={href} className={styles.link}>
        <span className={styles.linkLabel}>{label}</span>
      </Link>
      <Dialog open={open} onClose={() => setIsOpen(false)}>
        <div className={styles.test}>
          <button>hei</button>
          <button>hei</button>
        </div>
      </Dialog>
      <Menu>
        <Menu.Button className={styles.button}>
          {" "}
          <MoreVertIcon />
        </Menu.Button>
        <Menu.Items className={styles.menu}>
          <Menu.Item>
            {({ active }) => (
              <button
                type="button"
                className={`${styles.menuItemButton} ${
                  active && styles.active
                }`}
              >
                <EditIcon />
                <span>
                  {/* TODO: Translate */}
                  Endre navn på samlingen
                </span>
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                type="button"
                className={`${styles.menuItemButton} ${
                  active && styles.active
                }`}
                // onClick={() => deleteCollection(label)}
                onClick={() => setIsOpen(true)}
              >
                <DeleteIcon />
                <span>
                  {/* TODO: Translate */}
                  Slett samling
                </span>
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Menu>
    </div>
  );
};

export default CollectionElement;
