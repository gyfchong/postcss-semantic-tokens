import { Root } from "postcss";
import evaluateSemanticTokens from "./evaluateSemanticTokens";

/**
 * @type {import('postcss').PluginCreator}
 */
module.exports = (opts = {}) => {
  return {
    postcssPlugin: "postcss-semantic-tokens",
    plugins: [
      function (root: Root) {
        const context = {};
        evaluateSemanticTokens(context)(root);
      },
    ],
  };
};

module.exports.postcss = true;
