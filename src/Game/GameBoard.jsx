import React from "react";

import Color from "color";

import Table from "react-bootstrap/lib/Table";

import { bool, number, arrayOf, shape, string } from "prop-types";

import GameTurn from "./GameTurn";

import SmallCard from "../Cards/SmallCard";
import SmallCardLabel from "../Cards/SmallCardLabel";

import { allColors } from "../Cards/CardColor";

const THICK_BORDER = "2px solid grey";

const GameBoard = ({ game }) => (
  <div>
    <h2>Turns</h2>
    <Table bordered style={{ textAlign: "center" }}>
      <thead>
        <th />
        {allColors.map(color => (
          <th
            style={{
              border: THICK_BORDER,
              backgroundColor: Color(color.style).alpha(0.2),
              padding: "0.5em",
              textAlign: "center"
            }}
          >
            {color.columnLabel}
          </th>
        ))}
        <th
          style={{
            borderBottom: THICK_BORDER
          }}
        />
        {allColors.map(color => (
          <th
            style={{
              border: THICK_BORDER,
              backgroundColor: Color(color.style).alpha(0.2),
              padding: "0.5em",
              textAlign: "center"
            }}
          >
            {color.columnLabel}
          </th>
        ))}
        {allColors.map(color => (
          <th
            style={{
              border: THICK_BORDER,
              backgroundColor: Color(color.style).alpha(0.2),
              padding: "0.5em",
              textAlign: "center"
            }}
          >
            {color.columnLabel}
          </th>
        ))}
        <th
          style={{
            borderBottom: THICK_BORDER
          }}
        />
      </thead>
      <tbody>
        {game.report.rounds
          .filter(round => round.round > 0)
          .sort((a, b) => a.round - b.round)
          .map(round => {
            const visibleTurns = round.turns.filter(turn => turn.turn > 0);

            return visibleTurns
              .sort((a, b) => a.turn - b.turn)
              .map((turn, index) => (
                <GameTurn
                  firstEmptyRow={
                    round.round === game.report.rounds.length - 1 &&
                    turn.turn === 1
                  }
                  lastRow={
                    round.round === game.report.rounds.length - 1 &&
                    turn.turn === visibleTurns.length
                  }
                  key={`turn_${round.round}_${turn.turn}`}
                  turn={turn}
                  turnIndex={index}
                  roundsPerTurn={visibleTurns.length}
                />
              ));
          })}
      </tbody>
    </Table>

    <h2>Cards</h2>
    <Table bordered>
      <tbody>
        {game.report.players.map((player, index) => (
          <tr key={player.playerId}>
            <td>Player {index}</td>
            <td>
              <ul>
                {player.playerCards.map(card => (
                  <li key={card.id}>
                    {card.cardId} ({card.id})
                    <SmallCardLabel card={SmallCard.get(2)} />
                  </li>
                ))}
              </ul>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
);

GameBoard.propTypes = {
  game: shape({
    report: shape({
      players: arrayOf(
        shape({
          name: string,
          userpic: string,
          winner: bool,
          wonmoney: number
        })
      ).isRequired
    }).isRequired
  }).isRequired
};

export default GameBoard;
