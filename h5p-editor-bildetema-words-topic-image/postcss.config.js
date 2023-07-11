/* eslint-disable @typescript-eslint/no-var-requires */

const commonConfig =
  require("common/utils/postcss-config/postcss-config.utils").commonPostCSSConfig;

module.exports = () => ({
  ...commonConfig,
});
