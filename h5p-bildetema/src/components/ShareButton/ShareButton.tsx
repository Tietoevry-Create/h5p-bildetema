import { Button } from "common/components/Button";
import { ShareIcon } from "common/components/Icons/Icons";
import { useState } from "react";

const ShareButton = (): JSX.Element => {
  const [isCopied, setIsCopied] = useState(false);

  const copyMe = async (): Promise<void> => {
    const url = window.location.href;
    await navigator.clipboard.writeText(url);
    setIsCopied(true);
  };

  return (
    <Button
      variant="capsule"
      onClick={() => {
        copyMe();
      }}
    >
      <ShareIcon />
      <span>Del</span>
    </Button>
  );
};

export default ShareButton;
