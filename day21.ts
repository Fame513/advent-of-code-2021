import {getInput, getTestFunction, sendAnswer} from './helper';

const DAY = 21;

type Input = [number, number]


class Dice {
  value = 0;

  roll(): number {
    return this.value++ % 100 + 1;
  }

  threeRolls() {
    return this.roll() + this.roll() + this.roll();
  }
}

class Player {
  score = 0;
  constructor(private _position: number) {
  }

  isWon(): boolean {
    return this.score >= 1000;
  }

  move(steps: number) {
    this._position += steps;
    this.score += this.position;
  }

  get position(): number {
    return (this._position - 1) % 10 + 1;
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
  const player1 = new Player(input[0]);
  const player2 = new Player(input[1]);
  const dice = new Dice();

  let loser: Player;
  while (true) {
    {
      const steps = dice.threeRolls();
      player1.move(steps);
      if (player1.isWon()) {
        loser = player2;
        break;
      }
    }
    {
      const steps = dice.threeRolls();
      player2.move(steps);
      if (player2.isWon()) {
        loser = player1;
        break;
      }
    }
  }
  return loser.score * dice.value
}

function calculatePart2(input: Input): number {
  return 0;
}


function parse(input: string): Input {
  return input.split('\n').map(v => +v.slice(28)) as Input;

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
  part1Test("Player 1 starting position: 4\n" +
      "Player 2 starting position: 8", 739785);

  console.log('---------------------');

  part2Test("", 0);

  console.log('---------------------');
}
