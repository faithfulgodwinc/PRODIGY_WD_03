const board = document.getElementById('board');
const statusDisplay = document.getElementById('status');
const restartBtn = document.getElementById('restartBtn');

let boardState = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

function createBoard() {
    board.innerHTML = '';
    boardState.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.textContent = cell;
        cellElement.addEventListener('click', () => handleCellClick(index));
        board.appendChild(cellElement);
    });
}

function handleCellClick(index) {
    if (boardState[index] || !gameActive) return;

    boardState[index] = currentPlayer;
    createBoard();
    checkWinCondition();
}

function checkWinCondition() {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    let roundWon = false;
    for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.textContent = `Player ${currentPlayer} Wins!`;
        gameActive = false;
    } else if (!boardState.includes('')) {
        statusDisplay.textContent = 'Draw!';
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function restartGame() {
    gameActive = true;
    currentPlayer = 'X';
    boardState = ['', '', '', '', '', '', '', '', ''];
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    createBoard();
}

restartBtn.addEventListener('click', restartGame);
createBoard();
statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
