import React from "react";
import { number, shape, string, node } from "prop-types";
import { injectIntl, intlShape } from "react-intl";

import CardLabel from "./CardLabel";

const SmallCardLabel = ({ card, intl }) => (
  <CardLabel color={card.color.style}>
    {card.cardString}
    {intl.formatMessage(card.color.letter)}
  </CardLabel>
);

SmallCardLabel.propTypes = {
  card: shape({
    color: shape({
      letter: node.isRequired,
      style: string.isRequired
    }).isRequired,
    value: number.isRequired,
    cardString: string.isRequired
  }).isRequired,
  intl: intlShape.isRequired
};

export default injectIntl(SmallCardLabel);
