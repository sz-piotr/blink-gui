import type { ContainerNode } from "../Widget.js";
import type { Context } from "../defineWidget.js";
import { defineWidget } from "../defineWidget.js";
import { Immui } from "../index.js";

export function defineContainer(context: Context) {
  return defineWidget("container", context, createContainer, diffContainer);
}

function createContainer(contents: (ui: Immui) => void): ContainerNode {
  const element = document.createElement("div");
  const ui = new Immui({ container: element, autoEnd: false });
  contents(ui);
  ui.end();
  return { type: "container", element, ui };
}

function diffContainer(
  node: ContainerNode,
  contents: (ui: Immui) => void,
): void {
  contents(node.ui);
  node.ui.end();
}
