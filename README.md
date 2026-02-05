# Board Game Environments

Work in progress library for quickly creating rules-following environments for board games.

## MVP Target Games

- Go Fish
- Hearts
- Cribbage
- Checkers
- Chess
- Go
- Sorry
- Monopoly
- Catan
- Azul

## Core elements

### Meta

- Game
    - Phase
        - Action
            - Player Move
            - Game Event
        - Turn order
    - Victory condition

- Player
    - Information space
    - Victory condition

### Components

- Playable (single use effect)
    - Discard behaviour

- Rollable (e.g. dice)
- Moveable (e.g. meeple)
- Counter (e.g. currency pool)

### Component Management

- Slot (One component or zero)
- Deck (Any length list of components, hidden)
    - Random draw behaviour
- Yard (List of components, visible, ordered, length maximum)
- Hand (secret yard)

### Boards and Maps

- Region (Location on board for components)
    - Slot
    - Yard
    - Grid
- Board (container for regions)
- AdjacencyMap (set of regions in an adjacency network, e.g. map of countries)
- Chute (Line of regions with one-directional adjacency to one other region)
- Loop (Chute which loops)

### Prefabs

- Draft
- Point Tracker
- Deal
- Area Movement
- Auction
- Card Play Conflict Resolution

### Nomenclature

**Action**: Function which enacts some atomic change of game state

**Effect**: Object representing the game's response to a player or random input. Defines inputs, checks conditionals, and calls actions.

**Move**: Option available to player. Includes action name, input
