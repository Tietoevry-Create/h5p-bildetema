import { JSX } from "react";
import styles from "./PageNotFound.module.scss";
import { useL10ns } from "../../hooks/useL10n";

const PageNotFound = (): JSX.Element => {
  const { pageNotFoundTitle, pageNotFoundDescription } = useL10ns(
    "pageNotFoundTitle",
    "pageNotFoundDescription",
  );

  const pageNotFoundDescriptionParts =
    pageNotFoundDescription.split("{{newLine}}");

  return (
    <div className={styles.pageNotFound}>
      <h1 className={styles.pageNotFoundH1}>{pageNotFoundTitle}</h1>
      <p className={styles.pageNotFoundP}>{pageNotFoundDescriptionParts[0]}</p>
      <p className={styles.pageNotFoundP}>{pageNotFoundDescriptionParts[1]}</p>
      <ul className={styles.pageNotFoundUl}>
        <li>{pageNotFoundDescriptionParts[2]}</li>
        <li>{pageNotFoundDescriptionParts[3]}</li>
        <li>{pageNotFoundDescriptionParts[4]}</li>
      </ul>
    </div>
  );
};

export default PageNotFound;
