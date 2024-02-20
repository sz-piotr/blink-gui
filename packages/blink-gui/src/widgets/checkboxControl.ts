import type { BlinkGui } from "../BlinkGui.js";
import { toTitleCase } from "../utils/toTitleCase.js";

export interface CheckboxControlOptions {
  label?: string;
}

export function checkboxControl<K extends string>(
  this: BlinkGui,
  object: { [_ in K]: boolean },
  key: K,
  options?: CheckboxControlOptions,
): void {
  const value = object[key];
  const newValue = this.checkboxField(options?.label ?? toTitleCase(key), {
    value,
  });
  if (newValue !== value) {
    object[key] = newValue;
  }
}
