import {getInput, getTestFunction, sendAnswer} from './helper';

const DAY = 13;

type Input = {data: Set<string>, folds: {axis: 'x' | 'y', value: number}[]};

tests();
run().then(async ([result1, result2]) => {
  console.log('Part 1:', result1);
  // console.log(await sendAnswer(DAY, 1, result1.toString()));
  console.log('Part 2:', result2);
  // console.log(await sendAnswer(DAY, 2, result2.toString()));
});

function serialize(val: [number, number]): string {
  return val.join(',');
}

function deserialize(val: string): [number, number] {
  return val.split(',').map(v => +v) as [number, number];
}

function foldX(data: Set<string>, fold: number) {
  for(const point of data) {
    const[x, y] = deserialize(point);
    if (x > fold) {
      data.add(serialize([fold - (x - fold), y]));
      data.delete(point);
    }
  }
}

function foldY(data: Set<string>, fold: number) {
  for(const point of data) {
    const[x, y] = deserialize(point);
    if (y > fold) {
      data.add(serialize([x, fold - (y - fold)]));
      data.delete(point);
    }
  }
}

function calculatePart1(input: Input): number {
  const fold = input.folds[0];
  if (fold.axis === 'x') {
    foldX(input.data, fold.value)
  } else {
    foldY(input.data, fold.value)
  }

  return input.data.size;
}

function calculatePart2(input: Input): number {
  for (const fold of input.folds) {
    if (fold.axis === 'x') {
      foldX(input.data, fold.value)
    } else {
      foldY(input.data, fold.value)
    }
  }

  let maxX = 0;
  let maxY = 0;

  for(const point of input.data) {
    const[x, y] = deserialize(point);
    if (x > maxX) {
      maxX = x;
    }
    if (y > maxY) {
      maxY = y;
    }
  }

  for (let y = 0; y <= maxY; y++) {
    let line = '';
    for (let x = 0; x <= maxX; x++) {
      line += input.data.has(serialize([x, y])) ? '#' : '.';
    }
    console.log(line);
  }

  return 0;
}


function parse(input: string): Input {
  const [data, folds] = input.split('\n\n');
  const parsedData = data.split('\n');
  const parsedFolds = folds.split('\n')
    .map(v => v.replace('fold along ', ''))
    .map(v => v.split('='))
    .map(([axis, value]) => ({axis: axis as 'x' | 'y', value: +value}))
  return {data: new Set(parsedData), folds: parsedFolds}
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
  const input = "6,10\n" +
    "0,14\n" +
    "9,10\n" +
    "0,3\n" +
    "10,4\n" +
    "4,11\n" +
    "6,0\n" +
    "6,12\n" +
    "4,1\n" +
    "0,13\n" +
    "10,12\n" +
    "3,4\n" +
    "3,0\n" +
    "8,4\n" +
    "1,10\n" +
    "2,14\n" +
    "8,10\n" +
    "9,0\n" +
    "\n" +
    "fold along y=7\n" +
    "fold along x=5";
  part1Test(input, 17);

  console.log('---------------------');

  part2Test(input, 0);

  console.log('---------------------');
}
