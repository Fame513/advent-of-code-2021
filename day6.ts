import {getInput, getTestFunction, sendAnswer} from './helper';

const DAY = 6;

tests();
run().then(async ([result1, result2]) => {
  console.log('Part 1:', result1);
  // console.log(await sendAnswer(DAY, 1, result1.toString()));
  console.log('Part 2:', result2);
  // console.log(await sendAnswer(DAY, 2, result2.toString()));
});

function calculate(input: number[], days: number): number {
  const fish = new Array(9).fill(0).map((k, i) => input.filter(v => v == i).length);
  for (let day = 1; day <= days; day++) {
    fish.push(fish.shift());
    fish[6] += fish[8];
  }
  return fish.reduce((buf, v) => buf + v);
}


function parse(input: string): number[] {
  return input.split(',')
    .map(v => +v)
}

export async function run() {
  const input: string = await getInput(DAY);
  const result1 = calculate(parse(input), 80);
  const result2 = calculate(parse(input), 256);
  return [result1, result2]
}

function tests() {
  const part1Test = getTestFunction((input) => calculate(parse(input), 80));
  const part2Test = getTestFunction((input) => calculate(parse(input), 256));
  part1Test("3,4,3,1,2", 5934);

  console.log('---------------------');

  part2Test("3,4,3,1,2", 26984457539);

  console.log('---------------------');
}
