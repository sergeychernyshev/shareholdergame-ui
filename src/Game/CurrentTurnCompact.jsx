import React from "react";

import { FormattedMessage, injectIntl, intlShape } from "react-intl";
import Button from "react-bootstrap/lib/Button";

import { allColors } from "../Cards/CardColor";
import ShareCell from "./ShareCell";

import { getPriceChangeCells } from "./GameTurnHelper";

import {
  CurrentTurnPropTypes,
  CurrentTurnDefaultProps
} from "./CurrentTurnPropTypes";

const THICK_BORDER = "2px solid grey";

const CurrentTurnCompact = ({
  first,
  selectedCard,
  previousPrices,
  newPrices,
  areAllPricesUpdated,
  last,
  bank,
  onUpdateStockAmount,
  onUpdateCard,
  roundNumber,
  turnIndex,
  turnsPerRound,
  lastRound,
  outstandingCards,
  intl
}) => {
  const rowsPerTurn = lastRound ? 1 : 3;

  const prefixCells = [];

  if (turnIndex === 0) {
    prefixCells.push(
      <th
        key="roundNumber"
        rowSpan={rowsPerTurn + turnsPerRound - 1}
        style={{
          width: "2em",
          fontSize: "large",
          textAlign: "center",
          verticalAlign: "middle",
          border: THICK_BORDER
        }}
      >
        {roundNumber}
      </th>
    );
  }

  const selectedRowStyle = {
    backgroundColor: "#efefef"
  };

  prefixCells.push(
    <td
      key="card"
      rowSpan={rowsPerTurn}
      style={{
        ...selectedRowStyle,
        border: THICK_BORDER,
        verticalAlign: "middle"
      }}
    >
      {selectedCard ? (
        <div>
          {selectedCard.card.getCardLabel()}
          <Button
            bsSize="xs"
            style={{ marginTop: "1em" }}
            onClick={() => onUpdateCard(null)}
          >
            <FormattedMessage
              id="game.card.change-button-label"
              description="Change button label"
              defaultMessage="change"
            />
          </Button>
        </div>
      ) : (
        <select
          className="form-control"
          onChange={event =>
            onUpdateCard(
              outstandingCards.find(
                outstandingCard =>
                  `${outstandingCard.id}` === `${event.target.value}`
              )
            )
          }
        >
          <option />
          {outstandingCards.map(outstandingCard => (
            <option
              key={outstandingCard.id}
              value={outstandingCard.id}
              /* eslint-disable-line react/no-danger */ dangerouslySetInnerHTML={{
                __html: `${outstandingCard.card.cardHTML}${intl.formatMessage(
                  outstandingCard.card.color.letter
                )}`
              }}
            />
          ))}
        </select>
      )}
    </td>
  );

  const firstStepCells = allColors.map((color, index) => (
    <ShareCell
      key={`first_${intl.formatMessage(color.letter)}`}
      color={color}
      current
    >
      <input
        onChange={event => onUpdateStockAmount(true, index, event.target.value)}
        type="number"
        min={0}
        step={1}
        className="form-control"
        style={{ width: "100%", textAlign: "center" }}
        value={first[index]}
      />
    </ShareCell>
  ));

  const priceCells = getPriceChangeCells(
    previousPrices,
    newPrices,
    selectedCard
  );

  const lastStepCells = allColors.map((color, index) => (
    <ShareCell
      key={`last_${intl.formatMessage(color.letter)}`}
      color={color}
      current
      style={index ? {} : { borderLeft: THICK_BORDER }}
    >
      <input
        onChange={event =>
          onUpdateStockAmount(false, index, event.target.value)
        }
        disabled={!areAllPricesUpdated}
        type="number"
        min={0}
        step={1}
        className="form-control"
        style={{ width: "100%", textAlign: "center" }}
        value={last[index]}
      />
    </ShareCell>
  ));

  const bankCell = (
    <td
      style={{
        ...selectedRowStyle,
        textAlign: "left",
        verticalAlign: "middle",
        border: THICK_BORDER
      }}
      rowSpan={rowsPerTurn}
    >
      {bank}
    </td>
  );

  return lastRound ? (
    <tr
      key="current_turn_last_round"
      style={{ border: THICK_BORDER, verticalAlign: "middle" }}
    >
      {prefixCells}
      {priceCells}
      {bankCell}
    </tr>
  ) : (
    [
      <tr
        key="current_turn_first"
        style={{ borderTop: THICK_BORDER, verticalAlign: "middle" }}
      >
        {prefixCells}
        {firstStepCells}
        {bankCell}
      </tr>,
      <tr key="current_turn_price">{priceCells}</tr>,
      <tr key="current_turn_last" style={{ borderBottom: THICK_BORDER }}>
        {lastStepCells}
      </tr>
    ]
  );
};

CurrentTurnCompact.propTypes = {
  ...CurrentTurnPropTypes,
  intl: intlShape.isRequired
};

CurrentTurnCompact.defaultProps = CurrentTurnDefaultProps;

export default injectIntl(CurrentTurnCompact);
