import { BlinkGui } from "../BlinkGui.js";
import { createElement } from "../utils/createElement.js";
import { defineWidget, type Context } from "../utils/defineWidget.js";

interface VectorFieldWidget {
  type: "VectorField";
  element: HTMLElement;
  ui: BlinkGui;
}

export function defineVectorField(context: Context) {
  return defineWidget(
    "VectorField",
    context,
    createVectorField,
    diffVectorField,
  );
}

function createVectorField(
  contents: (ui: BlinkGui) => void,
): VectorFieldWidget {
  const element = createElement("div", { className: "BlinkVectorField" });
  const ui = new BlinkGui({
    container: element,
    autoEnd: false,
    skipInjectingStyles: true,
  });
  contents(ui);
  ui.end();
  return { type: "VectorField", element, ui };
}

function diffVectorField(
  node: VectorFieldWidget,
  contents: (ui: BlinkGui) => void,
): void {
  contents(node.ui);
  node.ui.end();
}
