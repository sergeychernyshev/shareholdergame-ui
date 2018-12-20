class allPricesUpdated {
  static apply = state => {
    let numberOfPriceChanges = 0;

    state.priceOperations.forEach(() => {
      numberOfPriceChanges += 1;
    });

    return {
      // hard code until we have UI for setting prices
      updatedState: {
        ...state,
        areAllPricesUpdated: numberOfPriceChanges === 2
      },
      isLastRuleApplied: numberOfPriceChanges <= 1
    };
  };
}

export default allPricesUpdated;
