import {getInput, getTestFunction, sendAnswer} from './helper';

const DAY = 5;

type Input = {x1: number, y1: number, x2: number, y2: number}[]

class CoordMap {
  private map: {[x: number]: {[y: number]: number}} = {};

  getPoint(x: number, y: number): number {
    return this.map?.[x]?.[y] ?? 0;
  }

  addPoint(x: number, y: number) {
    if (!this.map[x]) {
      this.map[x] = {};
    }
    this.map[x][y] = this.getPoint(x, y) + 1;
  }

  addLine(x1: number, y1: number, x2: number, y2: number, diagonal = false) {
    const xStep = x1 < x2 ? 1 : x1 > x2 ? -1 : 0;
    const yStep = y1 < y2 ? 1 : y1 > y2 ? -1 : 0;
    const stepCount = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1));

    if (!diagonal && xStep != 0 && yStep != 0) {
      return;
    }

    for (let step = 0; step <= stepCount; step++) {
      this.addPoint(x1 + step * xStep, y1 + step * yStep);
    }
  }

  calculateIntersection(count: number): number {
    let result = 0;
    for (let x in this.map) {
      for (let y in this.map) {
        if (this.getPoint(+x, +y) >= count) {
          result++;
        }
      }
    }
    return result;
  }
}

tests();
run().then(async ([result1, result2]) => {
  console.log('Part 1:', result1);
  // await sendAnswer(DAY, 1, result1.toString());
  console.log('Part 2:', result2);
  // await sendAnswer(DAY, 2, result2.toString());

});

function calculatePart1(input: Input): number {
  const map = new CoordMap();
  for (const row of input) {
    map.addLine(row.x1, row.y1, row.x2, row.y2);
  }
  return map.calculateIntersection(2);
}

function calculatePart2(input: Input): number {
  const map = new CoordMap();
  for (const row of input) {
    map.addLine(row.x1, row.y1, row.x2, row.y2, true);
  }
  return map.calculateIntersection(2);
}


function parse(input: string): Input {
  return input.split('\n')
      .map(v => v.split('->')
          .map(v=> v.trim()
              .split(',')
              .map(v => +v)
          )
      ).map(([[x1, y1],[x2, y2]]) => ({x1, y1, x2, y2}));

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
  part1Test("0,9 -> 5,9\n" +
      "8,0 -> 0,8\n" +
      "9,4 -> 3,4\n" +
      "2,2 -> 2,1\n" +
      "7,0 -> 7,4\n" +
      "6,4 -> 2,0\n" +
      "0,9 -> 2,9\n" +
      "3,4 -> 1,4\n" +
      "0,0 -> 8,8\n" +
      "5,5 -> 8,2", 5);

  console.log('---------------------');

  part2Test("0,9 -> 5,9\n" +
      "8,0 -> 0,8\n" +
      "9,4 -> 3,4\n" +
      "2,2 -> 2,1\n" +
      "7,0 -> 7,4\n" +
      "6,4 -> 2,0\n" +
      "0,9 -> 2,9\n" +
      "3,4 -> 1,4\n" +
      "0,0 -> 8,8\n" +
      "5,5 -> 8,2", 12);

  console.log('---------------------');
}
