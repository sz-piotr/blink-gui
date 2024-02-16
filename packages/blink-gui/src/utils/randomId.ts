export function randomId() {
  return "Blink-" + Math.random().toString(36).slice(2, 8).padEnd(6, "0");
}
