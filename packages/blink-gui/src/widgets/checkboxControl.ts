import type { BlinkGui } from "../BlinkGui.js";
import { toTitleCase } from "../utils/toTitleCase.js";

export function checkboxControl<K extends string>(
  this: BlinkGui,
  object: { [_ in K]: boolean },
  key: K,
): void {
  const value = object[key];
  const newValue = this.checkboxField(toTitleCase(key), { value });
  if (newValue !== value) {
    object[key] = newValue;
  }
}
