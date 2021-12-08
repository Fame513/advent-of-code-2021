import {getInput, getTestFunction, sendAnswer} from './helper';

const DAY = 8;

type Input = {in: string[], out: string[]}[]

tests();
run().then(async ([result1, result2]) => {
  console.log('Part 1:', result1);
  // await sendAnswer(DAY, 1, result1.toString());
  console.log('Part 2:', result2);
  // await sendAnswer(DAY, 2, result2.toString());

});

function calculatePart1(input: Input): number {
  let result = 0;
  for (let i = 0; i < input.length; i++) {
    result += input[i].out.filter(v => [2, 3, 4, 7].includes(v.length)).length;
  }
  return result;
}

function contain(v: string, has: string): boolean {
  for (const l of has.split('')) {
    if (v.indexOf(l) < 0) {
      return false;
    }
  }
  return true;
}

function neg(v: string): string {
  return 'abcdefg'.split('').filter(k => !v.split('').includes(k)).join('');
}

function calculatePart2(input: Input): number {
  let result = 0
  for (const line of input) {
    const map = new Array(10)
    map[1] = line.in.find(v => v.length === 2);
    map[7] = line.in.find(v => v.length === 3);
    map[4] = line.in.find(v => v.length === 4);
    map[8] = line.in.find(v => v.length === 7);
    map[6] = line.in.find(v => v.length === 6 && !contain(v, map[1]));
    map[9] = line.in.find(v => v.length === 6 && !contain(map[4], neg(v)));
    map[0] = line.in.find(v => v.length === 6 && v !== map[6] && v !== map[9]);
    map[2] = line.in.find(v => v.length === 5 && contain(map[9], neg(v)));
    map[3] = line.in.find(v => v.length === 5 && contain(v, map[7]));
    map[5] = line.in.find(v => v.length === 5 && v !== map[2] && v !== map[3]);

    result += +line.out.map(v => map.indexOf(v).toString()).join('');
  }
  return result;
}


function parse(input: string): Input {
  return input.split('\n').
  map(line => line.split(' | ')
      .map(v => v.split(' ')
          .map(v => v.split('').sort().join('')))).map(v => ({in: v[0], out: v[1]}));

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
  const input = "be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | " +
      "fdgacbe cefdb cefbgd gcbe\n" +
      "edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | " +
      "fcgedb cgb dgebacf gc\n" +
      "fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | " +
      "cg cg fdcagb cbg\n" +
      "fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | " +
      "efabcd cedba gadfec cb\n" +
      "aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | " +
      "gecf egdcabf bgf bfgea\n" +
      "fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | " +
      "gebdcfa ecba ca fadegcb\n" +
      "dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | " +
      "cefg dcbef fcge gbcadfe\n" +
      "bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | " +
      "ed bcgafe cdgba cbgef\n" +
      "egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | " +
      "gbdfcae bgc cg cgb\n" +
      "gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | " +
      "fgae cfgab fg bagce"
  part1Test(input, 26);

  console.log('---------------------');

  part2Test(input, 61229);

  console.log('---------------------');
}
