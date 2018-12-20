import React from "react";

import SmallCardLabel from "./SmallCardLabel";
import Card from "./Card";

class SmallCard extends Card {
  constructor({ color, primaryPriceOperation, oppositePriceOperation }) {
    super({ color });

    this.value = primaryPriceOperation.value;
    this.cardHTML = (this.value > 0 ? "+" : "") + this.value;

    this.oppositeValue = oppositePriceOperation.value;
    this.oppositeHTML =
      (this.oppositeValue > 0 ? "+" : "") + this.oppositeValue;

    this.primaryPriceOperation = primaryPriceOperation;
    this.oppositePriceOperation = oppositePriceOperation;

    this.priceChangeOperations = [];
    this.priceChangeOperations[this.color.index] = primaryPriceOperation;
  }

  getCardLabel = operationIds => (
    <SmallCardLabel card={this} operationIds={operationIds} />
  );

  getSortOrder() {
    return super.getSortOrder() + this.value / 10 + 6;
  }
}

export default SmallCard;
