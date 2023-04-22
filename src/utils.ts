import words from './data/spellingBee.json';

/**
 * De-dupes the string entries in a flat array.
 */
export function dedupeArray(arr: string[]) {
  return Array.from(new Set(arr));
}

export function getSortedSpellingBeeResults(letters: string[]) {
  const results = words.filter((word) => {
    // Filter out words that don't inckude the required letter.
    if (!word.includes(letters[0])) {
      return false;
    }

    // Filter out words that contain invalid letters.
    return word.split('').every((letter) => letters.includes(letter));
  });

  return [...results].sort(sortSpellingBeeResults(letters));
}

/**
 * Checks whether a string contains only letters.
 */
export function isAlpha(str: string) {
  return /^[a-z]+$/i.test(str);
}

/**
 * Checks whether a string consists of a single character and is a letter.
 */
export function isLetter(char: string) {
  return /^[a-z]$/i.test(char);
}

export function isPangram(letters: string[], result: string) {
  return letters.every((ch) => result.indexOf(ch) > -1);
}

export function sortSpellingBeeResults(letters: string[]) {
  return (r1: string, r2: string) => {
    if (r1 < r2 || (isPangram(letters, r1) && !isPangram(letters, r2))) {
      return -1;
    }

    if (r1 > r2 || (isPangram(letters, r1) && isPangram(letters, r2))) {
      return 1;
    }

    return 0;
  };
}
