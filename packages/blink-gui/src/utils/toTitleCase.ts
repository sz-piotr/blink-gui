export function toTitleCase(input: string): string {
  let result = "";
  let startOfSentence = true;
  let startOfWord = true;
  let upperCaseCount = 0;

  for (const char of input) {
    if (char === "-" || char === "_" || char === " ") {
      startOfWord = true;
      continue;
    }

    if (isUpperCase(char)) {
      if (upperCaseCount === 0) {
        startOfWord = true;
      }
      upperCaseCount++;
    } else {
      if (upperCaseCount > 1) {
        const last = result.slice(-1);
        result = result.slice(0, -1) + " " + last.toUpperCase();
      }
      upperCaseCount = 0;
    }

    if (startOfWord) {
      if (!startOfSentence) {
        result += " ";
      }
      result += char.toUpperCase();
    } else {
      result += char.toLowerCase();
    }

    startOfWord = false;
    startOfSentence = false;
  }
  return result;
}

function isUpperCase(char: string): boolean {
  return char !== char.toLowerCase();
}
