const path = require('path');
const { getWebpackConfig } = require('@dhruv-m-patel/web-app');

const webpackConfig = getWebpackConfig(
  process.env.NODE_ENV,
  path.resolve(__dirname)
);

// Override ts-loader to use tsconfig.webpack.json for Webpack 4 compatibility
// Webpack 4's parser (acorn 6.x) cannot handle ES2020+ syntax like optional chaining.
// The main tsconfig.json targets ES2022 for typechecking, while tsconfig.webpack.json
// targets ES2017 for the bundle output. This will be removed when migrating to Vite (US-006).
const rules = ((webpackConfig.module && webpackConfig.module.rules) || []).map(
  (rule) => {
    if (rule.loader === 'ts-loader') {
      return {
        ...rule,
        options: {
          ...rule.options,
          configFile: path.resolve(__dirname, 'tsconfig.webpack.json'),
        },
      };
    }
    return rule;
  }
);

module.exports = {
  ...webpackConfig,
  module: {
    ...webpackConfig.module,
    rules,
  },
};
