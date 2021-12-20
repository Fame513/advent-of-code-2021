import {getInput, getTestFunction, sendAnswer} from './helper';

const DAY = 18;

type Input = string[]

tests();
run().then(async ([result1, result2]) => {
  console.log('Part 1:', result1);
  // await sendAnswer(DAY, 1, result1.toString());
  console.log('Part 2:', result2);
  // await sendAnswer(DAY, 2, result2.toString());

});

function addNumber(str: string, pos: number, add: number): string {
  const c = Number.parseInt(str.slice(--pos)) || Number.parseInt(str.slice(++pos));
  const num = +c + add;
  const res = num.toString()
  return str.slice(0, pos) + res + str.slice(pos + c.toString().length);
}

function step(str: string): string {
  let deep = 0;

  for(let i = 0; i < str.length; i++) {
    const c = str[i];
    if (c === '[') {
      deep++;
    } else if (c === ']') {
      deep--;
    }
    if (deep >= 5) {
      const slice = str.slice(i).match(/^\[\d+,\d+]/)[0];
      if (!slice) {
        continue;
      }
      const [l, r] = JSON.parse(slice);
      let before = str.slice(0, i);
      let after = str.slice(i + slice.length);
      for (let a = before.length - 1; a >= 0; a--) {
        const c = Number.parseInt(before.slice(a));
        if (!isNaN(c)) {
          before = addNumber(before, a, l);
          break;
        }
      }
      for (let a = 0; a < after.length; a++) {
        const c = Number.parseInt(after.slice(a));
        if (!isNaN(c)) {
          after = addNumber(after, a, r);
          break;
        }
      }
      return before + '0' + after;
    }
  }
}

type ArrOrNum = number | [ArrOrNum, ArrOrNum]

function getMagnitude(data: ArrOrNum): number {
  if (typeof data === 'number') {
    return data;
  } else {
    return 3 * getMagnitude(data[0]) + 2 * getMagnitude(data[1])
  }
}

function explode(str: string): string {
  for (let i = 0; i < str.length; i++) {
    const c = Number.parseInt(str.slice(i));
    if (c > 9) {
      return str.slice(0, i) + `[${Math.floor(c / 2)},${Math.ceil(c / 2)}]` + str.slice(i + 2)
    }
  }
  return ;
}

function processString(str: string): string {
  let newString;
  while ((newString = step(str)) || (newString = explode(str))) {
    str = newString;
  }
  return str;
}

function calculatePart1(input: Input): number {
  let result = input[0];
  for (let i = 1; i < input.length; i++) {
    const str = input[i];
    const add = JSON.stringify([JSON.parse(result), JSON.parse(str)]);
    result = processString(add);
  }
  return getMagnitude(JSON.parse(result));
}

function calculatePart2(input: Input): number {
  let max = 0;
  for (let a of input) {
    for (let b of input) {
      if (a === b) {
        continue;
      }
      const result = getMagnitude(JSON.parse(processString(JSON.stringify([JSON.parse(a), JSON.parse(b)]))));
      max = Math.max(max, result);
    }
  }
  return max;
}


function parse(input: string): Input {
  return input.split('\n');

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
  const stepTest = getTestFunction((input) => step(input));
  const processStringTest = getTestFunction((input) => processString(input));
  const explodeTest = getTestFunction((input) => explode(input));
  stepTest('[[[[[9,8],1],2],3],4]', '[[[[0,9],2],3],4]');
  stepTest('[7,[6,[5,[4,[3,2]]]]]', '[7,[6,[5,[7,0]]]]');
  stepTest('[[6,[5,[4,[3,2]]]],1]', '[[6,[5,[7,0]]],3]');
  stepTest('[[3,[2,[1,[7,3]]]],[6,[5,[4,[3,2]]]]]', '[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]');
  stepTest('[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]', '[[3,[2,[8,0]]],[9,[5,[7,0]]]]');
  stepTest('[[[[4,0],[5,4]],[[7,7],[6,0]]],[[8,9],[[12,0],[8,[11,8]]]]]', '[[[[4,0],[5,4]],[[7,7],[6,0]]],[[8,9],[[12,0],[19,0]]]]');
  processStringTest('[[[[[4,3],4],4],[7,[[8,4],9]]],[1,1]]', '[[[[0,7],4],[[7,8],[6,0]]],[8,1]]');
  processStringTest('[[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]],[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]]', '[[[[4,0],[5,4]],[[7,7],[6,0]]],[[8,[7,7]],[[7,9],[5,0]]]]');
  explodeTest('[[[[0,7],4],[15,[0,13]]],[1,1]]', '[[[[0,7],4],[[7,8],[0,13]]],[1,1]]')
  explodeTest('[[[[0,7],4],[[7,8],[0,13]]],[1,1]]', '[[[[0,7],4],[[7,8],[0,[6,7]]]],[1,1]]')

  const input1 = "[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]\n" +
      "[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]\n" +
      "[[2,[[0,8],[3,4]]],[[[6,7],1],[7,[1,6]]]]\n" +
      "[[[[2,4],7],[6,[0,5]]],[[[6,8],[2,8]],[[2,1],[4,5]]]]\n" +
      "[7,[5,[[3,8],[1,4]]]]\n" +
      "[[2,[2,2]],[8,[8,1]]]\n" +
      "[2,9]\n" +
      "[1,[[[9,3],9],[[9,0],[0,7]]]]\n" +
      "[[[5,[7,4]],7],1]\n" +
      "[[[[4,2],2],6],[8,7]]"

  console.log('---------------------');

  const input2 = "[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]\n" +
      "[[[5,[2,8]],4],[5,[[9,9],0]]]\n" +
      "[6,[[[6,2],[5,6]],[[7,6],[4,7]]]]\n" +
      "[[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]\n" +
      "[[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]\n" +
      "[[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]\n" +
      "[[[[5,4],[7,7]],8],[[8,3],8]]\n" +
      "[[9,3],[[9,9],[6,[4,9]]]]\n" +
      "[[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]\n" +
      "[[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]"
    part1Test(input1, 3488);
    part1Test(input2, 4140);

  part2Test(input2, 3993);

  console.log('---------------------');
}
