import type { BlinkGui } from "./BlinkGui.js";

export interface Widget {
  type: string;
  element: HTMLElement;
}

export function widget<
  T extends string,
  N extends { type: T; element: HTMLElement },
  A extends any[],
  R,
>(
  type: T,
  create: (...args: A) => N,
  diff: (node: N, ...args: A) => R,
): (this: BlinkGui, ...args: A) => R {
  return function (this: BlinkGui, ...args: A): R {
    const node = this.getNextWidget();
    if (node?.type === type) {
      return diff(node as N, ...args);
    }

    const newNode = create(...args);
    this.replaceWidget(newNode);
    return diff(newNode, ...args);
  };
}
