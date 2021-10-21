const { merge } = require("webpack-merge");

var config = require("./config/webpack.defaults.js");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
// Add any overrides to the default webpack config here:
//
// Eg:
//
//  ```
//    const path = require("path")
//    config.resolve.modules.push(path.resolve(__dirname, 'frontend', 'components'))
//    config.resolve.alias.frontendComponents = path.resolve(__dirname, 'frontend', 'components')
//  ```
//
// You can also merge in a custom config using the included `webpack-merge` package.
// Complete docs available at: https://github.com/survivejs/webpack-merge
//
// Eg:
//
//  ```
//    const customConfig = { ..... }
//    config = merge(config, customConfig)
//  ```

////////////////////////////////////////////////////////

module.exports = merge(config, {
  plugins: [
    new CopyPlugin({
      patterns: [
        // Copy Shoelace assets to dist/shoelace
        {
          from: path.resolve(
            __dirname,
            "./node_modules/@shoelace-style/shoelace/dist/assets"
          ),
          to: path.resolve(__dirname, "./src/shoelace/assets"),
        },
      ],
    }),
  ],
});
