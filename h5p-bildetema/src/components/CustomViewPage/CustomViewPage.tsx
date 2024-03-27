// import { useSelectedWords } from "../../hooks/useSelectedWords";
import { Link, useParams } from "react-router-dom";
import { useMemo } from "react";
import { useCurrentLanguageCode } from "../../hooks/useCurrentLanguage";
import { Breadcrumbs } from "../Breadcrumbs/Breadcrumbs";
import styles from "./CustomViewPage.module.scss";
import MycustomView from "./MyCustomView.tsx/MycustomView";
import MyCustomView from "./MyCustomView.tsx/MycustomView";

const CustomViewPage = (): JSX.Element => {
  // const newWords = useSelectedWords();
  // console.log(newWords)
  const { view } = useParams();
  const langCode = useCurrentLanguageCode();

  const breadCrumbs = useMemo(() => {
    const crumbs = [
      { label: "Home", path: `/${langCode}` },
      { label: "Egne visninger", path: `/customview?lang=${langCode}` },
    ];
    if (!view) return crumbs;
    return [
      ...crumbs,
      { label: view, path: `/customview/${view}?lang=${langCode}` },
    ];
  }, [langCode, view]);

  const myViews = [
    {
      title: "Sofa",
      words: ["T001", "T002", "T003", "V0627", "V0200", "V0201", "V0200"],
    },
  ];

  const currentPage = (): JSX.Element => {
    if (!view) {
      return (
        <>
          {myViews.map(v => (
            <div key={v.title} className={styles.customView}>
              <Link
                to={`/customview/${v.title}?lang=${langCode}&words=${v.words}`}
              >
                {v.title}
              </Link>
            </div>
          ))}
        </>
      );
    }
    return <MyCustomView />;
  };

  return (
    <div className={`${styles.customViewPage} ${styles.mainSize}`}>
      <div className={styles.menuWrapper}>
        <Breadcrumbs
          currentLanguageCode={langCode}
          // TODO: translate search label
          breadCrumbs={breadCrumbs}
        />
      </div>
      <div className={styles.contentWrapper}>{currentPage()}</div>
    </div>
  );
};

export default CustomViewPage;
