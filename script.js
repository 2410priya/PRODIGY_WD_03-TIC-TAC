const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('reset-button');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

// Winning combinations
const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Event listener for cell clicks
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

// Reset button click event
resetButton.addEventListener('click', resetGame);

// Handle cell click
function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.style.color = currentPlayer === 'X' ? '#2196F3' : '#F44336';

    if (checkWin(currentPlayer)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    }
}

// Check if current player has won
function checkWin(player) {
    return winPatterns.some(combination => {
        return combination.every(index => {
            return gameState[index] === player;
        });
    });
}

// Check if it's a draw
function isDraw() {
    return gameState.every(cell => {
        return cell !== '';
    });
}

// End the game
function endGame(draw) {
    if (draw) {
        statusDisplay.textContent = "It's a draw!";
    } else {
        statusDisplay.textContent = `Player ${currentPlayer} wins!`;
    }
    gameActive = false;
}

// Reset the game
function resetGame() {
    currentPlayer = 'X';
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;

    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.color = '#333';
    });
}
