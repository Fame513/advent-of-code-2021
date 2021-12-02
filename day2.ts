import {getInput, getTestFunction, sendAnswer} from './helper';

const DAY = 2;

type Direction = 'forward' | 'down' | 'up'

tests();
run().then(async ([result1, result2]) => {
  console.log('Part 1:', result1);
  // console.log(await sendAnswer(DAY, 1, result1.toString()));
  console.log('Part 2:', result2);
  // console.log(await sendAnswer(DAY, 2, result2.toString()));

});

function calculatePart1(input: {direction: Direction, distance: number}[]): number {
  let x = 0;
  let y = 0;
  for(const move of input) {
    if (move.direction === 'forward') {
      x += move.distance;
    }
    if (move.direction === 'down') {
      y += move.distance;
    }
    if (move.direction === 'up') {
      y -= move.distance;
    }
  }
  return x * y;
}

function calculatePart2(input: {direction: Direction, distance: number}[]): number {
  let x = 0;
  let y = 0;
  let aim = 0;
  for(const move of input) {
    if (move.direction === 'forward') {
      x += move.distance;
      y += aim * move.distance;

    }
    if (move.direction === 'down') {
      aim += move.distance;
    }
    if (move.direction === 'up') {
      aim -= move.distance;
    }
  }
  return x * y;
}


function parse(input: string): {direction: Direction, distance: number}[] {
  return input.split('\n')
    .map(v => v.split(' '))
    .map(([direction, distance]) => ({direction: direction as Direction, distance: +distance}))
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
  part1Test("forward 5\ndown 5\nforward 8\nup 3\ndown 8\nforward 2\n", 150);

  console.log('---------------------');

  part2Test("forward 5\ndown 5\nforward 8\nup 3\ndown 8\nforward 2\n", 900);

  console.log('---------------------');
}
