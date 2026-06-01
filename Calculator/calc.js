const displayScreen = document.querySelector(".display");
const calcButtons = document.querySelectorAll(".calculator button");

let firstNumber = "";
let secondNumber = "";
let operator = "";

calcButtons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent;

        switch (value) {

            // ---------------- OPERATORS ----------------
            case "+":
            case "-":
            case "×":
            case "÷":
                if (firstNumber !== "") {
                    operator = value; 
                    displayScreen.textContent = `${firstNumber} ${operator} `;
                }
                break;

            // ---------------- EQUALS ----------------
            case "=":
                if (firstNumber !== "" && secondNumber !== "" && operator !== "") {

                    const num1 = Number(firstNumber);
                    const num2 = Number(secondNumber);

                    let result;

                    switch (operator) {
                        case "+":
                            result = num1 + num2;
                            break;
                        case "-":
                            result = num1 - num2;
                            break;
                        case "×":
                            result = num1 * num2;
                            break;
                        case "÷":
                            result = num2 === 0 ? "Error" : num1 / num2;
                            break;
                    }

                    displayScreen.textContent = result;

                    // allow chaining
                    firstNumber = result.toString();
                    secondNumber = "";
                    operator = "";
                }
                break;

            // ---------------- CLEAR EVERYTHING (C) ----------------
            case "C":
                firstNumber = "";
                secondNumber = "";
                operator = "";
                displayScreen.textContent = "0";
                break;

            // ---------------- CLEAR ENTRY (CE) ----------------
            case "CE":
                if (operator === "") {
                    // clearing first number only
                    firstNumber = "";
                    displayScreen.textContent = "";
                } else {
                    // clearing second number only
                    secondNumber = "";
                    displayScreen.textContent = `${firstNumber} ${operator} `;
                }
                break;

            // ---------------- NUMBERS ----------------
            default:
                if (operator === "") {
                    firstNumber += value;
                    displayScreen.textContent = firstNumber;
                } else {
                    secondNumber += value;
                    displayScreen.textContent = `${firstNumber} ${operator} ${secondNumber}`;
                }
        }

        console.log({ firstNumber, operator, secondNumber });
    });
});