import type { BlinkGui } from "../BlinkGui.js";
import { toTitleCase } from "../utils/toTitleCase.js";

export function textControl<K extends string>(
  this: BlinkGui,
  object: { [_ in K]: string },
  key: K,
): void {
  const value = object[key];
  const newValue = this.textField(toTitleCase(key), { value });
  if (newValue !== value) {
    object[key] = newValue;
  }
}
