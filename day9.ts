import {getInput, getTestFunction, sendAnswer} from './helper';

const DAY = 9;

tests();
run().then(async ([result1, result2]) => {
  console.log('Part 1:', result1);
  // console.log(await sendAnswer(DAY, 1, result1.toString()));
  console.log('Part 2:', result2);
  // console.log(await sendAnswer(DAY, 2, result2.toString()));
});

function getNearest(input: number[][], x: number, y: number): number[] {
  const result: number[] = []
  for (let dy = y - 1; dy <= y + 1; dy++) {
    if (dy < 0 || dy >= input.length) {
      continue;
    }
    for (let dx = x - 1; dx <= x + 1; dx++) {
      if (dx < 0 || dx >= input[y].length || (dx === x && dy === y)) {
        continue;
      }
      if (dx === x || dy === y) {
        result.push(input[dy][dx]);
      }
    }
  }
  return result;
}

function fillBasins(input: number[][], x: number, y: number) {
  let result = 0;
  if (x < 0 || y < 0 || y >= input.length || x >= input[y].length || input[y][x] >= 9) {
    return result;
  }
  input[y][x] = 10;
  result += 1;
  result += fillBasins(input, x + 1, y);
  result += fillBasins(input, x - 1, y);
  result += fillBasins(input, x, y + 1);
  result += fillBasins(input, x, y - 1);
  return result;
}

function calculatePart1(input: number[][]): number {
  let result = 0;
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      const nearest = getNearest(input, x, y);
      if (nearest.filter(v => v <= input[y][x]).length === 0) {
        result += input[y][x] + 1;
      }
    }
  }
  return result;
}

function calculatePart2(input: number[][]): number {
  let count = [];
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if (input[y][x] < 9) {
        count.push(fillBasins(input, x, y));
      }
    }
  }

  count.sort((a, b) => b - a);
  return count[0] * count[1] * count[2];
}


function parse(input: string): number[][] {
  return input.split('\n').map(v => v.split('').map(v => +v));
}

export async function run() {
  const input: string = await getInput(DAY);
  const result1 = calculatePart1(parse(input));
  const result2 = calculatePart2(parse(input));
  return [result1, result2]
}

function tests() {
  const part1Test = getTestFunction((input) => calculatePart1(parse(input)));
  const part2Test = getTestFunction((input) => calculatePart2(parse(input)));
  const input = "2199943210\n" +
    "3987894921\n" +
    "9856789892\n" +
    "8767896789\n" +
    "9899965678";
  part1Test(input, 15);

  console.log('---------------------');

  part2Test(input, 1134);

  console.log('---------------------');
}
