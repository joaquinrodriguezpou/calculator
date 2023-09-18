let numberA = 0;
let numberB = 0;
let operator = 0;
let calculation = [];
let lastValue = calculation[calculation.length - 1];

const numbers = Array.from(document.querySelectorAll('.num'));
const operators = Array.from(document.querySelectorAll('.operator'));
const clear = document.querySelector('.clear');
const backSpace = document.querySelector('.backSpace');
const equal = document.querySelector('.equal');
const mainResult = document.querySelector('.main');
const secondaryResult = document.querySelector('.secondary');
mainResult.textContent = '0';

function add(a, b) {
    return a + b;
}  

const subtract = function(a, b) {
	return a - b;
};

const divide = function (a, b) {
    if (b === 0) {
        return "Division by zero? are you kidding?";
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
        let input = event.target.textContent;
        if (input === '.') {
            calculation[calculation.length - 1] = Number(lastValue.toString() + input.toString());
        }
        if(!isNaN(lastValue)){
            calculation[calculation.length - 1] = Number(lastValue.toString() + input.toString());
        }
        if(isNaN(lastValue)){
            calculation.push(Number(input));
        };
        lastValue = calculation[calculation.length - 1];
        mainResult.textContent = lastValue;
}))

operators.forEach(operator => operator.addEventListener('click', function(event){
    if(!isNaN(lastValue)){
        calculation.push(event.target.textContent);
    }
    if(isNaN(lastValue)){
        calculation[calculation.length - 1] = event.target.textContent;
    };
    secondaryResult.textContent = calculation.join(' ');
    lastValue = calculation[calculation.length - 1];
}))

clear.addEventListener('click', function(){
    calculation = [];
    calculationCopy = [];
    lastValue = calculation[calculation.length - 1];
    secondaryResult.textContent = '';
    mainResult.textContent = '0';
})

backSpace.addEventListener('click', function(){
    calculation.pop();
    if(calculation.length === 0){    
        lastValue = '';
        secondaryResult.textContent = '';  
    }
    else{
        lastValue = calculation[calculation.length - 1];
        secondaryResult.textContent = calculation.join(' ');
    }
    mainResult.textContent = '0';
})

const getResult = function() {
    let calculationCopy = calculation.slice();
    while (calculationCopy.length >= 2) {
        if (calculationCopy.includes('x')) {
            let indexX = calculationCopy.indexOf('x');
            let numberA = Number(calculationCopy[indexX - 1]);
            let operator = calculationCopy[indexX];
            let numberB = Number(calculationCopy[indexX + 1]);
            let result = operate(numberA, operator, numberB);
            calculationCopy.splice(indexX - 1, 3, result); 
        } else if (calculationCopy.includes('/')) { 
            let indexDivide = calculationCopy.indexOf('/');
            let numberA = Number(calculationCopy[indexDivide - 1]);
            let operator = calculationCopy[indexDivide];
            let numberB = Number(calculationCopy[indexDivide + 1]);
            let result = operate(numberA, operator, numberB);
            calculationCopy.splice(indexDivide - 1, 3, result);
        } else {
            let numberA = Number(calculationCopy[0]);
            let operator = calculationCopy[1];
            let numberB = Number(calculationCopy[2]);
            let result = operate(numberA, operator, numberB);
            calculationCopy.splice(0, 3, result);
        }
    }
    mainResult.textContent = calculationCopy;
    secondaryResult.textContent = calculation.join(' ') + ' =';
}

equal.addEventListener('click', function(){
    if (!isNaN(lastValue)){
    getResult();
    }
})