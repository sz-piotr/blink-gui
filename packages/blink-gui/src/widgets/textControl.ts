import type { BlinkGui } from "../BlinkGui.js";
import { toTitleCase } from "../utils/toTitleCase.js";

export interface TextControlOptions {
  label?: string;
}

export function textControl<K extends string>(
  this: BlinkGui,
  object: { [_ in K]: string },
  key: K,
  options?: TextControlOptions,
): void {
  const value = object[key];
  const newValue = this.textField(options?.label ?? toTitleCase(key), {
    value,
  });
  if (newValue !== value) {
    object[key] = newValue;
  }
}
