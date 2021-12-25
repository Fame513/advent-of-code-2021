import {getInput, getTestFunction, sendAnswer} from './helper';

const DAY = 25;

type Input = Map;


class Map {
  sizeX: number;
  sizeY: number;
  map: {[pos: string]: '>' | 'v'} = {};

  constructor(sizeX: number, sizeY: number) {
    this.sizeX = sizeX;
    this.sizeY = sizeY;
  }

  set(x: number, y: number, value: '>' | 'v') {
    this.map[this.serPos(x % this.sizeX, y % this.sizeY)] = value;
  }

  get(x: number, y: number): '>' | 'v' | '.' {
    return this.map[this.serPos(x % this.sizeX, y % this.sizeY)] || '.';
  }

  clear(x: number, y: number) {
    delete this.map[this.serPos(x % this.sizeX, y % this.sizeY)];
  }

  serPos(x: number, y:number): string {
    return `${x}_${y}`;
  }

  dePos(s: string): {x: number, y: number} {
    const result = s.split('_')
    return {x: +result[0], y: +result[1]}
  }

  move(x: number, y: number): boolean {
    const val = this.get(x, y);
    if (val === '>' && this.get(x + 1, y) === '.') {
      this.clear(x, y);
      this.set(x + 1, y, val);
      return true
    }
    if (val === 'v' && this.get(x, y + 1) === '.') {
      this.clear(x, y);
      this.set(x, y + 1, val);
      return true
    }
    return false
  }

  *iter(filter?: '>' | 'v'): Generator<{x: number, y: number, value: '>' | 'v'}> {
    for (const key in this.map) {
      let value = this.map[key];
      if (filter && filter != value) {
        continue
      }
      yield {...this.dePos(key), value}
    }
  }

  print() {
    for (let y = 0; y < this.sizeY; y++) {
      let line = '';
      for (let x = 0; x < this.sizeX; x++) {
        line += this.get(x, y);
      }
      console.log(line)
    }
    console.log()
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
  let current = input;
  let step = 0;
  let wasMove = true;
  while (wasMove) {
    wasMove = false;
    step++
    let next = new Map(current.sizeX, current.sizeY);
    for (const {x, y, value} of current.iter()) {
      let move = 0;
      if (value === '>' && current.get(x + 1, y) === '.') {
        move = 1;
        wasMove = true;
      }
      next.set(x + move, y, value)
    }
    current = next;
    next = new Map(current.sizeX, current.sizeY);
    for (const {x, y, value} of current.iter()) {
      let move = 0;
      if (value === 'v' && current.get(x, y + 1) === '.') {
        move = 1;
        wasMove = true;
      }
      next.set(x, y + move, value)
    }
    current = next;
    // console.log(step);
    // current.print();
  }
  return step;
}

function calculatePart2(input: Input): number {
  return 0;

}


function parse(input: string): Input {
  const arr = input.split('\n').map(v => v.split(''));
  const map: Map = new Map(arr[0].length, arr.length);
  for (let y = 0; y < arr.length; y++) {
    for (let x = 0; x < arr[y].length; x++) {
      if (arr[y][x] !== '.'){
        map.set(x, y, arr[y][x] as '>' | 'v')
      }
    }
  }

  return map;
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
  part1Test("v...>>.vv>\n" +
      ".vv>>.vv..\n" +
      ">>.>v>...v\n" +
      ">>v>>.>.v.\n" +
      "v>v.vv.v..\n" +
      ">.>>..v...\n" +
      ".vv..>.>v.\n" +
      "v.v..>>v.v\n" +
      "....v..v.>", 58);

  console.log('---------------------');

  part2Test("", 0);

  console.log('---------------------');
}
