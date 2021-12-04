import {getInput, getTestFunction, sendAnswer} from './helper';

const DAY = 4;

type Input = {boards: number[][][], numbers: number[]}

tests();
run().then(async ([result1, result2]) => {
  console.log('Part 1:', result1);
  // await sendAnswer(DAY, 1, result1.toString());
  console.log('Part 2:', result2);
  // await sendAnswer(DAY, 2, result2.toString());

});

function checkWin(board: number[][]): boolean {
  next: for(let i = 0; i < board.length; i++) {
    for(let j = 0; j < board[i].length; j++) {
      if (board[i][j] !== null) {
        continue next;
      }
    }
    return true;
  }

  next: for(let i = 0; i < board[0].length; i++) {
    for(let j = 0; j < board.length; j++) {
      if (board[j][i] !== null) {
        continue next;
      }
    }
    return true;
  }

  return false;
}

function removeNumber(board: number[][], n: number) {
  for(let i = 0; i < board.length; i++) {
    for(let j = 0; j < board[i].length; j++) {
      if (board[i][j] === n) {
        board[i][j] = null;
      }
    }
  }
}

function clearBoard(board: number[][]) {
  for(let i = 0; i < board.length; i++) {
    for(let j = 0; j < board[i].length; j++) {
      board[i][j] = undefined;
    }
  }
}

function getScore(board: number[][], lastN: number) {
  let result = 0
  for(let i = 0; i < board.length; i++) {
    for(let j = 0; j < board[i].length; j++) {
      if (board[i][j] !== null) {
        result += board[i][j];
      }
    }
  }
  return result * lastN;
}

function calculatePart1(input: Input): number {
  for (const n of input.numbers) {
    for (const board of input.boards) {
      removeNumber(board, n);
      if (checkWin(board)) {
        return getScore(board, n);
      }
    }
  }

}

function calculatePart2(input: Input): number {
  let score = 0;
  for (const n of input.numbers) {
    for (const board of input.boards) {
      removeNumber(board, n);
      if (checkWin(board)) {
        score = getScore(board, n);
        clearBoard(board);
      }
    }
  }
  return score;
}


function parse(input: string): Input {
  const s = input.split('\n\n')
  const numbers = s.shift().split(',').map(v => +v);
  const boards = s.map(board =>
      board.split('\n')
          .map(row => row.trim().split(/\s+/).map(v => +v)));

  return {boards, numbers}
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
  part1Test("7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1\n" +
      "\n" +
      "22 13 17 11  0\n" +
      " 8  2 23  4 24\n" +
      "21  9 14 16  7\n" +
      " 6 10  3 18  5\n" +
      " 1 12 20 15 19\n" +
      "\n" +
      " 3 15  0  2 22\n" +
      " 9 18 13 17  5\n" +
      "19  8  7 25 23\n" +
      "20 11 10 24  4\n" +
      "14 21 16 12  6\n" +
      "\n" +
      "14 21 17 24  4\n" +
      "10 16 15  9 19\n" +
      "18  8 23 26 20\n" +
      "22 11 13  6  5\n" +
      " 2  0 12  3  7", 4512);

  console.log('---------------------');

  part2Test("7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1\n" +
      "\n" +
      "22 13 17 11  0\n" +
      " 8  2 23  4 24\n" +
      "21  9 14 16  7\n" +
      " 6 10  3 18  5\n" +
      " 1 12 20 15 19\n" +
      "\n" +
      " 3 15  0  2 22\n" +
      " 9 18 13 17  5\n" +
      "19  8  7 25 23\n" +
      "20 11 10 24  4\n" +
      "14 21 16 12  6\n" +
      "\n" +
      "14 21 17 24  4\n" +
      "10 16 15  9 19\n" +
      "18  8 23 26 20\n" +
      "22 11 13  6  5\n" +
      " 2  0 12  3  7", 1924);

  console.log('---------------------');
}
