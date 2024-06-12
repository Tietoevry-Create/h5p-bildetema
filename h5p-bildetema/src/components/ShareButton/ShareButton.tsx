import { Button } from "common/components/Button";
import { SuccessIcon, LinkIcon } from "common/components/Icons/Icons";
import { useState } from "react";
import { useL10ns } from "../../hooks/useL10n";

const ShareButton = (): JSX.Element => {
  const [isCopied, setIsCopied] = useState(false);
  const { copyLink, linkCopied } = useL10ns("copyLink", "linkCopied");

  const copyMe = async (): Promise<void> => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3000);
    } catch (error) {
      /* TODO: Show error message to user in for example a toast */
    }
  };

  return (
    <Button
      variant="capsule"
      onClick={() => {
        copyMe();
      }}
    >
      {isCopied ? <SuccessIcon /> : <LinkIcon />}
      <span>{isCopied ? linkCopied : copyLink}</span>
    </Button>
  );
};

export default ShareButton;
