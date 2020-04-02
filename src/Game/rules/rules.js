import positiveBalanceAfterFirstBuySell from "./positiveBalanceAfterFirstBuySell";
import isCardSelected from "./isCardSelected";
import applyPriceChanges from "./applyPriceChanges";
import allPricesUpdated from "./allPricesUpdated";
import positiveBalanceAfterLastBuySell from "./positiveBalanceAfterLastBuySell";

const rules = [
  positiveBalanceAfterFirstBuySell,
  isCardSelected,
  applyPriceChanges,
  allPricesUpdated,
  positiveBalanceAfterLastBuySell
];

// call this method and pass it the state and updates to make
const applyRules = (state, updates) => {
  // - apply rules in sequence
  // - stop if rule marked state as invalid
  // - stop if rule declared to be last in the chain
  //   (but still valid, e.g. incomplete card assignment)
  // - turn is not complete until one of the steps sets isComplete to true
  const resultTuple = rules.reduce(
    ({ isValid = true, isLastRuleApplied = false, updatedState }, rule) => {
      let outcome = { isValid, isLastRuleApplied, updatedState };

      if (!isLastRuleApplied && isValid) {
        outcome = rule.apply(updatedState);
      }

      if (typeof outcome.isValid === "undefined") {
        outcome.isValid = true;
      }

      if (typeof outcome.isLastRuleApplied === "undefined") {
        outcome.isLastRuleApplied = false;
      }

      return outcome;
    },
    {
      isValid: true,
      isLastRuleApplied: false,
      updatedState: Object.assign({}, state, updates, {
        areAllPricesUpdated: false,
        isComplete: false
      })
    }
  );

  return resultTuple.isValid ? resultTuple.updatedState : false;
};

export default applyRules;
