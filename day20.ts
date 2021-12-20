import {getInput, getTestFunction} from './helper';

const DAY = 20;

type Input = {rules: string, map: string[][]}

tests();
run().then(([result1, result2]) => {
  console.log('Part 1:', result1);
  console.log('Part 2:', result2);
});

function increaseMap(map: string[][], size = 3){
  const newMap = [];
  const lineLength = map[0].length + size * 2;
  for (let i = 0; i < size; i++) {
    newMap.push(new Array(lineLength).fill('.'));
  }
  for (let line of map) {
    newMap.push([...'.'.repeat(size).split(''), ...line, ...'.'.repeat(size).split('')])
  }
  for (let i = 0; i < size; i++) {
    newMap.push(new Array(lineLength).fill('.'));
  }
  return newMap;
}

function getNewPoint(map: string[][], rules: string, x: number, y: number): string {
  let number = '';
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      number += map[y + dy][x + dx] === '#' ? '1' : '0';
    }
  }
  return rules[Number.parseInt(number, 2)];
}

function calculate(input: Input, steps: number) {
  let map = increaseMap(input.map, 2 * steps);
  let filler = '.';
  for (let i = 0; i < steps; i++) {
    if (filler === '.') {
      filler = input.rules[0];
    } else {
      filler = input.rules[input.rules.length - 1];
    }
    const newMap = [new Array(map[0].length).fill(filler)];
    for (let y = 1; y < map.length - 1; y++) {
      const newLine = [filler];
      for (let x = 1; x < map[y].length - 1; x++) {
        newLine.push(getNewPoint(map, input.rules, x, y))
      }
      newLine.push(filler);
      newMap.push(newLine);
    }
    newMap.push(new Array(map[0].length).fill(filler));
    map = newMap;
  }
  let result = 0;
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === '#') {
        result++
      }
    }
  }

  return result;
}


function parse(input: string): Input {
  const [rules, mapData] = input.split('\n\n');
  const map = mapData.split('\n').map(v => v.split(''));
  return {rules, map};
}

export async function run() {
  const input: string = await getInput(DAY);
  const result1 = calculate(parse(input), 2);
  const result2 = calculate(parse(input), 50);
  return [result1, result2]
}

function tests() {
  const part1Test = getTestFunction((input) => calculate(parse(input), 2));
  const part2Test = getTestFunction((input) => calculate(parse(input), 50));
  const input = "..#.#..#####.#.#.#.###.##.....###.##.#..###.####..#####..#....#..#..##..##" +
    "#..######.###...####..#..#####..##..#.#####...##.#.#..#.##..#.#......#.###" +
    ".######.###.####...#.##.##..#..#..#####.....#.#....###..#.##......#.....#." +
    ".#..#..##..#...##.######.####.####.#.#...#.......#..#.#.#...####.##.#....." +
    ".#..#...##.#.##..#...##.#.##..###.#......#.#.......#.#.#.####.###.##...#.." +
    "...####.#..#..#.##.#....##..#.####....##...##..#...#......#.#.......#....." +
    "..##..####..#...#.#.#...##..#.#..###..#####........#..####......#..#\n" +
    "\n" +
    "#..#.\n" +
    "#....\n" +
    "##..#\n" +
    "..#..\n" +
    "..###"
  part1Test(input, 35);

  console.log('---------------------');

  part2Test(input, 3351);

  console.log('---------------------');
}
