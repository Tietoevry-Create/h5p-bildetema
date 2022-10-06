const commonConfig =
  // eslint-disable-next-line @typescript-eslint/no-var-requires, import/extensions
  require("../common/utils/postcss-config/postcss-config.utils").commonPostCSSConfig;

module.exports = () => ({
  ...commonConfig,
});
