import words from './data/spellingBee.json';
import { TileState } from './components/Tile';

function dedupeArray(arr: string[]) {
  return Array.from(new Set(arr));
}

export function dedupeString(value: string) {
  return dedupeArray(value.split('')).join('');
}

export function getSortedSpellingBeeResults(letters: string) {
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

export function isPangram(letters: string, result: string) {
  return letters.split('').every((ch) => result.indexOf(ch) > -1);
}

export function sortSpellingBeeResults(letters: string) {
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

export function wordleSolver(guesses: string[], solution: string) {
  const exclude: string[] = [];
  const include: string[] = [];
  const excludeAtIndex: Record<number, string[]> = {};
  const includeAtIndex: Record<number, string> = {};

  guesses.forEach((guess) => {
    guess.split('').forEach((char, idx) => {
      // Correct character in the correct place.
      if (char === solution[idx]) {
        includeAtIndex[idx] = char;
        return;
      }

      // Incorrect character.
      if (!solution.includes(char)) {
        !exclude.includes(char) && exclude.push(char);
        return;
      }

      // Wrong location, possibly
      if (solution.includes(char)) {
        excludeAtIndex[idx] = excludeAtIndex[idx]
          ? [...excludeAtIndex[idx], char]
          : [char];
      }

      // Valid letter, include.
      !include.includes(char) && include.push(char);
    });
  });

  function getState(guess: string, idx: number) {
    const ch = guess[idx];

    if (includeAtIndex[idx] === ch) {
      return 'correct';
    }

    if (exclude.includes(ch)) {
      return 'absent';
    }

    const countInGuess = guess.split(ch).length - 1;
    const countInSolution = solution.split(ch).length - 1;

    // If the character appears the same number of times in the guess as the
    // solution then the character is simply in the wrong place.
    if (countInGuess === countInSolution) {
      return 'present';
    }

    let charFrequencyIndex = 0;
    for (let ii = 0; ii <= idx; ii++) {
      if (guess[ii] === ch) {
        charFrequencyIndex += 1;
      }
    }

    // The character has already appeared enough times.
    if (charFrequencyIndex > countInSolution) {
      return 'absent';
    }

    // Lookahead to see if later instances of the character are correct.
    let state: TileState = 'present';
    guess.split('').forEach((char, index) => {
      if (char === ch && index > idx && includeAtIndex[index] === char) {
        state = 'absent';
      }
    });

    return state;
  }

  function filterResults(word: string) {
    if (
      word.split('').some((ch: string, idx: number) => {
        return (
          exclude.includes(ch) ||
          (includeAtIndex[idx] && includeAtIndex[idx] !== ch) ||
          (excludeAtIndex[idx] && excludeAtIndex[idx].includes(ch))
        );
      })
    ) {
      return false;
    }

    return include.every((ch) => word.includes(ch));
  }

  return {
    filterResults,
    getState,
  };
}
