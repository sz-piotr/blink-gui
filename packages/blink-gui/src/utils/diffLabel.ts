export function diffLabel(
  node: { label: HTMLSpanElement; labelText: string },
  labelText: string | undefined,
) {
  labelText = labelText ?? "";
  if (node.labelText !== labelText) {
    if (!node.labelText) {
      node.label.style.removeProperty("display");
    }
    if (!labelText) {
      node.label.style.display = "none";
    }
    node.labelText = labelText;
    node.label.textContent = labelText;
    node.label.title = labelText;
  }
}
