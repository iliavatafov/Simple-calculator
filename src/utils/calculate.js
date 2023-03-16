export const calculate = (
  input,
  handleInput,
  hadnleResult,
  handlePreviousInput
) => {
  const tokens = input.match(/(-?\d+|\+|-|\*|\/)/g);

  if (/\+|-|\*|\//.test(tokens[tokens.length - 1])) {
    handleInput(input);
    return;
  }

  const precedence = {
    "*": 2,
    "/": 2,
    "+": 1,
    "-": 1,
  };

  const opStack = [];
  const numStack = [];

  tokens.forEach((token) => {
    if (/^-?\d+$/.test(token)) {
      numStack.push(parseFloat(token));
    } else {
      while (
        opStack.length > 0 &&
        precedence[opStack[opStack.length - 1]] >= precedence[token]
      ) {
        const op = opStack.pop();
        const b = numStack.pop();
        const a = numStack.pop();
        numStack.push(applyOp(a, b, op));
      }
      opStack.push(token);
    }
  });

  while (opStack.length > 0) {
    const op = opStack.pop();
    const b = numStack.pop();
    const a = numStack.pop();
    numStack.push(applyOp(a, b, op));
  }

  const res = numStack.pop();
  handlePreviousInput(input);
  hadnleResult(res.toString());
  handleInput(res.toString());
};

const applyOp = (a, b, op) => {
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return a / b;
    default:
      throw new Error(`Unknown operator: ${op}`);
  }
};
