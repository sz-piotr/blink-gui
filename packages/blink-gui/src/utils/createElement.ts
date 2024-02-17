export function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  options?: Partial<HTMLElementTagNameMap[K]>,
) {
  const element = document.createElement(tag);
  for (const [key, value] of Object.entries(options ?? {})) {
    if (value !== undefined) {
      (element as any)[key] = value;
    }
  }
  return element;
}
