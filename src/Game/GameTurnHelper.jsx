import React from "react";
import Color from "color";

import Button from "react-bootstrap/lib/Button";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
// import FormGroup from "react-bootstrap/lib/FormGroup";
// import InputGroup from "react-bootstrap/lib/InputGroup";
import FormControl from "react-bootstrap/lib/FormControl";

import { allColors } from "../Cards/CardColor";

import ShareCell from "./ShareCell";

export const getPriceChangeCells = ({
  previousPrices,
  newPrices,
  selectedCard,
  onSelectOppositePriceChange,
  areAllPricesUpdated
}) => {
  const selectedColor = selectedCard ? selectedCard.card.color : null;

  let primaryIndex = null;
  let primaryUp = false;
  let primaryDown = false;

  let oppositeUp = false;
  let oppositeDown = false;

  allColors.forEach((color, index) => {
    if (selectedColor === color) {
      primaryIndex = index;
      primaryUp = newPrices[index] > previousPrices[index];
      primaryDown = newPrices[index] < previousPrices[index];

      oppositeUp = primaryDown;
      oppositeDown = primaryUp;
    }
  });

  return allColors.map((color, index) => {
    const upColorSelected =
      (index === primaryIndex && primaryUp) ||
      (index !== primaryIndex && oppositeUp);
    const downColorSelected =
      (index === primaryIndex && primaryDown) ||
      (index !== primaryIndex && oppositeDown);

    let newPriceDisplay = "";
    let newPriceUnder = false;
    let newPriceOver = false;

    if (newPrices[index] !== previousPrices[index]) {
      newPriceDisplay = newPrices[index];

      if (newPriceDisplay > 250) {
        newPriceDisplay = 250;
        newPriceOver = true;
      }

      if (newPriceDisplay < 10) {
        newPriceDisplay = 10;
        newPriceUnder = true;
      }
    }

    let textDecoration = "none";
    if (newPriceUnder) {
      textDecoration = "underline";
    }
    if (newPriceOver) {
      textDecoration = "overline";
    }

    return (
      <ShareCell key={`price_${color.letter.id}`} color={color} current>
        {
          <Button
            bsStyle={upColorSelected ? "success" : "default"}
            bsSize="xs"
            disabled={
              areAllPricesUpdated ||
              !selectedCard ||
              index === primaryIndex ||
              oppositeDown
            }
            block
            style={{
              borderBottomRightRadius: 0,
              borderBottomLeftRadius: 0
            }}
            onClick={() => {
              onSelectOppositePriceChange(
                index,
                selectedCard.card.oppositePriceOperation
              );
            }}
          >
            <Glyphicon
              glyph="triangle-top"
              style={
                !selectedCard || downColorSelected
                  ? {
                      color: "silver"
                    }
                  : {}
              }
            />
          </Button>
        }
        <FormControl
          type="text"
          value={newPriceDisplay}
          placeholder={
            newPrices[index] === previousPrices[index] ? newPrices[index] : ""
          }
          disabled
          style={{
            textAlign: "center",
            fontWeight:
              newPrices[index] !== previousPrices[index] ? "bold" : "normal",
            borderTop: 0,
            borderBottom: 0,
            borderRadius: 0,
            textDecoration
          }}
        />
        {
          <Button
            bsStyle={downColorSelected ? "danger" : "default"}
            bsSize="xs"
            disabled={
              areAllPricesUpdated ||
              !selectedCard ||
              index === primaryIndex ||
              oppositeUp
            }
            block
            style={{
              borderTopRightRadius: 0,
              borderTopLeftRadius: 0
            }}
            onClick={() => {
              onSelectOppositePriceChange(
                index,
                selectedCard.card.oppositePriceOperation
              );
            }}
          >
            <Glyphicon
              glyph="triangle-bottom"
              style={
                !selectedCard || upColorSelected
                  ? {
                      color: "silver"
                    }
                  : {}
              }
            />
          </Button>
        }
      </ShareCell>
    );
  });
};

export const getBankAmounts = turn =>
  turn.bankAmounts.map(
    (amount, amountIndex) =>
      amountIndex < turn.bankAmounts.length - 1 ? (
        <span
          key={amount}
          style={{
            color: "black",
            textDecoration: "line-through",
            marginRight: "1em"
          }}
        >
          {amount}
        </span>
      ) : (
        <span
          key={amount}
          style={{
            color: "black"
          }}
        >
          {amount}
        </span>
      )
  );

export const getFirstStepCells = turn => {
  const firstStepCells = turn.steps.reduce((cells, step) => {
    if (step.stepType === "FIRST_BUY_SELL_STEP") {
      step.shares.sort((a, b) => a.id - b.id).forEach((share, index) =>
        cells.push(
          <ShareCell key={`first_${share.id}`} color={allColors[index]}>
            <span
              style={{
                color: share.amount
                  ? "black"
                  : Color(allColors[index].style)
                      .darken(0.5)
                      .alpha(0.2)
              }}
            >
              {share.amount}
            </span>
          </ShareCell>
        )
      );
    }

    return cells;
  }, []);

  return firstStepCells;
};

export const getLastStepCells = turn => {
  const repurchaseSteps = turn.steps
    .filter(step => step.stepType === "REPURCHASE_STEP")
    .sort((a, b) => a.originalStepId - b.originalStepId)
    .map(repurchaseStep => ({
      ...repurchaseStep,
      shares: repurchaseStep.shares.sort((a, b) => a.id - b.id)
    }));

  const lastStepCells = turn.steps.reduce((cells, step) => {
    if (step.stepType === "LAST_BUY_SELL_STEP") {
      step.shares.sort((a, b) => a.id - b.id).forEach((share, colorIndex) => {
        const amounts = [
          share.amount,
          ...repurchaseSteps.map(
            repurchaseStep => repurchaseStep.shares[colorIndex].amount
          )
        ].reduce((changedAmounts, amount) => {
          if (
            changedAmounts.length === 0 ||
            changedAmounts[changedAmounts.length - 1] !== amount
          ) {
            changedAmounts.push(amount);
          }

          return changedAmounts;
        }, []);

        cells.push(
          <ShareCell key={`last_${share.id}`} color={allColors[colorIndex]}>
            <div>
              {amounts.length > 1 ? (
                amounts.map(
                  (amount, amountIndex) =>
                    amountIndex < amounts.length - 1 ? (
                      <span
                        key={amount}
                        style={{
                          color: "black",
                          textDecoration: "line-through",
                          marginRight: "1em"
                        }}
                      >
                        {amount}
                      </span>
                    ) : (
                      <span
                        key={amount}
                        style={{
                          color: "black"
                        }}
                      >
                        {amount}
                      </span>
                    )
                )
              ) : (
                <span
                  key={share.amount}
                  style={{
                    color: share.amount
                      ? "black"
                      : Color(allColors[colorIndex].style)
                          .darken(0.5)
                          .alpha(0.2)
                  }}
                >
                  {share.amount}
                </span>
              )}
            </div>
          </ShareCell>
        );
      });
    }

    return cells;
  }, []);

  return lastStepCells;
};
