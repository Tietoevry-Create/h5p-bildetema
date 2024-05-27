/* eslint-disable react/jsx-props-no-spreading */
import { forwardRef, Fragment } from "react";
import {
  type MenuProps as OriginalMenuProps,
  type MenuButtonProps as OriginalMenuButtonProps,
  type MenuItemsProps as OriginalMenuItemsProps,
  type MenuItemProps as OriginalMenuItemProps,
  type MenuSectionProps as OriginalMenuSectionProps,
  type MenuHeadingProps as OriginalMenuHeadingProps,
  type MenuSeparatorProps as OriginalMenuSeparatorProps,
  Menu as OriginalMenu,
  MenuButton as OriginalMenuButton,
  MenuItems as OriginalMenuItems,
  MenuItem as OriginalMenuItem,
  MenuSection as OriginalMenuSection,
  MenuHeading as OriginalMenuHeading,
  MenuSeparator as OriginalMenuSeparator,
} from "@headlessui/react";

import styles from "./Menu.module.scss";
import Button from "../Button/Button";

export type MenuProps = OriginalMenuProps;
export type MenuButtonProps = OriginalMenuButtonProps;
export type MenuItemsProps = OriginalMenuItemsProps;
export type MenuItemProps = OriginalMenuItemProps & {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
};
export type MenuSectionProps = OriginalMenuSectionProps;
export type MenuHeadingProps = OriginalMenuHeadingProps;
export type MenuSeparatorProps = OriginalMenuSeparatorProps;

export const Menu = forwardRef<HTMLElement, MenuProps>((props, ref) => (
  <OriginalMenu {...props} ref={ref} />
));

export const MenuButton = forwardRef<HTMLButtonElement, MenuButtonProps>(
  (props, ref) => <OriginalMenuButton as={Fragment} {...props} ref={ref} />,
);

export const MenuItems = forwardRef<HTMLElement, MenuItemsProps>(
  (props, ref) => (
    <OriginalMenuItems className={styles.menuItems} {...props} ref={ref} />
  ),
);

export const MenuItem = forwardRef<HTMLElement, MenuItemProps>(
  ({ label, icon, onClick, ...props }, ref) => (
    <OriginalMenuItem {...props} ref={ref}>
      <Button onClick={onClick} className={styles.menuItemButton}>
        {icon}
        {label}
      </Button>
    </OriginalMenuItem>
  ),
);

export const MenuSection = forwardRef<HTMLElement, MenuSectionProps>(
  (props, ref) => <OriginalMenuSection {...props} ref={ref} />,
);

export const MenuHeading = forwardRef<HTMLElement, MenuHeadingProps>(
  (props, ref) => <OriginalMenuHeading {...props} ref={ref} />,
);

export const MenuSeparator = forwardRef<
  HTMLElement,
  OriginalMenuSeparatorProps
>((props, ref) => <OriginalMenuSeparator {...props} ref={ref} />);
