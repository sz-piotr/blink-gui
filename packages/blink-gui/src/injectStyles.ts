import { styles } from "./styles.js";

let once = false;

export function injectStyles() {
  if (once) {
    return;
  }
  once = true;

  const style = document.createElement("style");
  style.textContent = styles;
  document.head.appendChild(style);
}
