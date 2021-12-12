import {getInput, getTestFunction, sendAnswer} from './helper';

const DAY = 12;

type Input = {[cave: string]: string[]}

tests();
run().then(async ([result1, result2]) => {
  console.log('Part 1:', result1);
  // await sendAnswer(DAY, 1, result1.toString());
  console.log('Part 2:', result2);
  // await sendAnswer(DAY, 2, result2.toString());
});

function getPath(input: Input, pos: string, smallVisitCount = 1, path: string[] = []): string[][] {
  if ((pos.toLowerCase() === pos && path.filter(v => v == pos).length >= smallVisitCount) ||
      (pos === 'start' && path.includes('start'))) {
    return [];
  }
  if (pos === 'end') {
    path.push(pos);
    return [path];
  }
  const result = [];
  for (const move of input[pos]) {
    const pathClone = path.slice(0);
    const newSmallVisitCount = pos.toLowerCase() === pos && path.includes(pos) ? 1 : smallVisitCount
    pathClone.push(pos);
    result.push(...getPath(input, move, newSmallVisitCount, pathClone))
  }
  return result;
}

function calculatePart1(input: Input): number {
  const path = getPath(input, 'start');
  return path.length;
}

function calculatePart2(input: Input): number {
  const path = getPath(input, 'start', 2);
  return path.length;
}


function parse(input: string): Input {
  return input.split('\n')
      .map(line => line.split('-'))
      .reduce((res, [a, b]) => {
        if (!res[a]) {
          res[a] = [];
        }
        if (!res[b]) {
          res[b] = [];
        }
        res[a].push(b);
        res[b].push(a);
        return res;
      }, {} as Input)

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

  const input1 = "start-A\n" +
      "start-b\n" +
      "A-c\n" +
      "A-b\n" +
      "b-d\n" +
      "A-end\n" +
      "b-end"
  const input2 = "dc-end\n" +
      "HN-start\n" +
      "start-kj\n" +
      "dc-start\n" +
      "dc-HN\n" +
      "LN-dc\n" +
      "HN-end\n" +
      "kj-sa\n" +
      "kj-HN\n" +
      "kj-dc"
  const input3 = "fs-end\n" +
      "he-DX\n" +
      "fs-he\n" +
      "start-DX\n" +
      "pj-DX\n" +
      "end-zg\n" +
      "zg-sl\n" +
      "zg-pj\n" +
      "pj-he\n" +
      "RW-he\n" +
      "fs-DX\n" +
      "pj-RW\n" +
      "zg-RW\n" +
      "start-pj\n" +
      "he-WI\n" +
      "zg-he\n" +
      "pj-fs\n" +
      "start-RW"
  part1Test(input1, 10);
  part1Test(input2, 19);
  part1Test(input3, 226);

  console.log('---------------------');

  part2Test(input1, 36);
  part2Test(input2, 103);
  part2Test(input3, 3509);

  console.log('---------------------');
}
