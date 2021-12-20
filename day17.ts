import {getInput, getTestFunction, sendAnswer} from './helper';

const DAY = 17;

type Input = {fromX: number, toX: number, fromY: number, toY: number}

tests();
run().then(async ([result1, result2]) => {
  console.log('Part 1:', result1);
  // await sendAnswer(DAY, 1, result1.toString());
  console.log('Part 2:', result2);
  // await sendAnswer(DAY, 2, result2.toString());

});

function calculatePart1(input: Input): number {
  const y = Math.abs(input.toY)
  return ((y - 1) * y) / 2;
}

function calculatePart2(input: Input): number {
  const maxX = input.toX;
  const maxY = calculatePart1(input);
  const minY = input.toY;
  let minX = 0;
  let count = 0;
  for (;;minX++) {
    count += minX;
    if (count >= input.fromX) {
      break;
    }
  }
  let result = 0;
  for (let x = minX; x <= maxX; x++) {
    for (let y = minY; y <= maxY; y++) {
      let posX = 0;
      let posY = 0;
      let xv = x;
      let yv = y;
      while (posY > input.toY) {
        posX += xv--;
        if (xv < 0) {
          xv = 0;
        }
        posY += yv--;
        if (posX >= input.fromX && posX <= input.toX && posY >= input.toY && posY <= input.fromY) {
          result++;
          break;
        }
      }
    }
  }
  return  result;

}


function parse(input: string): Input {
  const match = /target area: x=(\d+)..(\d+), y=([\-\d]+)..([\-\d]+)/.exec(input);
  return {fromX: +match[1], toX: +match[2], fromY: +match[4], toY: +match[3]}
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
  part1Test("target area: x=20..30, y=-10..-5", 45);

  console.log('---------------------');

  part2Test("target area: x=20..30, y=-10..-5", 112);

  console.log('---------------------');
}
