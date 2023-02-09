// @ts-nocheck
// Modifying AST nodes is acceptable

import { Node } from "postcss";
import { Node as VNode } from "postcss-value-parser";
import { Functions, SemanticCategories } from ".";
import { extractArgs } from "./extractArgs";

export function resolveVNode(node: Node, vNode: VNode, functions: Functions) {
  const value = vNode.value as SemanticCategories;

  console.info("resolveVNode: vNode", vNode);

  if (vNode.type === "function" && functions[value] !== undefined) {
    let args = extractArgs(node, vNode.nodes, functions);
    console.info("resolveVNode: args", args);
    console.info("resolveVNode: vNode.value", vNode.value);

    vNode.type = "word";

    console.info("resolveVNode: value", functions[vNode.value](node, ...args));
    console.info("resolveVNode: function", functions[vNode.value]);

    vNode.value = functions[vNode.value](node, ...args);
  }

  console.info("resolveVNode: vNode", vNode);

  return vNode;
}
