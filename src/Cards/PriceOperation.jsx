const allPriceOperations = [];

class PriceOperation {
  constructor(id, value, operation) {
    this.id = id;
    this.value = value;
    this.operation = operation;

    allPriceOperations[id] = this;
  }

  calculatePriceChange(price) {
    return this.operation ? this.operation(price) : price + this.value;
  }

  static getById(id) {
    return allPriceOperations[id];
  }
}

export const HUNDRED = new PriceOperation(1, 100);
export const PLUS_60 = new PriceOperation(2, 60);
export const PLUS_50 = new PriceOperation(3, 50);
export const PLUS_40 = new PriceOperation(4, 40);
export const PLUS_30 = new PriceOperation(5, 30);
export const MINUS_60 = new PriceOperation(6, -60);
export const MINUS_50 = new PriceOperation(7, -50);
export const MINUS_40 = new PriceOperation(8, -40);
export const MINUS_30 = new PriceOperation(9, -30);
export const MINUS_20 = new PriceOperation(10, -20);
export const MINUS_10 = new PriceOperation(11, -10);
export const MULTIPLY_BY_2 = new PriceOperation(12, null, price => price * 2);
export const DIVIDE_BY_2 = new PriceOperation(13, null, price => price / 2);

export default PriceOperation;
