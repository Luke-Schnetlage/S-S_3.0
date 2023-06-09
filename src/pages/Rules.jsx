import React, { useState } from 'react';
import '../styles/rules.css';

export default function Rules () {
  return (
    <>
      <h1 className='center-align'>How to Play</h1>
      <div className='left-align'>
        <div>
          <h2>Anatomy of the board</h2>
          <div className="content">
            The “board” will be divided into 3 broad zones: Your summoning circle, three contested zones, and the enemy summoning circle. Your summoning circle consists of three  minion zones (Figure 6.1.1: 1,2,3), two invocation zones (Figure 1: 4,5), and a terrain zone (Figure 6.1.1: X). As the names imply, minions may only be summoned to minion zones, invocations may only be placed in invocation zones, and terrain may only be placed in the terrain zone. An opponent’s summoning circle is an exact copy of your own for your opponent.
            Each contested zone will contain a contested zone card randomly selected from a pool of possible zones. Once occupied, a contested zone card will confer its specific benefit or drawback to the creature occupying its zone
          </div>
        </div>
        <div>
          <h2>Beginning of game</h2>
          <div className="content">
            Games begin with both players drawing 5 cards from their randomized decks. A player will randomly be chosen to play first. The first player to play will not be allowed to draw a card at the beginning of their first turn. For all other turns, the turn player will draw a card at the beginning of their turn. All zones on both players' summoning circles start empty and all effects on contested zones start hidden.
          </div>
        </div>
        <div>
          <h2>Card types and their abilities</h2>
          <div className="content">
            Player’s decks consist of 3 card types: minion cards, invocation cards, and terrain cards.
            Minion cards have 5 pieces of information: summon cost, attack cost, power,energy alignment, and an optional effect. A minion's summon cost indicates the amount of life a player must pay in order to be summoned to an empty zone in a player’s summoning circle. An attack cost indicates the amount of terrain energy required for a minion to perform an attack. A minion’s power indicates the damage it deals to enemy players and minions. Energy alignment indicates the specific type of terrain a player must expend in order to pay for its attack or effect costs. Some, but not all, minions have additional effects that may require energy, life, or passive wait time to take effect.
            Invocation cards have 4 pieces of information: casting time(slow), ritual cost(fast), an energy alignment, and an effect. Invocation cards have no cost associated with putting them from your hand to your summoning circle, however they have no inherent effect once placed. Casting time represents the number of turns you must pass through with a given invocation on your field (decremented at beginning of turn) before you may use an invocation’s effect. Alternatively, once an invocation is in a player’s summoning circle, at any point during a player’s turn, a player may pay energy of the type equivalent to its energy alignment in a quantity equivalent to its ritual cost to activate its effect immediately and forgo waiting for casting time. Each invocation’s effect is unique and includes, but is not limited to, gaining life, losing life, dealing damage, and drawing cards. Once an invocation’s effect is activated, it is removed from the zone it occupies.
            Terrain only has 1 piece of information: energy alignment. Energy alignment determines what energy type a terrain card produces. Terrain may only produce 1 energy of its given type per turn.
          </div>
        </div>
        <div>
          <h2>Attacking and controlling zones</h2>
          <div className="content">
            Once per turn, a minion may attack an empty, adjacent contested zone, a creature occupying an adjacent contested zone (illustrated by arrows in Figure 1), or an opponent. A minion may only attack after its respective attack cost has been paid.
            Should a minion attack an unoccupied contested zone, that minion will automatically leave its current zone and occupy that zone. If that zone’s effect has not been revealed, the effect will be revealed as the minion occupies the zone.
            Should a minion attack another minion, the attacking minion will reduce the defending minion’s power by the attacker’s power. If a minion’s power is reduced to zero, it is automatically destroyed. When a minion occupying a contested zone is destroyed by an attack, the attacker automatically takes the defending minion’s place in the contested zone.
            A minion may only attack your opponent directly once it occupies a contested zone. Once a minion makes a direct attack on a player, the defending player loses life equal to the attacking minion’s power.
          </div>
        </div>
        <div>
          <h2>Win Conditions</h2>
          <div className="content">
            A player loses the game once that player’s life reaches zero or below or they attempt to draw a card while no cards remain in their library.
          </div>
        </div>
      </div>
    </>
  )
}
