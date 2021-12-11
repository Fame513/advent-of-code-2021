import {getInput, getTestFunction, sendAnswer} from './helper';

const DAY = 11;

type Input = number[][]


tests();
run().then(async ([result1, result2]) => {
  console.log('Part 1:', result1);
  // await sendAnswer(DAY, 1, result1.toString());
  console.log('Part 2:', result2);
  // await sendAnswer(DAY, 2, result2.toString());

});

function flash(input: Input, x: number, y: number) {
  for (let dy = y - 1; dy <= y + 1; dy++) {
    if (dy < 0 || dy >= input.length) {
      continue;
    }
    for (let dx = x - 1; dx <= x + 1; dx++) {
      if (dx < 0 || dx >= input[y].length || (dx === x && dy === y)) {
        continue;
      }
      if (input[dy][dx] > 0) {
        input[dy][dx]++;
      }
    }
  }
}

function step(input: Input): number {
  let result = 0;
  for (let y = 0; y < input.length; y++){
    for (let x = 0; x < input.length; x++){
      input[y][x]++;
    }
  }
  let check = true;
  while (check) {
    check = false;
    for (let y = 0; y < input.length; y++) {
      for (let x = 0; x < input.length; x++) {
        if (input[y][x] > 9) {
          check = true;
          flash(input, x, y)
          input[y][x] = 0;
          result++;
        }
      }
    }
  }
  return result;
}


function calculatePart1(input: Input): number {
  let result = 0;
  for (let i = 0; i < 100; i++) {
    result += step(input);
  }
  return result;
}

function calculatePart2(input: Input): number {
  for (let i = 1; true; i++) {
    if (step(input) === 100) {
      return i;
    }
  }
}


function parse(input: string): Input {
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

  const input = "5483143223\n" +
      "2745854711\n" +
      "5264556173\n" +
      "6141336146\n" +
      "6357385478\n" +
      "4167524645\n" +
      "2176841721\n" +
      "6882881134\n" +
      "4846848554\n" +
      "5283751526"


  part1Test(input, 1656);

  console.log('---------------------');

  part2Test(input, 195);

  console.log('---------------------');
}
