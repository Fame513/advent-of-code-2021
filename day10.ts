import {getInput, getTestFunction, sendAnswer} from './helper';

const DAY = 10;

type Input = string[]

const oc = {'(': ')', '[': ']', '{': '}', '<': '>'}
const points1 = {')': 3, ']': 57, '}': 1197, '>': 25137}
const points2 = {'(': 1, '[': 2, '{': 3, '<': 4}

tests();
run().then(async ([result1, result2]) => {
  console.log('Part 1:', result1);
  // await sendAnswer(DAY, 1, result1.toString());
  console.log('Part 2:', result2);
  // await sendAnswer(DAY, 2, result2.toString());

});

function isCorrect(line: string): string[] {
  let stack = [];
  for (const c of line.split('')) {
    if (oc[c]) {
      stack.push(c)
    } else if (oc[stack.pop()] !== c) {
      throw c;
    }
  }
  return stack;
}


function calculatePart1(input: Input): number {
  let result = 0;
  for (const line of input) {
    try {
      isCorrect(line)
    } catch (e) {
      result += points1[e]
    }
  }
  return result;
}


function calculatePart2(input: Input): number {
  let results = [];
  for (const line of input) {
    try {
      const stack = isCorrect(line);
      results.push(stack.reduceRight((buf, c) => buf * 5 + points2[c], 0))
    } catch (e) {
    }
  }
  return results.sort((a, b) => a - b)[Math.floor(results.length / 2)];
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

  const input = "[({(<(())[]>[[{[]{<()<>>\n" +
      "[(()[<>])]({[<{<<[]>>(\n" +
      "{([(<{}[<>[]}>{[]{[(<()>\n" +
      "(((({<>}<{<{<>}{[]{[]{}\n" +
      "[[<[([]))<([[{}[[()]]]\n" +
      "[{[{({}]{}}([{[{{{}}([]\n" +
      "{<[[]]>}<{[{[{[]{()[[[]\n" +
      "[<(<(<(<{}))><([]([]()\n" +
      "<{([([[(<>()){}]>(<<{{\n" +
      "<{([{{}}[<[[[<>{}]]]>[]]"


  part1Test(input, 26397);

  console.log('---------------------');

  part2Test(input, 288957);

  console.log('---------------------');
}
