import { forwardRef, Fragment } from "react";
import { Button } from "common/components/Button";
import {
  type MenuProps as HMenuProps,
  type MenuButtonProps as HMenuButtonProps,
  type MenuItemsProps as HMenuItemsProps,
  type MenuItemProps as HMenuItemProps,
  type MenuSectionProps as HMenuSectionProps,
  type MenuHeadingProps as HMenuHeadingProps,
  type MenuSeparatorProps as HMenuSeparatorProps,
  Menu as HMenu,
  MenuButton as HMenuButton,
  MenuItems as HMenuItems,
  MenuItem as HMenuItem,
  MenuSection as HMenuSection,
  MenuHeading as HMenuHeading,
  MenuSeparator as HMenuSeparator,
} from "@headlessui/react";

import styles from "./Menu.module.scss";

export type MenuProps = HMenuProps;
export type MenuButtonProps = HMenuButtonProps;
export type MenuItemsProps = HMenuItemsProps;
export type MenuItemProps = HMenuItemProps & {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
};
export type MenuSectionProps = HMenuSectionProps;
export type MenuHeadingProps = HMenuHeadingProps;
export type MenuSeparatorProps = HMenuSeparatorProps;

export const Menu = forwardRef<HTMLElement, MenuProps>((props, ref) => (
  <HMenu {...props} ref={ref} />
));

export const MenuButton = forwardRef<HTMLButtonElement, MenuButtonProps>(
  (props, ref) => <HMenuButton as={Fragment} {...props} ref={ref} />,
);

export const MenuItems = forwardRef<HTMLElement, MenuItemsProps>(
  (props, ref) => (
    <HMenuItems className={styles.menuItems} {...props} ref={ref} />
  ),
);

export const MenuItem = forwardRef<HTMLElement, MenuItemProps>(
  ({ label, icon, onClick, ...props }, ref) => (
    <HMenuItem {...props} ref={ref}>
      <Button onClick={onClick} className={styles.menuItemButton}>
        {icon}
        {label}
      </Button>
    </HMenuItem>
  ),
);

export const MenuSection = forwardRef<HTMLElement, MenuSectionProps>(
  (props, ref) => <HMenuSection {...props} ref={ref} />,
);

export const MenuHeading = forwardRef<HTMLElement, MenuHeadingProps>(
  (props, ref) => <HMenuHeading {...props} ref={ref} />,
);

export const MenuSeparator = forwardRef<HTMLElement, HMenuSeparatorProps>(
  (props, ref) => <HMenuSeparator {...props} ref={ref} />,
);
