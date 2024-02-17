import { describe, expect } from "vitest";
import { toTitleCase } from "./toTitleCase.js";

describe(toTitleCase, (it) => {
  const cases: [string, string][] = [
    ["", ""],
    ["hello", "Hello"],
    ["hello world", "Hello World"],
    ["hello-world", "Hello World"],
    ["hello_world", "Hello World"],
    ["helloWorld", "Hello World"],
    ["HelloWorld", "Hello World"],
    ["is multi word", "Is Multi Word"],
    ["is-multi-word", "Is Multi Word"],
    ["is_multi_word", "Is Multi Word"],
    ["isMultiWord", "Is Multi Word"],
    ["IsMultiWord", "Is Multi Word"],
    ["supportsHTMLTags", "Supports Html Tags"],
    ["HTML_IS_AMAZING", "Html Is Amazing"],
    ["FOO", "Foo"],
    ["numbers42", "Numbers42"],
    ["foo1Bar2", "Foo1 Bar2"],
    ["very--weird__case", "Very Weird Case"],
  ];

  for (const [input, expected] of cases) {
    it(`converts "${input}" to "${expected}"`, () => {
      expect(toTitleCase(input)).toBe(expected);
    });
  }
});
