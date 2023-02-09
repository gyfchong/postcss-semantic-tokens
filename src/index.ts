/**
 * @type {import('postcss').PluginCreator}
 */

import { ChildNode, Node, Root } from "postcss";
import { resolveFunctions } from "./resolveFunctions";
import { resolvePath } from "./resolvePath";

export const rawColours = {
  white: "#ffffff",
  violet: {
    50: "#f5f3ff",
    100: "#ede9fe",
    200: "#ddd6fe",
    300: "#c4b5fd",
    400: "#a78bfa",
    500: "#8b5cf6",
    600: "#7c3aed",
    700: "#6d28d9",
    800: "#5b21b6",
    900: "#4c1d95",
  },
  slate: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
  },
};

export const semanticsConfig = {
  interactive: rawColours.violet[500],
  shadow: {
    defaultValue: "black",
  },
};

const getValue = (node: Node, path: string, ...args: any): string => {
  let { isValid, value, error, alpha } = resolvePath(semanticsConfig, path);

  console.info("getValue: value", value);
  return value;
};

export type SemanticCategories = "color" | "colour";
export type Functions = {
  [index in SemanticCategories]: typeof getValue;
};

const plugin = (opts = {}) => {
  let functions = {
    color: getValue,
    colour: getValue,
    shadow: getValue,
  };

  return (root: Root) => {
    root.walk((node: ChildNode) => {
      if (node.type !== "decl") {
        return;
      }

      node.value = resolveFunctions(node, node.value, functions);
    });
  };
};

export default plugin;

// if (!isValid) {
//   let parentNode = node.parent
//   let candidate = parentNode?.raws.tailwind?.candidate

//   if (parentNode && candidate !== undefined) {
//     // Remove this utility from any caches
//     context.markInvalidUtilityNode(parentNode)

//     // Remove the CSS node from the markup
//     parentNode.remove()

//     // Show a warning
//     log.warn('invalid-theme-key-in-class', [
//       `The utility \`${candidate}\` contains an invalid theme value and was not generated.`,
//     ])

//     return
//   }

//   throw node.error(error)
// }

// let maybeColor = parseColorFormat(value)
// let isColorFunction = maybeColor !== undefined && typeof maybeColor === 'function'

// if (alpha !== undefined || isColorFunction) {
//   if (alpha === undefined) {
//     alpha = 1.0
//   }

//   value = withAlphaValue(maybeColor, alpha, maybeColor)
// }
