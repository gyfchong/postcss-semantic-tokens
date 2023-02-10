import { Node } from "postcss";
import parseValue, { Node as VNode } from "postcss-value-parser";
import { Functions } from "../evaluateSemanticTokens";
import { resolveVNode } from "./resolveVNode";

export function extractArgs(node: Node, vNodes: VNode[], functions: Functions) {
  vNodes = vNodes.map((vNode: VNode) => resolveVNode(node, vNode, functions));

  let args = [""];

  for (let vNode of vNodes) {
    if (vNode.type === "div" && vNode.value === ",") {
      args.push("");
    } else {
      args[args.length - 1] += parseValue.stringify(vNode);
    }
  }

  return args;
}
