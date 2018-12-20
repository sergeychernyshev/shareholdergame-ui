import { BLUE, RED, YELLOW, GREEN } from "./CardColor";

import SmallCard from "./SmallCard";

import {
  PLUS_60,
  PLUS_50,
  PLUS_40,
  PLUS_30,
  MINUS_60,
  MINUS_50,
  MINUS_40,
  MINUS_30
} from "./PriceOperation";

class SmallDeck {
  constructor() {
    this.smallCards = [];
    // +30 & -60
    this.smallCards[13] = new SmallCard({
      color: BLUE,
      primaryPriceOperation: PLUS_30,
      oppositePriceOperation: MINUS_60
    });
    this.smallCards[14] = new SmallCard({
      color: BLUE,
      primaryPriceOperation: MINUS_60,
      oppositePriceOperation: PLUS_30
    });
    this.smallCards[15] = new SmallCard({
      color: RED,
      primaryPriceOperation: PLUS_30,
      oppositePriceOperation: MINUS_60
    });
    this.smallCards[16] = new SmallCard({
      color: RED,
      primaryPriceOperation: MINUS_60,
      oppositePriceOperation: PLUS_30
    });
    this.smallCards[17] = new SmallCard({
      color: YELLOW,
      primaryPriceOperation: PLUS_30,
      oppositePriceOperation: MINUS_60
    });
    this.smallCards[18] = new SmallCard({
      color: YELLOW,
      primaryPriceOperation: MINUS_60,
      oppositePriceOperation: PLUS_30
    });
    this.smallCards[19] = new SmallCard({
      color: GREEN,
      primaryPriceOperation: PLUS_30,
      oppositePriceOperation: MINUS_60
    });
    this.smallCards[20] = new SmallCard({
      color: GREEN,
      primaryPriceOperation: MINUS_60,
      oppositePriceOperation: PLUS_30
    });

    // +40 & -50
    this.smallCards[21] = new SmallCard({
      color: BLUE,
      primaryPriceOperation: PLUS_40,
      oppositePriceOperation: MINUS_50
    });
    this.smallCards[22] = new SmallCard({
      color: BLUE,
      primaryPriceOperation: MINUS_50,
      oppositePriceOperation: PLUS_40
    });
    this.smallCards[23] = new SmallCard({
      color: RED,
      primaryPriceOperation: PLUS_40,
      oppositePriceOperation: MINUS_50
    });
    this.smallCards[24] = new SmallCard({
      color: RED,
      primaryPriceOperation: MINUS_50,
      oppositePriceOperation: PLUS_40
    });
    this.smallCards[25] = new SmallCard({
      color: YELLOW,
      primaryPriceOperation: PLUS_40,
      oppositePriceOperation: MINUS_50
    });
    this.smallCards[26] = new SmallCard({
      color: YELLOW,
      primaryPriceOperation: MINUS_50,
      oppositePriceOperation: PLUS_40
    });
    this.smallCards[27] = new SmallCard({
      color: GREEN,
      primaryPriceOperation: PLUS_40,
      oppositePriceOperation: MINUS_50
    });
    this.smallCards[28] = new SmallCard({
      color: GREEN,
      primaryPriceOperation: MINUS_50,
      oppositePriceOperation: PLUS_40
    });

    // +50 & -40
    this.smallCards[29] = new SmallCard({
      color: BLUE,
      primaryPriceOperation: PLUS_50,
      oppositePriceOperation: MINUS_40
    });
    this.smallCards[30] = new SmallCard({
      color: BLUE,
      primaryPriceOperation: MINUS_40,
      oppositePriceOperation: PLUS_50
    });
    this.smallCards[31] = new SmallCard({
      color: RED,
      primaryPriceOperation: PLUS_50,
      oppositePriceOperation: MINUS_40
    });
    this.smallCards[32] = new SmallCard({
      color: RED,
      primaryPriceOperation: MINUS_40,
      oppositePriceOperation: PLUS_50
    });
    this.smallCards[33] = new SmallCard({
      color: YELLOW,
      primaryPriceOperation: PLUS_50,
      oppositePriceOperation: MINUS_40
    });
    this.smallCards[34] = new SmallCard({
      color: YELLOW,
      primaryPriceOperation: MINUS_40,
      oppositePriceOperation: PLUS_50
    });
    this.smallCards[35] = new SmallCard({
      color: GREEN,
      primaryPriceOperation: PLUS_50,
      oppositePriceOperation: MINUS_40
    });
    this.smallCards[36] = new SmallCard({
      color: GREEN,
      primaryPriceOperation: MINUS_40,
      oppositePriceOperation: PLUS_50
    });

    // +60 & -30
    this.smallCards[37] = new SmallCard({
      color: BLUE,
      primaryPriceOperation: PLUS_60,
      oppositePriceOperation: MINUS_30
    });
    this.smallCards[38] = new SmallCard({
      color: BLUE,
      primaryPriceOperation: MINUS_30,
      oppositePriceOperation: PLUS_60
    });
    this.smallCards[39] = new SmallCard({
      color: RED,
      primaryPriceOperation: PLUS_60,
      oppositePriceOperation: MINUS_30
    });
    this.smallCards[40] = new SmallCard({
      color: RED,
      primaryPriceOperation: MINUS_30,
      oppositePriceOperation: PLUS_60
    });
    this.smallCards[41] = new SmallCard({
      color: YELLOW,
      primaryPriceOperation: PLUS_60,
      oppositePriceOperation: MINUS_30
    });
    this.smallCards[42] = new SmallCard({
      color: YELLOW,
      primaryPriceOperation: MINUS_30,
      oppositePriceOperation: PLUS_60
    });
    this.smallCards[43] = new SmallCard({
      color: GREEN,
      primaryPriceOperation: PLUS_60,
      oppositePriceOperation: MINUS_30
    });
    this.smallCards[44] = new SmallCard({
      color: GREEN,
      primaryPriceOperation: MINUS_30,
      oppositePriceOperation: PLUS_60
    });
  }

  get(id) {
    return this.smallCards[id];
  }
}

export default SmallDeck;
