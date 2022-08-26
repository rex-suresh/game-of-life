class Cell {
  #id; #cellPos; #neighbourIds; #state;
  constructor(id, cellPos, neighbourIds) {
    this.#id = id;
    this.#cellPos = cellPos;
    this.#neighbourIds = neighbourIds;
    this.#state = 'off';
  }

  update(gameState) {
    const alive = this.#aliveCount(gameState);
    if (alive > 3 || alive < 2) {
      this.#state = 'off';
      return;
    }
    if (alive === 3) {
      this.#state = 'on';
    }
  }

  #aliveCount(gameState) {
    const livingCells = this.#neighbourIds.filter(
      neighbourId => gameState[neighbourId] === 'on');
    return livingCells.length;
  }

  changeState() {
    if (this.#state === 'on') {
      this.#state = 'off';
      return;
    }
    this.#state = 'on';
  }

  get info() {
    return {
      position: {...this.#cellPos},
      state: this.#state,
      id: this.#id
    };
  }
}

const isNeighbourValid = ({ maxX, maxY }, { x: xPos, y: yPos }) => {
  return (xPos > 0 && yPos > 0) &&
      (xPos <= maxX && yPos <= maxY);
};

const id = ({x, y}) => `x${x}-y${y}`;

const getNeighbours = (maxGrid, cellPos) => {
  const { x, y } = cellPos;
  
  const neighbourPos = [
    { x: x - 1, y: y - 1 }, { x, y: y - 1 }, { x: x + 1, y: y - 1 },
    { x: x - 1, y }, { x: x + 1, y },
    { x: x - 1, y: y + 1 }, { x, y: y + 1 }, { x: x + 1, y: y + 1 },
  ];
  const list = neighbourPos.filter(
    (neighbour) => isNeighbourValid(maxGrid, neighbour));
  return list.map(id);
};
