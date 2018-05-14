import { Injectable } from '@angular/core';

@Injectable()
export class DiceService {

  operators: {};
  numStack;
  rolls;
  rollString;
  position;
  length;
  numberStack;
  operatorStack;


  constructor() {
    this.numStack = [];
    this.rolls = [];
    this.numberStack = [];
    this.operatorStack = [];

    this.operators = {
      '+': {
        precedence: 1,
        process: (a, b) => {
          return a + b;
        }
      },
      '-': {
        precedence: 1,
        process: (a, b) => {
          return a - b;
        }
      },
      '*': {
        precedence: 2,
        process: (a, b) => {
          return a * b;
        }
      },
      '/': {
        precedence: 2,
        process: (a, b) => {
          if (b === 0) {
            throw new Error('Division by 0');
          }
          return a / b;
        }
      },
      'd': {
        precedence: 3,
        process: (rolls, sides, rollsSoFar) => {
          if (rolls > 100) {
            throw new Error('Maximum roll count is 100');
          }

          let total = 0;
          let roll;
          while (rolls--) {
            roll = Math.floor(Math.random() * sides) + 1;

            total += roll;
            rollsSoFar.push(roll);
          }

          return total;
        }
      }
    }
  }

  parse(str: string): Object {
    this.rollString = str;
    this.tokenize();
    // this.executeOperations();

    this.rollString = str = null;

    return {
      total: this.numStack[0],
      rolls: this.rolls.reverse()
    }
  }

  tokenize(): void {
    let token;
    let last;

    while (this.position++) {

      if (this.rollString[this.position] === " " || this.rollString[this.position] === "\t") continue;

      // token = this.nextToken();

      if (token.type === "number") this.numberStack.push(token.value);
      else if (token.type === "operator") {
        last = this.operatorStack[this.operatorStack.length - 1];

        if (last && token.value === "d" && last.value === "d") {
          var itOnTheGround = new Error("Unexpected unchainable operator d");
          // itOnTheGround.column = this.position;
        }
        throw itOnTheGround;
      }
      this.operatorStack.push(token);
    }
  }

  execute() {
    let index;

    while((index = this.operatorStack.length)) {
      while (0 <= index--) {
        
      }
    }
  }

}
