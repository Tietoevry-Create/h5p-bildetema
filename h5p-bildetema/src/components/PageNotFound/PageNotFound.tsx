import { FC } from "react";
import { useL10n } from "../../hooks/useL10n";
import styles from "./PageNotFound.module.scss";

export const PageNotFound: FC = () => {
  const pageNotFoundTitle = useL10n("pageNotFoundTitle");
  const pageNotFoundDescription = useL10n("pageNotFoundDescription");

  const pageNotFoundDescriptionParts: string[] =
    pageNotFoundDescription.split("{{newLine}}");

  return (
    <div className={styles.pageNotFound}>
      <h1 className={styles.pageNotFoundH1}>{pageNotFoundTitle}</h1>
      {pageNotFoundDescriptionParts[0] && (
        <p className={styles.pageNotFoundP}>
          {pageNotFoundDescriptionParts[0]}
        </p>
      )}
      {pageNotFoundDescriptionParts[1] && (
        <p className={styles.pageNotFoundP}>
          {pageNotFoundDescriptionParts[1]}
        </p>
      )}
      {pageNotFoundDescriptionParts[2] && (
        <ul className={styles.pageNotFoundUl}>
          <li>{pageNotFoundDescriptionParts[2]}</li>
          {pageNotFoundDescriptionParts[3] && (
            <li>{pageNotFoundDescriptionParts[3]}</li>
          )}
          {pageNotFoundDescriptionParts[4] && (
            <li>{pageNotFoundDescriptionParts[4]}</li>
          )}
        </ul>
      )}
    </div>
  );
};
