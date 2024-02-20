import type { BlinkGui } from "../BlinkGui.js";

export function control<K extends string>(
  this: BlinkGui,
  object: { [_ in K]: boolean | string | number },
  key: K,
): void {
  const value = object[key];
  if (typeof value === "boolean") {
    return this.checkboxControl(object as { [_ in K]: boolean }, key);
  } else if (typeof value === "string") {
    return this.textControl(object as { [_ in K]: string }, key);
  } else if (typeof value === "number") {
    return this.numberControl(object as { [_ in K]: number }, key);
  } else {
    throw new Error("Invalid value type");
  }
}
