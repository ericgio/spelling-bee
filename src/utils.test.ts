import { isAlpha, wordleSolver } from './utils';

it('checks whether a string contains only alphabetical characters', () => {
  expect(isAlpha('zsdfasdfzsdvzsdv')).toBe(true);
  expect(isAlpha('asdfase6734rkh')).toBe(false);
});

it('determines the state for each letter in a guess', () => {
  const guesses = ['rural', 'error', 'hurry'];
  const { getState } = wordleSolver(guesses, 'horde');

  const expectedState = [
    ['absent', 'absent', 'correct', 'absent', 'absent'],
    ['present', 'absent', 'correct', 'present', 'absent'],
    ['correct', 'absent', 'correct', 'absent', 'absent'],
  ];

  guesses.forEach((guess, guessIdx) => {
    guess.split('').forEach((char, idx) => {
      expect(getState(guess, idx)).toBe(expectedState[guessIdx][idx]);
    });
  });
});
