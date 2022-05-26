import * as React from "react";
import { FC, MouseEventHandler } from "react";
import { useAppWidth } from "../../hooks/useAppWidth";
import { BreakpointSize } from "../../types/BreakpointSize";
import { TopicViewItemType } from "../../types/TopicViewItemType";
import { GridDimensions } from "../Grid/Grid";

import styles from "./TopicViewItem.module.scss";

export type TopicViewItemProps = {
  item: TopicViewItemType;
  onClick: MouseEventHandler;
  grid?: GridDimensions;
  gridRef?: React.RefObject<HTMLDivElement>;
};

const sizeClassname = {
  [BreakpointSize.Large]: styles.large,
  [BreakpointSize.Medium]: styles.medium,
  [BreakpointSize.Small]: styles.small,
  [BreakpointSize.XSmall]: styles.xSmall,
  [BreakpointSize.XXSmall]: styles.xxSmall,
};

export const TopicViewItem: FC<TopicViewItemProps> = ({
  item,
  onClick,
  grid,
  gridRef,
}) => {
  const appWidth = useAppWidth();
  const buttonElement = React.useRef<HTMLButtonElement>(null);
  const [strokeWidth, setStrokeWidth] = React.useState<number>(4);

  const className = React.useMemo(
    () => [styles.topicViewItem, sizeClassname[appWidth]].join(" "),
    [appWidth],
  );

  React.useEffect(() => {
    if (gridRef) {
      const gridElement = gridRef.current;
      if (grid && gridElement) {
        setStrokeWidth((gridElement.clientWidth / grid.numberOfColumns) * 0.66);
      }
    }
  }, [appWidth, grid, gridRef, buttonElement]);

  return (
    <button
      type="button"
      className={className}
      onClick={onClick}
      ref={buttonElement}
    >
      
      <div
        className={`${styles.inner} `}
      />
    </button>
  );
};
