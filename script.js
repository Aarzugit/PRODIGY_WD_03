const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X'; 
let gameActive = true;
let board = Array(9).fill(null);

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


const handleCellClick = (event) => {
    const clickedCell = event.target;
    const cellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (board[cellIndex] || !gameActive || currentPlayer === 'O') return;

    makeMove(cellIndex, currentPlayer);
    if (checkWin()) {
        statusDisplay.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    if (!board.includes(null)) {
        statusDisplay.textContent = 'It\'s a draw!';
        gameActive = false;
        return;
    }

    currentPlayer = 'O';
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;

   
    setTimeout(aiMove, 500);
};


const aiMove = () => {
    let availableMoves = board
        .map((value, index) => value === null ? index : null)
        .filter(value => value !== null);

    if (availableMoves.length === 0) return;

    const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    makeMove(randomMove, 'O');

    if (checkWin()) {
        statusDisplay.textContent = `Player O wins!`;
        gameActive = false;
        return;
    }

    if (!board.includes(null)) {
        statusDisplay.textContent = 'It\'s a draw!';
        gameActive = false;
        return;
    }

    currentPlayer = 'X';
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
};


const makeMove = (index, player) => {
    board[index] = player;
    cells[index].textContent = player;
};


const checkWin = () => {
    return winConditions.some(condition => {
        const [a, b, c] = condition;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
};


const handleResetGame = () => {
    board = Array(9).fill(null);
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X'; 
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    gameActive = true;
};


cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', handleResetGame);
