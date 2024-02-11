import type { Widget } from "./Widget.js";

export interface Context {
  getNode: () => Widget | undefined;
  replaceNode: (node: Widget) => void;
}

// biome-ignore lint/suspicious/noExplicitAny: necessary
export function defineWidget<N extends Widget, A extends any[], R>(
  type: N["type"],
  context: Context,
  create: (...args: A) => N,
  diff: (node: N, ...args: A) => R,
): (...args: A) => R {
  return (...args: A) => {
    const node = context.getNode();
    if (node?.type === type) {
      return diff(node as N, ...args);
    }

    const newNode = create(...args);
    context.replaceNode(newNode);
    return diff(newNode, ...args);
  };
}
