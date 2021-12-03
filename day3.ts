import {getInput, getTestFunction, sendAnswer} from './helper';

const DAY = 3;

tests();
run().then(async ([result1, result2]) => {
  console.log('Part 1:', result1);
  // await sendAnswer(DAY, 1, result1.toString());
  console.log('Part 2:', result2);
  // await sendAnswer(DAY, 2, result2.toString());

});

function calculatePart1(input: string[]): number {
  let count = new Array(input[0].length).fill(0);
  for(let row of input) {
    for (let i = 0; i < row.length; i++) {
      count[i] += +row[i];
    }
  }
  let gamma = count.map(v => v > input.length / 2 ? 1 : 0).join('');
  let epsilon = count.map(v => v < input.length / 2 ? 1 : 0).join('');
  return Number.parseInt(gamma, 2) *  Number.parseInt(epsilon, 2)
}

function calculatePart2(input: string[]): number {
  let gamma = '';
  let epsilon = '';

  let temp = input;
  for (let i = 0; i < input[0].length; i++) {
    const count = temp.map(v => +v[i]).reduce((buf, v ) => buf + v);
    const filterValue = count >= (temp.length / 2) ? '1' : '0';
    temp = temp.filter(v => v[i] === filterValue)
    if (temp.length === 1) {
      gamma = temp[0];
      break;
    }
  }

  temp = input;
  for (let i = 0; i < input[0].length; i++) {
    const count = temp.map(v => +v[i]).reduce((buf, v ) => buf + v)
    const filterValue = count < (temp.length / 2) ? '1' : '0';
    temp = temp.filter(v => v[i] === filterValue)
    if (temp.length === 1) {
      epsilon = temp[0];
      break;
    }
  }

  return Number.parseInt(gamma, 2) *  Number.parseInt(epsilon, 2)
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
  part1Test("00100\n11110\n10110\n10111\n10101\n01111\n00111\n11100\n10000\n11001\n00010\n01010", 198);

  console.log('---------------------');

  part2Test("00100\n11110\n10110\n10111\n10101\n01111\n00111\n11100\n10000\n11001\n00010\n01010", 230);

  console.log('---------------------');
}
