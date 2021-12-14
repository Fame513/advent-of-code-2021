import {getInput, getTestFunction, sendAnswer} from './helper';

const DAY = 14;

type Input = {polymer: string, rules: {[v: string]: string}}

tests();
run().then(async ([result1, result2]) => {
  console.log('Part 1:', result1);
  // await sendAnswer(DAY, 1, result1.toString());
  console.log('Part 2:', result2);
  // await sendAnswer(DAY, 2, result2.toString());

});

function transform(countMap: {[rule: string]: number}, rules: {[v: string]: [string, string]}): {[rule: string]: number} {
  let newRuleCount = {}
  for (const [rule, count] of Object.entries(countMap)) {
    const [r1, r2] = rules[rule];
    if (!newRuleCount[r1]) {
      newRuleCount[r1] = 0;
    }
    if (!newRuleCount[r2]) {
      newRuleCount[r2] = 0;
    }
    newRuleCount[r1] += count;
    newRuleCount[r2] += count;
  }
  return newRuleCount;
}

function calculate(input: Input, steps: number): number {
  const rules = {};
  const ruleCountEx = {};
  for (let ruleKey in input.rules) {
    rules[ruleKey] = [ruleKey[0] + input.rules[ruleKey], input.rules[ruleKey] + ruleKey[1]];
    ruleCountEx[ruleKey] = 0;
  }

  let countMap = JSON.parse(JSON.stringify(ruleCountEx))
  for (let i = 0; i < input.polymer.length - 1; i++) {
    const rule = input.polymer[i] + input.polymer[i+1];
    countMap[rule] += 1;
  }


  for(let i = 0; i < steps; i++) {
    countMap = transform(countMap, rules);
  }

  const resultMap: {[k: string]: number} = {[input.polymer[0]]: 1};
  for (const [rule, count] of Object.entries<number>(countMap)) {
    const l: string = rule[1];
    if (!resultMap[l]) {
      resultMap[l] = 0;
    }
    resultMap[l] += count;
  }
  const resultArray = Object.values<number>(resultMap).sort((a, b) => a - b);
  return resultArray[resultArray.length - 1] - resultArray[0];
}


function parse(input: string): Input {
  const [polymer, rules] =  input.split('\n\n');
  const parsedRules = rules.split('\n').map(v => v.split(' -> '))
      .reduce((buf, v) => {
    buf[v[0]] = v[1];
    return buf;
  }, {})
  return {polymer, rules: parsedRules}
}

export async function run() {
  const input: string = await getInput(DAY);
  const result1 = calculate(parse(input), 10);
  const result2 = calculate(parse(input), 40);
  return [result1, result2]
}

function tests() {
  const part1Test = getTestFunction((input) => calculate(parse(input), 10));
  const part2Test = getTestFunction((input) => calculate(parse(input), 40));
  const input = "NNCB\n" +
      "\n" +
      "CH -> B\n" +
      "HH -> N\n" +
      "CB -> H\n" +
      "NH -> C\n" +
      "HB -> C\n" +
      "HC -> B\n" +
      "HN -> C\n" +
      "NN -> C\n" +
      "BH -> H\n" +
      "NC -> B\n" +
      "NB -> B\n" +
      "BN -> B\n" +
      "BB -> N\n" +
      "BC -> B\n" +
      "CC -> N\n" +
      "CN -> C"
  part1Test(input, 1588);

  console.log('---------------------');

  part2Test(input, 2188189693529);

  console.log('---------------------');
}
