import {getInput, getTestFunction, sendAnswer} from './helper';

const DAY = 22;

type Input = {action: 'on' | 'off', box: Box}

class Box {
  private readonly x: [number, number];
  private readonly y: [number, number];
  private readonly z: [number, number];

  constructor(x: [number, number],
              y: [number, number],
              z: [number, number]) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  static checked(x: [number, number],
                y: [number, number],
                z: [number, number]): Box | undefined {
    if (x[0] <= x[1] && y[0] <= y[1] && z[0] <= z[1]) {
      return new Box(x, y, z);
    }
  }

  size() {
    return (Math.abs(this.x[1] - this.x[0]) + 1)
        * (Math.abs(this.y[1] - this.y[0]) + 1)
        * (Math.abs(this.z[1] - this.z[0]) + 1);
  }

  split(axis: 'x+' | 'y+' | 'z+' | 'x-' | 'y-' | 'z-', value: number): {part: Box | undefined, left: Box | undefined} {
    switch (axis) {
      case 'x+': return {
        part: Box.checked([Math.max(value + 1, this.x[0]), this.x[1]], [this.y[0], this.y[1]], [this.z[0], this.z[1]]),
        left: Box.checked([this.x[0], Math.min(value, this.x[1])], [this.y[0], this.y[1]], [this.z[0], this.z[1]])
      }
      case 'x-': return {
        part: Box.checked([this.x[0], Math.min(value - 1, this.x[1])], [this.y[0], this.y[1]], [this.z[0], this.z[1]]),
        left: Box.checked([Math.max(value, this.x[0]), this.x[1]], [this.y[0], this.y[1]], [this.z[0], this.z[1]])
      }
      case 'y+': return {
        part: Box.checked([this.x[0], this.x[1]], [Math.max(value + 1, this.y[0]), this.y[1]], [this.z[0], this.z[1]]),
        left: Box.checked([this.x[0], this.x[1]], [this.y[0], Math.min(this.y[1], value)], [this.z[0], this.z[1]])
      }
      case 'y-': return {
        part: Box.checked([this.x[0], this.x[1]], [this.y[0], Math.min(value - 1, this.y[1])], [this.z[0], this.z[1]]),
        left: Box.checked([this.x[0], this.x[1]], [Math.max(value, this.y[0]), this.y[1]], [this.z[0], this.z[1]])
      }
      case 'z+': return {
        part: Box.checked([this.x[0], this.x[1]], [this.y[0], this.y[1]], [Math.max(value + 1, this.z[0]), this.z[1]]),
        left: Box.checked([this.x[0], this.x[1]], [this.y[0], this.y[1]], [this.z[0], Math.min(this.z[1], value)])
      }
      case 'z-': return {
        part: Box.checked([this.x[0], this.x[1]], [this.y[0], this.y[1]], [this.z[0], Math.min(value - 1, this.z[1])]),
        left: Box.checked([this.x[0], this.x[1]], [this.y[0], this.y[1]], [Math.max(value, this.z[0]), this.z[1]])
      }
    }
  }

  sub(box: Box): Box[] {
    let left: Box = this;
    let part: Box;
    const result = []
    const axis = ['x-', 'x+', 'y-', 'y+', 'z-', 'z+'];
    const values = [box.x[0], box.x[1], box.y[0], box.y[1], box.z[0], box.z[1]];
    for(let i = 0; i < axis.length; i++) {
      if (!left) {
        break;
      }
      ({left, part} = left.split(axis[i] as any, values[i]));
      if (part) {
        result.push(part)
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
  let i = 1;
  for (const box of input) {
    console.log(`${i++}/${input.length}`)
    const newBoxes = []
    for (let existedBox of boxes) {
      newBoxes.push(...existedBox.sub(box.box))
    }
    if (box.action === 'on') {
      newBoxes.push(box.box)
    }
    boxes = newBoxes;
  }

  let result = 0;
  for (const box of boxes) {
    result += box.size();
  }
  return result;
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
