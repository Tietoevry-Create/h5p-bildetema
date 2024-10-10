// @ts-check

export const commonPostCSSConfig = {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: ["last 3 versions", "since 2014"],
    },
  },
};
