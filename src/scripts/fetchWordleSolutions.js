const { addDays, format, parseISO } = require('date-fns');
const fs = require('fs');

const MAX_DATE = format(addDays(new Date(), -1), 'yyyy-MM-dd');
const MIN_DATE = '2021-06-19';

const API_URL = 'https://www.nytimes.com/svc/wordle/v2';

async function fetchSolution(date) {
  const result = await fetch(`${API_URL}/${date}.json`);
  return result.json();
}

async function fetchAllSolutions() {
  const solutions = [];

  let date = MIN_DATE;
  while (date <= MAX_DATE) {
    const data = await fetchSolution(date);
    console.log(`Fetched solution for ${date}`);
    solutions.push(data);

    // Increment the date.
    date = format(addDays(parseISO(date), 1), 'yyyy-MM-dd');
  }

  return solutions;
}

const solutions = fetchAllSolutions().then((solutions) => {
  fs.writeFileSync(
    './src/data/wordle-solutions.json',
    JSON.stringify(solutions)
  );
});
