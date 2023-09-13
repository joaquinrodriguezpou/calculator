// 1

const add = function(a, b) {    
    return a + b;
};  

const subtract = function(a, b) {
	return a - b;;
};

const sum = function(array) {
	return array.reduce((total, current) => total + current, 0);
};

function divide(a, b) {
    if (b === 0) {
        return "Division by zero is not allowed.";
    }
    return a / b;
};

const multiply = function(a, b) {
    return a * b;
};

const power = function(a, b) {
	return a ** b;
};

// 2

let numberA = 0;
let numberB = 0;
let operator = 0;

// 3

const operate = function(numberA, operator, numberB) {
    return operator(numberA, numberB);
}