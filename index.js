let numberA = 0;
let numberB = 0;
let operator = 0;
let calculation = [];
let lastValue = calculation[calculation.length - 1];
const screenResult = document.querySelector('.result');
const numbers = Array.from(document.querySelectorAll('.num'));
const operators = Array.from(document.querySelectorAll('.operator'));
const clear = document.querySelector('.clear');
const equal = document.querySelector('.equal');

const add = function(a, b) {    
    return a + b;
};  

const subtract = function(a, b) {
	return a - b;;
};

const divide = function (a, b) {
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

const operate = function(numberA, operator, numberB) {
    switch(operator){
        case '+':
        return add(numberA, numberB);
        case '-':
            return subtract(numberA, numberB);
        case '/':
            return divide(numberA, numberB);
        case 'x':
            return multiply(numberA, numberB);
        case '**':
            return power(numberA, numberB);
    }
}

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

clear.addEventListener('click', function(){
    calculation = [];
    lastValue = calculation[calculation.length - 1];
    screenResult.textContent = calculation;
})
const getResult = function() {
    while (calculation.length >= 2) {
        if (calculation.includes('x')) {
            let indexX = calculation.indexOf('x');
            let numberA = Number(calculation[indexX - 1]);
            let operator = calculation[indexX];
            let numberB = Number(calculation[indexX + 1]);
            let result = operate(numberA, operator, numberB);
            calculation.splice(indexX - 1, 3, result); 
        } else if (calculation.includes('/')) { 
            let indexDivide = calculation.indexOf('/');
            let numberA = Number(calculation[indexDivide - 1]);
            let operator = calculation[indexDivide];
            let numberB = Number(calculation[indexDivide + 1]);
            let result = operate(numberA, operator, numberB);
            calculation.splice(indexDivide - 1, 3, result);
        } else {
            let numberA = Number(calculation[0]);
            let operator = calculation[1];
            let numberB = Number(calculation[2]);
            let result = operate(numberA, operator, numberB);
            calculation.splice(0, 3, result);
        }
    }
    screenResult.textContent = calculation.join(' ');
}

equal.addEventListener('click', function(){
    getResult();
})

