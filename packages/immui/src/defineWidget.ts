export interface Widget {
  type: string;
  element: HTMLElement;
}

export interface Context {
  getNextWidget: () => Widget | undefined;
  replaceWidget: (node: Widget) => void;
}

export function defineWidget<
  T extends string,
  N extends { type: T; element: HTMLElement },
  // biome-ignore lint/suspicious/noExplicitAny: necessary
  A extends any[],
  R,
>(
  type: T,
  context: Context,
  create: (...args: A) => N,
  diff: (node: N, ...args: A) => R,
): (...args: A) => R {
  return (...args: A) => {
    const node = context.getNextWidget();
    if (node?.type === type) {
      return diff(node as N, ...args);
    }

    const newNode = create(...args);
    context.replaceWidget(newNode);
    return diff(newNode, ...args);
  };
}
