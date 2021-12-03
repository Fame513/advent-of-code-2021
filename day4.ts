import {getInput, getTestFunction, sendAnswer} from './helper';

const DAY = 4;

tests();
run().then(async ([result1, result2]) => {
  console.log('Part 1:', result1);
  // await sendAnswer(DAY, 1, result1.toString());
  console.log('Part 2:', result2);
  // await sendAnswer(DAY, 2, result2.toString());

});

function calculatePart1(input: string[]): number {
  return 0;

}

function calculatePart2(input: string[]): number {
  return 0;
}


function parse(input: string): string[] {
  return input.split('\n')
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
  part1Test("", 0);

  console.log('---------------------');

  part2Test("", 0);

  console.log('---------------------');
}
