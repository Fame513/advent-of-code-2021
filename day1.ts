import {getInput, getTestFunction} from './helper';

const DAY = 1;

tests();
run().then(([result1, result2]) => {
  console.log('Part 1:', result1);
  console.log('Part 2:', result2);
});

function calculatePart1(input: number[]) {
  let result = 0
  for(let i = 1; i < input.length; i++) {
    if (input[i] > input[i-1]) {
      result++;
    }
  }
  return result;
}

function calculatePart2(input: number[]) {
  let result = 0
  for(let i = 3; i < input.length; i++) {
    if (input[i] > input[i-3]) {
      result++;
    }
  }
  return result;
}


function parse(input: string): number[] {
  return input.split('\n')
    .map(row => +row)
}

export async function run() {
  const input: string = await getInput(DAY);
  const result1 = calculatePart1(parse(input));
  const result2 = calculatePart2(parse(input));
  return [result1, result2]
}

function tests() {
  const part1Test = getTestFunction((input) => calculatePart1(input));
  const part2Test = getTestFunction((input) => calculatePart2(input));
  part1Test([199, 200, 208, 210, 200, 207, 240, 269, 260, 263], 7);

  console.log('---------------------');

  part2Test([199, 200, 208, 210, 200, 207, 240, 269, 260, 263], 5);

  console.log('---------------------');
}
