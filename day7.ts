import {getInput, getTestFunction, sendAnswer} from './helper';

const DAY = 7;

type Input = number[]

tests();
run().then(async ([result1, result2]) => {
  console.log('Part 1:', result1);
  // await sendAnswer(DAY, 1, result1.toString());
  console.log('Part 2:', result2);
  // await sendAnswer(DAY, 2, result2.toString());

});

function calculatePart1(input: Input): number {
  let result = Infinity;
  for (let i = 0; i < input.length; i++) {
    const r =  input.map(v => Math.abs(i - v)).reduce((a, b) => a + b);
    if (r > result) {
      return  result;
    }
    result = r;
  }
  return result;
}

function getFuel(dist: number) {
  dist = Math.abs(dist);
  return (dist * (dist + 1)) / 2;
}

function calculatePart2(input: Input): number {
  let result = Infinity;
  for (let i = 0; i < input.length; i++) {
    const r = input.map(v => getFuel(i - v)).reduce((a, b) => a + b);
    if (r > result) {
      return  result;
    }
    result = r;
  }
  return result;
}


function parse(input: string): Input {
  return input.split(',').map(v => +v);

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
  part1Test("16,1,2,0,4,2,7,1,2,14", 37);

  console.log('---------------------');

  part2Test("16,1,2,0,4,2,7,1,2,14", 168);

  console.log('---------------------');
}
