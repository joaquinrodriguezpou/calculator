// 1

const add = function(a, b) {    
    return a + b;
};  

const subtract = function(a, b) {
	return a - b;;
};

// deleted sum function

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
let calculation = [];
let lastValue = calculation[calculation.length - 1];

// let operatorPressed = [];
// let lastDigit = screenResult.textContent.slice(-1);

//

// 3

const operate = function(numberA, operator, numberB) {
    switch(operator){
        case '+':
        return add(numberA, numberB);
        case '-':
            return subtract(numberA, numberB);
        case '/':
            return divide(numberA, numberB);
        case '*':
            return multiply(numberA, numberB);
        case '**':
            return power(numberA, numberB);
    }
}

// 5

const screenResult = document.querySelector('.result');
const numbers = Array.from(document.querySelectorAll('.num'));

numbers.forEach(item => item.addEventListener('click', function(event){
        if(!isNaN(lastValue)){
            lastValue = Number(lastValue.toString() + event.target.textContent.toString());
            calculation[calculation.length - 1] = lastValue;
        }
        if(isNaN(lastValue)){
            calculation.push(Number(event.target.textContent));
            lastValue = (Number(event.target.textContent));
        };
        screenResult.textContent = calculation.join(' ');
        
}))

// 6

const operators = Array.from(document.querySelectorAll('.operator'));
operators.forEach(operator => operator.addEventListener('click', function(event){
    if(!isNaN(lastValue)){
        lastValue = event.target.textContent;
        calculation.push(lastValue);
    }
    if(isNaN(lastValue)){
        lastValue = event.target.textContent;
        calculation[calculation.length - 1] = lastValue;
    };
    screenResult.textContent = calculation.join(' ');
}))

// clear calculation

clear = document.querySelector('.clear');
clear.addEventListener('click', function(){
    calculation = [];
    lastValue = calculation[calculation.length - 1];
    screenResult.textContent = calculation;
})


// showing results

