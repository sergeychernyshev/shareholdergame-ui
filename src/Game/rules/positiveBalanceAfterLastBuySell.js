class positiveBalanceAfterLastBuySell {
  static apply = state => {
    const newBank =
      state.totalCapital -
      state.newPrices
        .map((price, index) => {
          let effectivePrice = price;
          if (effectivePrice < 10) {
            effectivePrice = 10;
          }
          if (effectivePrice > 250) {
            effectivePrice = 250;
          }

          return state.last[index] * effectivePrice;
        })
        .reduce((total, stockCapital) => total + stockCapital, 0);

    const updatedState = Object.assign({}, state, { bank: newBank });

    return { isValid: newBank >= 0, updatedState };
  };
}

export default positiveBalanceAfterLastBuySell;
