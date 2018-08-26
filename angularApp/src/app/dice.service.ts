import { Injectable } from '@angular/core';

@Injectable()
export class DiceService {

  operations: Object = {
    "+": {
      precedence: 1,
      apply: (val1: number, val2: number): number => {
        return val2 + val1;
      }
    },
    "-": {
      precedence: 1,
      apply: (val1: number, val2: number): number => {
        return val2 - val1;
      }
    },
    "*": {
      precedence: 2,
      apply: (val1: number, val2: number): number => {
        return val2 * val1;
      }
    },
    "/": {
      precedence: 2,
      apply: (val1: number, val2: number): number => {
        if (val1 == 0) {
          throw new Error("Dividing by ZERO!!");
        }
        return val2 / val1;
      }
    },
    ")": {
      precedence: 3,
    },
    "d": {
      precedence: 4,
      apply: (val1: number, val2: number, diceRolls: number[]): number => {
        let sum = 0;
        for (let i = 0; i < val2; i++) {
          let roll = Math.ceil(Math.random() * val1);
          diceRolls.push(roll);
          sum += roll;
        }
        return sum;
      }
    }
  }

  values: number[];
  ops: string[];
  rolls: number[];

  constructor() {
    this.reset();
  }

  evaluateRoll(roll): object {
    let tokens = roll.dice_string.split('');

    for (let i = 0; i < tokens.length; i++) {
      // skip token if it's whitespace
      if (tokens[i] === " ") continue;

      // push current token to values stack if it's a number
      if (tokens[i] >= "0" && tokens[i] <= "9") {
        //Re-build string for numbers longer than 2 digits
        let buffer = ""
        while (i < tokens.length && tokens[i] >= "0" && tokens[i] <= "9") {
          buffer += tokens[i++];
        }
        i--; // the while loop above goes one step too far
        this.values.push(parseInt(buffer));
      }

      // current token is an opening brace, push to operations
      else if (tokens[i] === "(") {
        this.ops.push(tokens[i])
      }

      //Closing brace encountered
      else if (tokens[i] === ")") {
        while (this.ops[this.ops.length - 1] != "(") {
          //Solve everything inside;
          this.values.push(this.performOperation());
        }
        //Remove opening brace
        this.ops.pop();
      }

      // Current token is an operator
      else if (tokens[i] == "+" || tokens[i] == "-" || tokens[i] == "*" || tokens[i] == "/" || tokens[i] == "d") {

        // Catch any strings missing the number of dice to roll. eg: 'd20'
        if (tokens[i] == "d" && (!tokens[i - 1] || (tokens[i - 1] < "0" || tokens[i - 1] > "9"))) this.values.push(1);
        // While the current token has a lower order of operation than the one at the top of the stack, do those operations instead;
        while (this.ops.length && this.getPrecedence(tokens[i]) <= this.getPrecedence(this.ops[this.ops.length - 1])) {
          this.values.push(this.performOperation());
        }
        // Push current token to operations
        this.ops.push(tokens[i])
      }
      else {
        throw new Error("Invalid Dice String")
      }
    }

    // Entire string has been parsed at this point.  Finish applying remaining operations
    while (this.ops.length) {
      this.values.push(this.performOperation());
    }

    roll.total = this.values.pop() //Set total
    roll.last_rolls = `[${this.rolls.toString()}]`; //Set last roll
    this.reset();
    return roll;
  }

  // returns a value based on the order of operations
  // dice rolls     ⇨    ( )     ⇨    / *     ⇨    + -
  getPrecedence(op: string): number {
    return this.operations[op] ? this.operations[op].precedence : 0;
  }

  performOperation(): number {
    //Grab the last operation on the stack
    let curOp = this.operations[this.ops.pop()];
    //Grab last two values from stack;
    let firstVal = this.values.pop();
    let secondVal = this.values.pop();

    let results = curOp.apply(firstVal, secondVal, this.rolls);
    return results
  }

  reset(): void {
    this.ops = [];
    this.values = [];
    this.rolls = [];
  }

  validateDiceString(str: string): boolean {
    if (str.match(/(\d*)([dD]\d+)((?:[+*-](?:\d+|\([d]*\)))*)(?:\+([dD]\d*))?/) && //Vaguelly match any dice string
      !str.match(/[a-ce-zA-CE-Z!@#$%^&]/)) { //And no other characters
      return true
    }
    return false;
  }
}
