import React from "react";

import PriceOperation from "./PriceOperation";
import SmallCardLabel from "./SmallCardLabel";
import Card from "./Card";

const positiveOperationIds = [];
const positiveOperationOppositeIds = [];
positiveOperationIds[60] = 2; // +60
positiveOperationIds[50] = 3; // +50
positiveOperationIds[40] = 4; // +40
positiveOperationIds[30] = 5; // +30
positiveOperationOppositeIds[60] = 9; // -30
positiveOperationOppositeIds[50] = 8; // -40
positiveOperationOppositeIds[40] = 7; // -50
positiveOperationOppositeIds[30] = 6; // -60

const negativeOperationIds = [];
const negativeOperationOppositeIds = [];
negativeOperationIds[60] = 6; // -60
negativeOperationIds[50] = 7; // -50
negativeOperationIds[40] = 8; // -40
negativeOperationIds[30] = 9; // -30
negativeOperationOppositeIds[60] = 5; // +30
negativeOperationOppositeIds[50] = 4; // +40
negativeOperationOppositeIds[40] = 3; // +50
negativeOperationOppositeIds[30] = 2; // +60

class SmallCard extends Card {
  constructor({ color, value }) {
    super({ color });

    this.value = value;
    this.cardHTML = this.value > 0 ? `+${this.value}` : `${this.value}`;

    this.oppositeValue = this.value > 0 ? this.value - 70 : 70 + this.value;
    this.oppositeHTML =
      this.oppositeValue > 0
        ? `+${this.oppositeValue}`
        : `${this.oppositeValue}`;

    const primaryOperationId =
      this.value > 0
        ? positiveOperationIds[this.value]
        : negativeOperationIds[-this.value];
    this.primaryPriceOperation = PriceOperation.getById(primaryOperationId);

    const oppositeOperationId =
      this.value > 0
        ? positiveOperationOppositeIds[this.value]
        : negativeOperationOppositeIds[-this.value];
    this.oppositePriceOperation = PriceOperation.getById(oppositeOperationId);

    this.priceChangeOperations = [];
    this.priceChangeOperations[this.color.index] = this.primaryPriceOperation;
  }

  getCardLabel = operationIds => (
    <SmallCardLabel card={this} operationIds={operationIds} />
  );

  getSortOrder() {
    return super.getSortOrder() + this.value / 10 + 6;
  }

  static calculatePriceChange(price) {
    return price + this.value;
  }
}

export default SmallCard;
