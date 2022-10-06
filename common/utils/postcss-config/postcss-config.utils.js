// @ts-check

const commonPostCSSConfig = {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: ["last 3 versions", "since 2014"],
    },
  },
};

module.exports = {
  commonPostCSSConfig,
};
