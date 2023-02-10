import { ChildNode, Node, Root } from "postcss";
import { resolveFunctions } from "./utils/resolveFunctions";
import { resolvePath } from "./utils/resolvePath";

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
  colour: {
    interactive: {
      default: rawColours.violet[500],
      hover: rawColours.violet[100],
    },
    shadow: {
      default: "black",
    },
  },
  space: {
    16: "1rem",
  },
};

const getValue = (node: Node, path: string, ...args: any): string => {
  let { isValid, value, error } = resolvePath(semanticsConfig, path);

  if (!isValid) throw node.error(error);

  return value;
};

export type SemanticCategories = keyof typeof semanticsConfig;
export type Functions = {
  [index in SemanticCategories]: typeof getValue;
};

const plugin = (opts = {}) => {
  const functions = {
    colour: getValue,
    space: getValue,
  } satisfies Functions;

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
