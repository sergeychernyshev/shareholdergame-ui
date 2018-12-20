class applyPriceChanges {
  static apply = state => {
    let updatedState = state;

    const priceOperations = [];

    let newPrices = state.previousPrices;

    if (state.selectedCard) {
      // apply existing price changes
      state.priceOperations.forEach((priceOperation, index) => {
        priceOperations[index] = priceOperation;
      });

      // apply price change from the card
      state.selectedCard.card.priceChangeOperations.forEach(
        (priceOperation, index) => {
          priceOperations[index] = priceOperation;
        }
      );

      newPrices = state.previousPrices.map((oldPrice, index) => {
        const priceChangeOperation = priceOperations[index];

        let newPrice = oldPrice;

        if (priceChangeOperation) {
          newPrice = priceChangeOperation.calculatePriceChange(oldPrice);
        }

        return newPrice;
      });
    }

    updatedState = {
      ...state,
      priceOperations,
      newPrices
    };

    return { updatedState, isLastRuleApplied: !state.selectedCard };
  };
}

export default applyPriceChanges;
