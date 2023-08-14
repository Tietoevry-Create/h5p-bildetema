import { Meta } from "@storybook/react";
import { Footer } from "./Footer";

export default {
  title: "Components/Footer",
  component: Footer,
} satisfies Meta<typeof Footer>;

export const Default = (): JSX.Element => <Footer />;
