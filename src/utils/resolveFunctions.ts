import { Node } from "postcss";
import parseValue, { Node as VNode } from "postcss-value-parser";
import { Functions } from "../evaluateSemanticTokens";
import { resolveVNode } from "./resolveVNode";

export function resolveFunctions(
  node: Node,
  input: string,
  functions: Functions
) {
  const vNode = parseValue(input)
    .walk((vNode: VNode) => {
      resolveVNode(node, vNode, functions);
    })
    .toString();

  return vNode;
}
