import {getInput, getTestFunction, sendAnswer} from './helper';

const DAY = 22;

type Input = {action: 'on' | 'off', box: Box}
type Axis = 'x' | 'y' | 'z'

class Box {
  constructor( private readonly x: number[],
               private readonly y: number[],
               private readonly z: number[]) {
  }

  clone(): Box {
    return new Box(this.x.slice(), this.y.slice(), this.z.slice())
  }

  shiftSide(axis: Axis, side: 0 | 1, value: number): Box | undefined {
    if ((side === 0 && this[axis][1] < value) || (side === 1 && this[axis][0] > value)) {
      return ;
    }
    if ((side === 0 && this[axis][0] >= value) || (side === 1 && this[axis][1] <= value)) {
      return this;
    }
    const box = this.clone();
    box[axis][side] = value;
    return box;
  }

  size() {
    return (Math.abs(this.x[1] - this.x[0]) + 1)
        * (Math.abs(this.y[1] - this.y[0]) + 1)
        * (Math.abs(this.z[1] - this.z[0]) + 1);
  }

  split(axis: Axis, side: 1 | 0, value: number): {part: Box | undefined, left: Box | undefined} {
    return {
      part: this.shiftSide(axis, side ? 0 : 1, value + (side ? 1 : -1)),
      left: this.shiftSide(axis, side, value)
    }
  }

  sub(box: Box): Box[] {
    let left: Box = this;
    let part: Box;
    const result = []
    br: for (const axis of ['x', 'y' ,'z']) {
      for (const side of [0, 1]) {
        ({left, part} = left.split(axis as Axis, side as 0 | 1, box[axis][side]));
        if (part) result.push(part)
        if (!left) break br;
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


function calculatePart1(input: Input[]): number {
  input = input.slice(0, 20);
  return calculatePart2(input);
}

function calculatePart2(input: Input[]): number {
  let boxes: Box[] = [];
  for (const box of input) {
    const newBoxes = []
    for (let existedBox of boxes) {
      newBoxes.push(...existedBox.sub(box.box))
    }
    if (box.action === 'on') newBoxes.push(box.box)
    boxes = newBoxes;
  }

  return boxes.reduce((buf, box) => buf + box.size(), 0);
}


function parse(input: string): Input[] {
  return input.split('\n').map(line => {
    const [action, pos] = line.split(' ');
    const [x, y, z] = pos.split(',').map(v => v.slice(2));
    return {
      action, box: new Box(
          x.split('..').map(v => +v) as [number, number],
          y.split('..').map(v => +v) as [number, number],
          z.split('..').map(v => +v) as [number, number]
      )
    } as Input
  });

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
  const input = "on x=-1..48,y=-18..35,z=-45..4\n" +
      "on x=-18..33,y=-45..9,z=-47..-1\n" +
      "on x=-19..32,y=-9..43,z=-6..44\n" +
      "on x=-27..22,y=-22..29,z=-11..43\n" +
      "on x=-41..3,y=2..49,z=-21..26\n" +
      "on x=-12..35,y=-39..12,z=-11..34\n" +
      "on x=-49..3,y=-49..-5,z=-35..19\n" +
      "on x=-49..3,y=-37..14,z=-35..15\n" +
      "on x=-11..41,y=-8..38,z=-16..28\n" +
      "on x=-39..9,y=-7..46,z=-36..11\n" +
      "off x=22..35,y=-6..10,z=-4..6\n" +
      "on x=0..45,y=-33..20,z=-20..33\n" +
      "off x=-28..-12,y=18..32,z=10..23\n" +
      "on x=-10..43,y=-22..23,z=-29..21\n" +
      "off x=-2..15,y=-19..-7,z=32..44\n" +
      "on x=-10..36,y=-22..27,z=-28..26\n" +
      "off x=-43..-24,y=-4..15,z=-3..7\n" +
      "on x=-5..49,y=-10..36,z=-7..46\n" +
      "off x=-10..0,y=25..36,z=32..42\n" +
      "on x=-35..10,y=3..47,z=-42..2"
  // part1Test(input, 1000 - 8);

  console.log('---------------------');

  // part2Test(input, 0);

  console.log('---------------------');
}
