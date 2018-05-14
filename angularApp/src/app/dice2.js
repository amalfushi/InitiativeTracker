class DiceParser {
    constructor() {
        // rolls = [];
    }

    evaluate(diceString) {
        // convert to lower case, trim of any excess whitespace, replace any repeated 'd's with a single, and convert to an array of characters
        let tokens = diceString.toLowerCase().trim().replace(/[d]+/g, 'd').split("");

        //substitutes for stacks
        let values = [];
        let operations = [];
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
                operations.push(tokens[i])
            }

            // closing brace encountered, solve everything inside;
            else if (tokens[i] === ")") {
                while (operations[operations.length - 1] != "(") {
                    values.push(this.apply(operations.pop(), values.pop(), values.pop(), rolls));
                }
                operations.pop();
            }

            // current token is an operator
            else if (tokens[i] == "+" || tokens[i] == "-" || tokens[i] == "*" || tokens[i] == "/" || tokens[i] == "d") {

                // to catch any strings missing the number of dice to roll. eg: 'd20'
                if (tokens[i] == "d" && (!tokens[i-1] || (tokens[i-1] < "0" || tokens[i-1] > "9"))) values.push(1);

                // while the top of operations has the same or greater precedence to the current token, apply the operator on top of the operations stack to the top two elements in the values stack
                while (operations.length && this.getPrecedence(tokens[i]) <= this.getPrecedence(operations[operations.length - 1])) {
                    values.push(this.apply(operations.pop(), values.pop(), values.pop(), rolls));
                }
                // push current token to operations
                operations.push(tokens[i])
            }
            else{
                throw new Error("Invalid Dice String")
            }
        }

        // entire string has been parsed at this point.  finish applying remaining operations
        while (operations.length) {
            // console.log(operations)
            values.push(this.apply(operations.pop(), values.pop(), values.pop(), rolls))
        }
        return {"total": values.pop(), "rolls": rolls};
    }

    // returns a value based on the order of operations expected: dice => ( ) => * / => + -
    getPrecedence(op) {
        switch (op) {
            case "+": return 1;
            case "-": return 1;
            case "*": return 2;
            case "/": return 2;
            case ")": return 3;
            case "d": return 4;
        }
        return 0;
    }

    apply(op, val1, val2, diceRolls) {
        switch (op) {
            case "+": return val2 + val1;
            case "-": return val2 - val1;
            case "*": return val2 * val1;
            case "/": {
                if (val1 == 0) {
                    throw new Error("Dividing by ZERO!!");
                }
                return val2 / val1;
            }
            case "d": {
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
        return 0;
    }
}

let dc = new DiceParser();

console.log(dc.evaluate("ddddd6 + dddd4"));
console.log(dc.evaluate("d6+2d12-3"));
console.log(dc.evaluate("d6*(2d12-3)"));
console.log(dc.evaluate("d6*(2d12-3)/d4+2"));