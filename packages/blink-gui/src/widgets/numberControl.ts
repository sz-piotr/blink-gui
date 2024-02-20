import type { BlinkGui } from "../BlinkGui.js";
import { toTitleCase } from "../utils/toTitleCase.js";

export interface NumberControlOptions {
  label?: string;
}

export function numberControl<K extends string>(
  this: BlinkGui,
  object: { [_ in K]: number },
  key: K,
  options?: NumberControlOptions,
): void {
  const value = object[key];
  const newValue = this.numberField(options?.label ?? toTitleCase(key), {
    value,
  });
  if (newValue !== value) {
    object[key] = newValue;
  }
}
