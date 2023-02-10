// @ts-nocheck
// Modifying AST nodes is acceptable

import { Node } from "postcss";
import { Node as VNode } from "postcss-value-parser";
import { Functions, SemanticCategories } from "./evaluateSemanticTokens";
import { extractArgs } from "./extractArgs";

export function resolveVNode(node: Node, vNode: VNode, functions: Functions) {
  const value = vNode.value as SemanticCategories;
  // TODO: Figure out how to map the value to the proper path.
  console.info("resolveVNode:", value);
  if (vNode.type === "function" && functions[value] !== undefined) {
    let args = extractArgs(node, vNode.nodes, functions);
    vNode.type = "word";
    vNode.value = functions[vNode.value](node, ...args);
  }

  return vNode;
}
