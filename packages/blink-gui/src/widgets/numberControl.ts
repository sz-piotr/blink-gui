import type { BlinkGui } from "../BlinkGui.js";
import { toTitleCase } from "../utils/toTitleCase.js";

export function numberControl<K extends string>(
  this: BlinkGui,
  object: { [_ in K]: number },
  key: K,
): void {
  const value = object[key];
  const newValue = this.numberField(toTitleCase(key), { value });
  if (newValue !== value) {
    object[key] = newValue;
  }
}
