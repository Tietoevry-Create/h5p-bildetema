import { SnackbarContent, CustomContentProps, useSnackbar } from "notistack";
import React from "react";
import { useL10ns } from "h5p-bildetema/src/hooks/useL10n";
import { Button } from "common/components/Button";
import styles from "./CustomSuccessToastMessage.module.scss";

interface CustomSuccessToastMessageProps extends CustomContentProps {
  href?: string;
}

const CustomSuccessToastMessage = React.forwardRef<
  HTMLDivElement,
  CustomSuccessToastMessageProps
>((props, ref) => {
  const {
    // You have access to notistack props and options 👇🏼
    id,
    message,
    // as well as your own custom props 👇🏼
    href,
  } = props;
  const { show } = useL10ns("show");
  const { closeSnackbar } = useSnackbar();

  return (
    <SnackbarContent ref={ref} className={styles.container}>
      {message}
      <div className={styles.group}>
        {href && <a href={href}>{show}</a>}
        <Button variant="icon" type="button" onClick={() => closeSnackbar(id)}>
          &#x2715;
        </Button>
      </div>
    </SnackbarContent>
  );
});

export default CustomSuccessToastMessage;
