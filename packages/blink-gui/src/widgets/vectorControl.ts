import { BlinkGui } from "../BlinkGui.js";
import { createElement } from "../utils/createElement.js";
import { toTitleCase } from "../utils/toTitleCase.js";
import { widget } from "../widget.js";

interface VectorFieldWidget {
  type: "vectorField";
  element: HTMLElement;
  ui: BlinkGui;
}

const vectorField = widget("vectorField", createVectorField, diffVectorField);

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
  return { type: "vectorField", element, ui };
}

function diffVectorField(
  node: VectorFieldWidget,
  contents: (ui: BlinkGui) => void,
): void {
  contents(node.ui);
  node.ui.end();
}

export interface VectorControlOptions {
  label?: string;
}

export function vectorControl<K1 extends string, K2 extends string>(
  this: BlinkGui,
  object: { [_ in K1]: { [_ in K2]: number } },
  key: K1,
  keys: K2[],
  options?: VectorControlOptions,
): void {
  vectorField.call(this, (ui) => {
    let first = true;
    for (const k of keys) {
      const label = first
        ? `${options?.label ?? toTitleCase(key)} ${toTitleCase(k)}`
        : undefined;
      first = false;
      ui.numberControl(object[key], k, { label });
    }
  });
}
