export class RangeSlider {
    constructor(rangeElement, valueElement, symbol = '', background = '#000') {
        this.rangeElement = rangeElement;
        this.valueElement = valueElement;
        this.symbol = symbol;
        this.background = background;
        this.step = parseFloat(this.rangeElement.getAttribute('step')) || 1;
        this.rangeElement.addEventListener('input', this.updateSlider.bind(this));
        this.valueElement.addEventListener('input', this.updateValue.bind(this));
        this.init();
    }
    init() {this.updateSlider();}
    asSymbol(value, symbol) {return symbol + value;}
    generateBackground(rangeElement) {
        if (this.rangeElement.value === this.min) {return;}
  
        let percentage = (this.rangeElement.value - this.rangeElement.min) / (this.rangeElement.max - this.rangeElement.min) * 100;
        return `background: linear-gradient(to right, ${this.background}, ${this.background} ${percentage}%, transparent ${percentage}%, transparent 100%)`;
    }
    updateSlider() {
        const valueWithSymbol = this.asSymbol(this.rangeElement.value, this.symbol);
        this.valueElement.value = valueWithSymbol;
        this.rangeElement.setAttribute('value', this.rangeElement.value);
        this.rangeElement.style = this.generateBackground(this.rangeElement.value);
    }
    updateValue() {
        let newValue = parseFloat(this.valueElement.value.replace(this.symbol, '').trim());
        if (isNaN(newValue) || newValue === '') {newValue = this.rangeElement.min;}
        this.rangeElement.value = newValue;
        this.updateSlider();
    }
  }
  
