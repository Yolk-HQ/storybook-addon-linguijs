const path = require("path");

const DIST_PATH = path.resolve(__dirname, path.join("..", "dist"));

module.exports = {
  stories: ["./stories/*.tsx"],
  addons: [
    require.resolve("../register"),
    require.resolve("@storybook/addon-knobs/register")
  ],
  managerWebpack: async config => {
    // Exclude ../dist from Storybook's Babel rule so that compiled TypeScript output is correctly
    // parsed by webpack.
    const babelRule = config.module.rules.find(rule =>
      Boolean(rule.use.find(rule => rule.loader === "babel-loader"))
    );
    const distPath = path.resolve(__dirname, path.join("..", "dist"));
    babelRule.exclude.push(DIST_PATH);
    return config;
  },
  webpackFinal: async config => {
    // Exclude ../dist from Storybook's Babel rule so that compiled TypeScript output is correctly
    // parsed by webpack.
    const babelRule = config.module.rules.find(rule =>
      Boolean(rule.use.find(rule => rule.loader === "babel-loader"))
    );
    const distPath = path.resolve(__dirname, path.join("..", "dist"));
    babelRule.exclude.push(DIST_PATH);

    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      exclude: /node_modules/,
      use: {
        loader: require.resolve("babel-loader"),
        options: {
          plugins: [
            // Enable babel macros for LinguiJS: https://lingui.js.org/tutorials/setup-react.html
            require.resolve("babel-plugin-macros"),
            require.resolve("@babel/plugin-transform-modules-commonjs")
          ],
          presets: [
            require.resolve("@babel/preset-env"),
            require.resolve("@babel/preset-typescript"),
            require.resolve("@babel/preset-react")
          ]
        }
      }
    });
    config.resolve.extensions.push(".ts", ".tsx");
    return config;
  }
};
