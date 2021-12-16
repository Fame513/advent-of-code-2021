import {getInput, getTestFunction, sendAnswer} from './helper';

const DAY = 15;

type Input = number[][]
const shifts = [[1, 0], [0, 1], [-1 , 0], [0, -1]];

tests();
run().then(async ([result1, result2]) => {
  console.log('Part 1:', result1);
  // await sendAnswer(DAY, 1, result1.toString());
  console.log('Part 2:', result2);
  // await sendAnswer(DAY, 2, result2.toString());
});

function getPos(input: Input, x: number, y: number): number {
  const yShift = Math.floor(y / input.length);
  const xShift = Math.floor(x / input[0].length);
  const yMod = y % input.length;
  const xMod = x % input[0].length;
  let value = input[yMod][xMod] + xShift + yShift;
  if (value > 9) {
    value -= 9
  }
  return value
}


function findPath(input: Input): number {
  const distances: number[][] = input.map(v => new Array(v.length).fill(0));
  let stack = [[0, 0]];
  n: while (true) {
    if (stack.length === 0) {
      break
    }
    stack.sort((a, b) => distances[b[1]][b[0]] - distances[a[1]][a[0]]);

    const [x, y] = stack.pop();
    for (const shift of shifts) {
      const nx = x + shift[0];
      const ny = y + shift[1];
      if (ny < 0 || nx < 0 || ny >= input.length || ny >= input[0].length) {
        continue n;
      }
      const newDist = distances[y][x] + input[ny][nx];
      if (distances[ny][nx] === 0) {
        distances[ny][nx] = newDist;
        stack.push([nx, ny]);
      }
    }
  }
  return distances[input.length - 1][input[0].length - 1];
}


function calculatePart1(input: Input): number {
  return findPath(input);
}

function calculatePart2(input: Input): number {
  const sizeX = input[0].length * 5;
  const sizeY = input.length * 5;
  const distances: number[][] = new Array(sizeY).fill(0).map(v => new Array(sizeX).fill(0));
  for (let y = 0; y < distances.length; y++) {
    for (let x = 0; x < distances[0].length; x++) {
      distances[y][x] = getPos(input, x, y);
    }
  }

  return findPath(distances)
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
  const input = "1163751742\n" +
    "1381373672\n" +
    "2136511328\n" +
    "3694931569\n" +
    "7463417111\n" +
    "1319128137\n" +
    "1359912421\n" +
    "3125421639\n" +
    "1293138521\n" +
    "2311944581"
  part1Test(input, 40);

  console.log('---------------------');

  part2Test(input, 315);

  console.log('---------------------');
}
