const calculator = document.querySelector('.container');
const display = calculator.querySelector('.result-box')
const btns = calculator.querySelector('.buttons')
btns.addEventListener('click', (e)=>{
const btn = e.target;
let  btnValue = btn.textContent;
let displayValue = display.textContent;

const type = btn.dataset.type
const previousKeyType = calculator.dataset.previousKeyType;

if(btn.dataset.type ==="number"){
    if(displayValue === "0" || previousKeyType === "operator" || previousKeyType === 'equal' ){
        display.textContent = btnValue;
    }
    else {
        display.textContent = displayValue + btnValue;
    }

}

if(btn.dataset.type === "decimal"){

 if(!displayValue.includes('.')){

display.textContent = displayValue + ".";
    }
 if(previousKeyType === "operator" || previousKeyType === 'equal'){
        console.log("previouskey was an operator/equal");
        display.textContent = "0."
    }
 
    calculator.dataset.previousKeyType = type
}

if(btn.dataset.type === "operator"){
 operatorBtns = calculator.querySelectorAll('[data-type="operator"]');
    operatorBtns.forEach((item)=>item.dataset.state = "")
    btn.dataset.state = "selected"

const firstNum = calculator.dataset.firstNumber;
const action = calculator.dataset.operator;
const secondNum = displayValue

console.log(firstNum);
console.log(secondNum);
console.log(action);
console.log(previousKeyType);

if(firstNum && action && previousKeyType !== 'operator' && previousKeyType !== 'equal'){
    const calcValue = calculate(firstNum, action, secondNum)
     display.textContent = calcValue;
    //  update calculated value as first value

     calculator.dataset.firstNumber = calcValue;
    console.log(calcValue);
}
else{

    // save the firstnumber as the display nuum
    calculator.dataset.firstNumber = displayValue
}

    // to save the firstnumber and operator

    
     calculator.dataset.operator = btn.dataset.action
} 

if(btn.dataset.type === "equal"){
let firstNum = calculator.dataset.firstNumber
const action = calculator.dataset.operator
let secondNum = displayValue

// let result = ""
// if(action === 'plus') result = firstNum + secondNum
// if(action === 'minus') result = firstNum - secondNum
// if(action === 'multiply') result = firstNum * secondNum
// if(action === 'divide') result = firstNum / secondNum
btn.dataset.state = ""
if (firstNum){
  if(previousKeyType === 'equal'){
      console.log("just hitted the equal sign");
      firstNum = displayValue
      secondNum = calculator.dataset.modValue

  }
    display.textContent = calculate(firstNum, action, secondNum)
}
console.log(firstNum, action, secondNum);
// customer atttr for second number to store itss value
calculator.dataset.modValue = secondNum

}

const clearBtn = calculator.querySelector('[data-type=clear]');


if(btn.dataset.type === "clear"){
    if(btnValue === 'AC'){
        calculator.dataset.firstNumber = ''
        calculator.dataset.operator = ''
        calculator.dataset.modValue = ''
        calculator.dataset.previousKeyType = ''
    }
    else{
        btnValue = "AC"
    }
    display.textContent = '0'
    clearBtn.textContent = 'AC'
}
 if(btn.dataset.type === 'delete'){
     console.log('item deleted');
     display.textContent = '0';
 }

// Next, we want to update the display to the clicked key. Before we do this, we need a way to tell if the previous key is an operator key.

// call a custom attribute 

calculator.dataset.previousKeyType = type


})

































function calculate(firstNum, action, secondNum){
    let result = ""
    if(action === 'plus') result = parseFloat(firstNum) + parseFloat(secondNum)
    if(action === 'minus') result = parseFloat(firstNum) - parseFloat(secondNum)
    if(action === 'multiply') result = parseFloat(firstNum) * parseFloat(secondNum)
    if(action === 'divide') result = parseFloat(firstNum) / parseFloat(secondNum)
    return result
}