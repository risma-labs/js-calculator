const add = function () {
  return arguments[0] + arguments[1];
};

const subtract = function () {
  return arguments[0] - arguments[1];
};

const multiply = function () {
  return arguments[0] * arguments[1];
};

const divide = function () {
  return arguments[0] / arguments[1];
};

const operate = (operator, prevNum, currentNum) => {
  switch (operator) {
    case '+':
      return add(prevNum, currentNum);
      break;
    case '-':
      return subtract(prevNum, currentNum);
      break;
    case '*':
      return multiply(prevNum, currentNum);
      break;
    case '/':
      return divide(prevNum, currentNum);
      break;
  };
};

const digits = document.querySelectorAll(".keypad-button");
const operators = document.querySelectorAll(".operator");
const displayOperator = document.querySelector("#operator-display");
const displayNum = document.querySelector("#calc-number-display");
const clearButton = document.querySelector("#clear");
const undoButton = document.querySelector("#undo");
const equalsButton = document.querySelector("#equals");
const pointButton = document.querySelector("#point");
let currentOperator = '+',
  prevNum = 0,
  currentNum = 0;

digits.forEach(button => button.addEventListener("click", (e) => {

  if (displayNum.innerText.length < 15) {
    if (displayNum.innerText != '0') {
      displayNum.innerText += e.target.innerText;
    } else {
      displayNum.innerText = e.target.innerText;
    };
  };

}));

clearButton.addEventListener("click", () => {
  displayNum.innerText = "0";
  displayOperator.innerText = "";
  currentNum = 0;
  prevNum = 0;
});

operators.forEach(button => button.addEventListener("click", (e) => {
  currentOperator = e.target.innerText;
  prevNum = displayNum.innerText;
  displayOperator.innerText = prevNum + " " + currentOperator;
  displayNum.innerText = "0";
}));

equalsButton.addEventListener("click", () => {
  currentNum = displayNum.innerText;
  let answer = operate(currentOperator, Number(prevNum), Number(currentNum));
  if (Number(answer) > 999999999999) {
    answer = Number(answer).toExponential(3);
  }
  if (String(answer).length > 12) {
    answer = String(answer).slice(0, 12);
  };
  displayOperator.innerText = "";
  displayNum.innerText = answer;
});

const addPoint = () => {
  if (!displayNum.innerText.includes(".")) {
    displayNum.innerText += ".";
  };
};

pointButton.addEventListener("click", () => addPoint());

undoButton.addEventListener("click", () => {
  displayNum.innerText = prevNum;
  displayOperator.innerText = "";
  currentNum = 0;
  prevNum = 0;
})