
let currentOperand = '';
let previousOperand = '';
let operation = null;


const currentOperandElement = document.getElementById('current-operand');
const previousOperandElement = document.getElementById('previous-operand');


function updateDisplay() {
    currentOperandElement.textContent = currentOperand || '0';
    if (operation != null) {
        previousOperandElement.textContent = `${previousOperand} ${operation}`;
    } else {
        previousOperandElement.textContent = previousOperand;
    }
}


function appendNumber(number) {
  
    if (number === '.' && currentOperand.includes('.')) return;
    
   
    if (currentOperand.length >= 12) return;
    
    currentOperand = currentOperand.toString() + number.toString();
    updateDisplay();
}


function setOperator(operator) {
    if (currentOperand === '') return;
    
    if (previousOperand !== '') {
        calculate();
    }
    
    operation = operator;
    previousOperand = currentOperand;
    currentOperand = '';
    updateDisplay();
}


function calculate() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    
    if (isNaN(prev) || isNaN(current)) return;
    
    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '×':
            computation = prev * current;
            break;
        case '÷':
            if (current === 0) {
                alert('Cannot divide by zero!');
                clearAll();
                return;
            }
            computation = prev / current;
            break;
        default:
            return;
    }
    
   
    currentOperand = Math.round(computation * 100000000) / 100000000;
    
   
    if (currentOperand.toString().length > 12) {
        currentOperand = currentOperand.toExponential(6);
    }
    
    operation = null;
    previousOperand = '';
    updateDisplay();
}


function clearAll() {
    currentOperand = '';
    previousOperand = '';
    operation = null;
    updateDisplay();
}


function deleteLast() {
    currentOperand = currentOperand.toString().slice(0, -1);
    updateDisplay();
}

// Calculate percentage
function percentage() {
    if (currentOperand === '') return;
    const current = parseFloat(currentOperand);
    currentOperand = current / 100;
    updateDisplay();
}

// Keyboard support
document.addEventListener('keydown', function(event) {
    // Numbers and decimal point
    if ((event.key >= '0' && event.key <= '9') || event.key === '.') {
        appendNumber(event.key);
    }
    
    // Operators
    if (event.key === '+') setOperator('+');
    if (event.key === '-') setOperator('-');
    if (event.key === '*') setOperator('×');
    if (event.key === '/') {
        event.preventDefault(); // Prevent browser search
        setOperator('÷');
    }
    
    // Calculate
    if (event.key === 'Enter' || event.key === '=') {
        event.preventDefault();
        calculate();
    }
    
    // Delete
    if (event.key === 'Backspace') {
        event.preventDefault();
        deleteLast();
    }
    
    // Clear
    if (event.key === 'Escape') {
        clearAll();
    }
    
    // Percentage
    if (event.key === '%') {
        percentage();
    }
});

// Initialize display
updateDisplay();