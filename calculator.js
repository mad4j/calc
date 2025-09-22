class ScientificCalculator {
    constructor() {
        this.expression = '';
        this.result = '0';
        this.history = [];
        this.historyIndex = -1;
        this.lastResult = 0;
        this.isNewCalculation = true;
        
        this.initializeElements();
        this.bindEvents();
        this.updateDisplay();
    }

    initializeElements() {
        this.expressionDisplay = document.getElementById('expression');
        this.resultDisplay = document.getElementById('result');
        this.prevBtn = document.getElementById('prev-result');
        this.nextBtn = document.getElementById('next-result');
        this.display = document.querySelector('.display');
    }

    bindEvents() {
        // Number buttons
        document.querySelectorAll('.btn.number').forEach(btn => {
            btn.addEventListener('click', () => this.inputNumber(btn.dataset.num));
        });

        // Operator buttons
        document.querySelectorAll('.btn.operator').forEach(btn => {
            btn.addEventListener('click', () => this.inputOperator(btn.dataset.op));
        });

        // Function buttons
        document.querySelectorAll('.btn.function').forEach(btn => {
            btn.addEventListener('click', () => this.inputFunction(btn.dataset.func));
        });

        // Special buttons
        document.getElementById('equals').addEventListener('click', () => this.calculate());
        document.getElementById('clear').addEventListener('click', () => this.clear());
        document.getElementById('delete').addEventListener('click', () => this.deleteLast());

        // History navigation
        this.prevBtn.addEventListener('click', () => this.navigateHistory(-1));
        this.nextBtn.addEventListener('click', () => this.navigateHistory(1));

        // Keyboard support
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }

    inputNumber(num) {
        if (this.isNewCalculation) {
            this.expression = '';
            this.isNewCalculation = false;
        }
        
        this.expression += num;
        this.updateDisplay();
    }

    inputOperator(op) {
        if (this.isNewCalculation && this.lastResult !== null) {
            this.expression = this.lastResult.toString();
            this.isNewCalculation = false;
        }
        
        // Replace display symbols with calculation symbols
        const calcOp = this.getCalculationOperator(op);
        this.expression += calcOp;
        this.updateDisplay();
    }

    inputFunction(func) {
        if (this.isNewCalculation) {
            this.expression = '';
            this.isNewCalculation = false;
        }

        switch (func) {
            case 'sin':
            case 'cos':
            case 'tan':
            case 'log':
            case 'ln':
            case 'sqrt':
                this.expression += `${func}(`;
                break;
            case 'pow':
                this.expression += '^2';
                break;
            case 'pi':
                this.expression += 'π';
                break;
            case 'e':
                this.expression += 'e';
                break;
            case 'fact':
                this.expression += '!';
                break;
            case '1/x':
                this.expression += '1/(';
                break;
            case 'ans':
                this.expression += this.lastResult || '0';
                break;
        }
        this.updateDisplay();
    }

    getCalculationOperator(displayOp) {
        const operatorMap = {
            '×': '*',
            '÷': '/',
            '−': '-',
            '^': '**'
        };
        return operatorMap[displayOp] || displayOp;
    }

    getDisplayOperator(calcOp) {
        const displayMap = {
            '*': '×',
            '/': '÷',
            '-': '−',
            '**': '^'
        };
        return displayMap[calcOp] || calcOp;
    }

    calculate() {
        if (!this.expression) return;

        try {
            const result = this.evaluateExpression(this.expression);
            
            // Add to history
            this.history.unshift({
                expression: this.formatDisplayExpression(this.expression),
                result: result
            });
            
            // Limit history size
            if (this.history.length > 50) {
                this.history = this.history.slice(0, 50);
            }
            
            this.lastResult = result;
            this.result = this.formatNumber(result);
            this.historyIndex = -1;
            this.isNewCalculation = true;
            
            this.updateDisplay();
            this.updateHistoryButtons();
            
        } catch (error) {
            this.result = 'Errore';
            this.resultDisplay.classList.add('error');
            setTimeout(() => {
                this.resultDisplay.classList.remove('error');
            }, 2000);
        }
    }

    evaluateExpression(expr) {
        // Replace mathematical constants and functions
        let processedExpr = expr
            .replace(/π/g, Math.PI)
            .replace(/e(?![0-9])/g, Math.E)
            .replace(/sin\(/g, 'Math.sin(')
            .replace(/cos\(/g, 'Math.cos(')
            .replace(/tan\(/g, 'Math.tan(')
            .replace(/log\(/g, 'Math.log10(')
            .replace(/ln\(/g, 'Math.log(')
            .replace(/sqrt\(/g, 'Math.sqrt(')
            .replace(/(\d+)!/g, (match, n) => this.factorial(parseInt(n)))
            .replace(/\^/g, '**');

        // Handle percentage
        processedExpr = processedExpr.replace(/(\d+(?:\.\d+)?)%/g, '($1/100)');

        return Function(`"use strict"; return (${processedExpr})`)();
    }

    factorial(n) {
        if (n < 0) throw new Error('Factorial of negative number');
        if (n === 0 || n === 1) return 1;
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }

    formatNumber(num) {
        if (!isFinite(num)) return 'Errore';
        
        // Handle very large or very small numbers
        if (Math.abs(num) >= 1e10 || (Math.abs(num) < 1e-6 && num !== 0)) {
            return num.toExponential(6);
        }
        
        // Remove trailing zeros and unnecessary decimal point
        return parseFloat(num.toFixed(10)).toString();
    }

    formatDisplayExpression(expr) {
        return expr
            .replace(/\*/g, '×')
            .replace(/\//g, '÷')
            .replace(/-/g, '−')
            .replace(/\*\*/g, '^');
    }

    clear() {
        this.expression = '';
        this.result = '0';
        this.isNewCalculation = true;
        this.updateDisplay();
    }

    deleteLast() {
        if (this.isNewCalculation) {
            this.expression = '';
            this.isNewCalculation = false;
        }
        
        this.expression = this.expression.slice(0, -1);
        if (this.expression === '') {
            this.result = '0';
        }
        this.updateDisplay();
    }

    navigateHistory(direction) {
        if (this.history.length === 0) return;
        
        const newIndex = this.historyIndex + direction;
        
        if (newIndex >= -1 && newIndex < this.history.length) {
            this.historyIndex = newIndex;
            
            if (this.historyIndex === -1) {
                // Current calculation
                this.updateDisplay();
            } else {
                // Historical calculation
                const historyItem = this.history[this.historyIndex];
                this.expressionDisplay.textContent = historyItem.expression;
                this.resultDisplay.textContent = this.formatNumber(historyItem.result);
            }
            
            this.updateHistoryButtons();
        }
    }

    updateHistoryButtons() {
        this.prevBtn.disabled = this.historyIndex >= this.history.length - 1;
        this.nextBtn.disabled = this.historyIndex <= -1;
        
        // Add history indicator
        if (this.history.length > 0) {
            this.display.classList.add('has-history');
        } else {
            this.display.classList.remove('has-history');
        }
    }

    updateDisplay() {
        this.expressionDisplay.textContent = this.formatDisplayExpression(this.expression);
        this.resultDisplay.textContent = this.result;
        this.updateHistoryButtons();
    }

    handleKeyboard(event) {
        const key = event.key;
        
        // Prevent default for calculator keys
        if (key.match(/[0-9+\-*/=.()%]/) || key === 'Enter' || key === 'Escape' || key === 'Backspace') {
            event.preventDefault();
        }
        
        if (key >= '0' && key <= '9') {
            this.inputNumber(key);
        } else if (key === '+') {
            this.inputOperator('+');
        } else if (key === '-') {
            this.inputOperator('−');
        } else if (key === '*') {
            this.inputOperator('×');
        } else if (key === '/') {
            this.inputOperator('÷');
        } else if (key === '.') {
            this.inputOperator('.');
        } else if (key === '(' || key === ')') {
            this.inputOperator(key);
        } else if (key === '%') {
            this.inputOperator('%');
        } else if (key === 'Enter' || key === '=') {
            this.calculate();
        } else if (key === 'Escape') {
            this.clear();
        } else if (key === 'Backspace') {
            this.deleteLast();
        } else if (key === 'ArrowUp') {
            this.navigateHistory(1);
        } else if (key === 'ArrowDown') {
            this.navigateHistory(-1);
        }
    }
}

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ScientificCalculator();
});