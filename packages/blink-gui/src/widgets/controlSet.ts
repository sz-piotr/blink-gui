import type { BlinkGui } from "../BlinkGui.js";

export function controlSet(this: BlinkGui, object: {}): void {
  for (const key in object) {
    const type = typeof (object as Record<string, unknown>)[key];
    if (type === "boolean" || type === "string" || type === "number") {
      this.control(object, key as string);
    }
  }
}
