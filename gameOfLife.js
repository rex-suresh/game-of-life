const cells = {};

const px = (size) => `${size}px`;

const createCell = (cell, grid) => {
  const cellElement = document.createElement('div');
  grid.appendChild(cellElement);
  styleCell(cell, cellElement);
};

const styleCell = (cell, cellElement) => {
  const width = 20;
  const { id, position: { x, y } } = cell.info;
  cellElement.id = id;
  cellElement.style.width = width;
  cellElement.className = 'cell';
  cellElement.style.left = px((x - 1) * width);
  cellElement.style.top = px((y - 1) * width);
};

const updateGame = (id, state) => {
  const element = document.querySelector(`#${id}`);
  if (state === 'on') {
    element.style.backgroundColor = 'white';
    return;
  }
  element.style.backgroundColor = 'black';
};

const getStates = () => { 
  const gameState = {};
  for (const cell in cells) {
    const { id, state } = cells[cell].info;
    updateGame(id, state);
    gameState[id] = state;
  }
  return gameState;
};

const updateCells = (gameState) => {
  for (const cell in cells) {
    cells[cell].update(gameState);
  }
};

const startGenerations = () => {
  let intId;
  let state = 'off';
  
  return () => {
    if (state === 'on') {
      clearInterval(intId);
      state = 'off';
      return;
    }
    intId = setInterval(() => {
      console.log(cells);
      const gameState = getStates();
      updateCells(gameState);
    }, 100);
    state = 'on';
  };
}

const createCells = (maxGrid, currentPos, grid) => {
  for (
    let index = 1;
    index <= maxGrid.maxX * maxGrid.maxY;
    index++, currentPos.x++) {

    const cellId = id(currentPos);
    const cell =
      new Cell(cellId, { ...currentPos }, getNeighbours(maxGrid, currentPos));
    cells[cellId] = cell;
    createCell(cell, grid);

    if (currentPos.x === maxGrid.maxX) {
      currentPos.x = 0;
      currentPos.y++;
    }
  }
};

const updateCellsOnClick = (event) => {
  const id = event.target.id;
  const cell = cells[id];
  cell.changeState();
  updateGame(id, 'on');
};

const startGame = startGenerations();
const recordMoves = updateCellsOnClick;

const onLoad = () => {
  const grid = document.querySelector('#page');
  const maxGrid = { maxX: 25, maxY: 25 };
  const currentPos = { x: 1, y: 1 };

  createCells(maxGrid, currentPos, grid);
  
  for (const cell in cells) {
    const { state, id } = cells[cell].info;
    updateGame(id, state);
  }
};

window.onload = onLoad;
