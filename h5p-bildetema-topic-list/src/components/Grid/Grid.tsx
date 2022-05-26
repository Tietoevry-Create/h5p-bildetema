import * as React from "react";
import { useState } from "react";
import { CommonItemType } from "../../types/CommonItemType";
import { GridWordItemType } from "../../types/GridWordItemType";
import {
  gridToPercentage,
  gridToPercentageScalar,
} from "../../utils/grid.utils";
import { TopicViewItem } from "../TopicViewItem/TopicViewItem";
import styles from "./Grid.module.scss";

export type GridProps = {
  items: Array<GridWordItemType>;
  gridDimensions: GridDimensions;
};

export type GridDimensions = {
  numberOfColumns: number;
  numberOfRows: number;
};

export const Grid: React.FC<GridProps> = ({ items, gridDimensions }) => {
  const gridContainerRef = React.createRef<HTMLDivElement>();
  const [itemShowingDialog, setItemShowingDialog] =
    useState<CommonItemType | null>(null);

  const sortItems = (a: GridWordItemType, b: GridWordItemType): number => {
    // Sort after index first
    if (a.index != null && b.index != null) {
      return a.index < b.index ? -1 : 1;
    }
    if (a.index != null && b.index == null) {
      return -1;
    }
    if (a.index == null && b.index != null) {
      return 1;
    }
    // Then sort after position
    if (a.xPosition === b.xPosition) {
      return a.yPosition < b.yPosition ? -1 : 1;
    }

    return a.xPosition < b.xPosition ? -1 : 1;
  };

  const allMapItems = React.useMemo(() => {
    const sortedItems = items.concat().sort((a, b) => sortItems(a, b));
    const allItems: Array<GridWordItemType> = sortedItems;

    return allItems.map(item => {
      const position = gridToPercentage(
        { x: item.xPosition, y: item.yPosition },
        gridDimensions.numberOfColumns,
        gridDimensions.numberOfRows,
      );
      return (
        <div
          key={item.id}
          id={item.id}
          className={styles.itemWrapper}
          style={{
            left: `${position.x}%`,
            top: `${position.y}%`,
            height: `${gridToPercentageScalar(
              item.height,
              gridDimensions.numberOfRows,
            )}%`,
            width: `${gridToPercentageScalar(
              item.width,
              gridDimensions.numberOfRows,
            )}%`,
          }}
        >
          <TopicViewItem
            item={item}
            onClick={e => {
              console.info(e);
            }}
          />
        </div>
      );
    });

    // We want to update re-render the elements whenever `itemShowingDialog` changes (i.e. the dialog window is closed).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gridDimensions, items, gridContainerRef]);

  return (
    <div
      className={styles.gridWrapper}
      style={{
        border: "1px solid black",
      }}
    >
      <div
        style={{
          border: "1px solid red",
        }}
        className={styles.grid}
        ref={gridContainerRef}
      >
        {allMapItems}
      </div>
    </div>
  );
};
