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
          // console.log(roll);
          diceRolls.push(roll);
          sum += roll;
        }
        return sum;
      }
    }
  }

  constructor() { }

  evaluate(diceString): object {
    // convert to lower case, trim of any excess whitespace, replace any repeated 'd's with a single, and convert to an array of characters
    let tokens = diceString.toLowerCase().trim().replace(/[d]+/g, 'd').split("");

    //substitutes for stacks
    let values = [];
    let ops = [];
    let rolls = [];

    for (let i = 0; i < tokens.length; i++) {
      // skip token if it's whitespace
      if (tokens[i] === " ") continue;

      // push current token to values stack if it's a number
      if (tokens[i] >= "0" && tokens[i] <= "9") {
        let buffer = ""
        while (i < tokens.length && tokens[i] >= "0" && tokens[i] <= "9") {
          buffer += tokens[i++];
        }
        i--; // the while loop above goes one step too far
        values.push(parseInt(buffer));
      }

      // current token is an opening brace, push to operations
      else if (tokens[i] === "(") {
        ops.push(tokens[i])
      }

      // closing brace encountered, solve everything inside;
      else if (tokens[i] === ")") {
        while (ops[ops.length - 1] != "(") {
          values.push(this.operations[ops.pop()].apply(values.pop(), values.pop(), rolls));
        }
        ops.pop();
      }

      // current token is an operator
      else if (tokens[i] == "+" || tokens[i] == "-" || tokens[i] == "*" || tokens[i] == "/" || tokens[i] == "d") {

        // to catch any strings missing the number of dice to roll. eg: 'd20'
        if (tokens[i] == "d" && (!tokens[i - 1] || (tokens[i - 1] < "0" || tokens[i - 1] > "9"))) values.push(1);

        // while the top of operations has the same or greater precedence to the current token, apply the operator on top of the operations stack to the top two elements in the values stack
        while (ops.length && this.getPrecedence(tokens[i]) <= this.getPrecedence(ops[ops.length - 1])) {
          values.push(this.operations[ops.pop()].apply(values.pop(), values.pop(), rolls));
        }
        // push current token to operations
        ops.push(tokens[i])
      }
      else {
        throw new Error("Invalid Dice String")
      }
    }

    // entire string has been parsed at this point.  finish applying remaining operations
    while (ops.length) {
      // console.log(operations)
      values.push(this.operations[ops.pop()].apply(values.pop(), values.pop(), rolls));
    }
    return { "roll_string": diceString, "total": values.pop(), "dice_rolls": rolls };
  }

  // returns a value based on the order of operations
  // dice rolls     ⇨    ( )     ⇨    / *     ⇨    + -
  getPrecedence(op: string): number {
    return this.operations[op] ? this.operations[op].precedence : 0;
  }

  // apply(op: string, val1: number, val2: number, diceRolls: number[]): number {
  //   return this.oper8s[op].apply(val1, val2, diceRolls);
  //   // switch (op) {
  //   //   case "+": return val2 + val1;
  //   //   case "-": return val2 - val1;
  //   //   case "*": return val2 * val1;
  //   //   case "/": {
  //   //     if (val1 == 0) {
  //   //       throw new Error("Dividing by ZERO!!");
  //   //     }
  //   //     return val2 / val1;
  //   //   }
  //   //   case "d": {
  //   //     let sum = 0;
  //   //     for (let i = 0; i < val2; i++) {
  //   //       let roll = Math.ceil(Math.random() * val1);
  //   //       // console.log(roll);
  //   //       diceRolls.push(roll);
  //   //       sum += roll;
  //   //     }
  //   //     return sum;
  //   //   }
  //   // }
  //   // return 0;
  // }





  // Old Version

  // operators: {};
  // numStack;
  // rolls;
  // rollString;
  // position;
  // length;
  // numberStack;
  // operatorStack;


  // constructor() {
  //   this.numStack = [];
  //   this.rolls = [];
  //   this.numberStack = [];
  //   this.operatorStack = [];

  //   this.operators = {
  //     '+': {
  //       precedence: 1,
  //       process: (a, b) => {
  //         return a + b;
  //       }
  //     },
  //     '-': {
  //       precedence: 1,
  //       process: (a, b) => {
  //         return a - b;
  //       }
  //     },
  //     '*': {
  //       precedence: 2,
  //       process: (a, b) => {
  //         return a * b;
  //       }
  //     },
  //     '/': {
  //       precedence: 2,
  //       process: (a, b) => {
  //         if (b === 0) {
  //           throw new Error('Division by 0');
  //         }
  //         return a / b;
  //       }
  //     },
  //     'd': {
  //       precedence: 3,
  //       process: (rolls, sides, rollsSoFar) => {
  //         if (rolls > 100) {
  //           throw new Error('Maximum roll count is 100');
  //         }

  //         let total = 0;
  //         let roll;
  //         while (rolls--) {
  //           roll = Math.floor(Math.random() * sides) + 1;

  //           total += roll;
  //           rollsSoFar.push(roll);
  //         }

  //         return total;
  //       }
  //     }
  //   }
  // }

  // parse(str: string): Object {
  //   this.rollString = str;
  //   this.tokenize();
  //   // this.executeOperations();

  //   this.rollString = str = null;

  //   return {
  //     total: this.numStack[0],
  //     rolls: this.rolls.reverse()
  //   }
  // }

  // tokenize(): void {
  //   let token;
  //   let last;

  //   while (this.position++) {

  //     if (this.rollString[this.position] === " " || this.rollString[this.position] === "\t") continue;

  //     // token = this.nextToken();

  //     if (token.type === "number") this.numberStack.push(token.value);
  //     else if (token.type === "operator") {
  //       last = this.operatorStack[this.operatorStack.length - 1];

  //       if (last && token.value === "d" && last.value === "d") {
  //         var itOnTheGround = new Error("Unexpected unchainable operator d");
  //         // itOnTheGround.column = this.position;
  //       }
  //       throw itOnTheGround;
  //     }
  //     this.operatorStack.push(token);
  //   }
  // }

  // execute() {
  //   let index;

  //   while((index = this.operatorStack.length)) {
  //     while (0 <= index--) {

  //     }
  //   }
  // }

}
