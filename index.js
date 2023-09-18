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
	return a - b;;
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
            lastValue = Number(lastValue.toString() + input.toString());
            calculation[calculation.length - 1] = lastValue;
        }
        if(!isNaN(lastValue)){
            lastValue = Number(lastValue.toString() + input.toString());
            calculation[calculation.length - 1] = lastValue;
        }
        if(isNaN(lastValue)){
            calculation.push(Number(input));
            lastValue = (Number(input));
        };
        secondaryResult.textContent = calculation.join(' ');
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
    secondaryResult.textContent = calculation.join(' ');
}))

clear.addEventListener('click', function(){
    calculation = [];
    lastValue = calculation[calculation.length - 1];
    secondaryResult.textContent = '';
    mainResult.textContent = '0';
})

backSpace.addEventListener('click', function(){
    calculation.pop();
    if(calculation.length === 0){    
        lastValue = '';
        secondaryResult.textContent = '0';  
    }
    else{
        lastValue = calculation[calculation.length - 1];
        secondaryResult.textContent = calculation.join(' ');
    }
})

const getResult = function() {
    let calculationCopy = calculation.slice();
    while (calculationCopy.length >= 2) {
        if (calculation.includes('x')) {
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
            let operator = calculation[1];
            let numberB = Number(calculationCopy[2]);
            let result = operate(numberA, operator, numberB);
            calculationCopy.splice(0, 3, result);
        }
    }
    mainResult.textContent = calculationCopy;
}

equal.addEventListener('click', function(){
    if (!isNaN(lastValue)){
    getResult();
    }
})

