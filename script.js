// Tic-Tac-Toe vs Computer
let board = ['', '', '', '', '', '', '', '', ''];
let player = 'X';
let computer = 'O';
let gameActive = true;

const winConditions = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

const cells = document.querySelectorAll('.cell');
const resultDisplay = document.getElementById('ticTacToeResult');

function handlePlayerClick(e) {
    const index = e.target.getAttribute('data-index');
    if(board[index] !== '' || !gameActive) return;

    board[index] = player;
    e.target.textContent = player;

    if(checkWin(player)) {
        resultDisplay.textContent = "You win!";
        gameActive = false;
        return;
    }

    if(board.every(cell => cell !== '')) {
        resultDisplay.textContent = "It's a tie!";
        gameActive = false;
        return;
    }

    // Computer moves after a short delay
    resultDisplay.textContent = "Computer is thinking...";
    setTimeout(computerMove, 700);
}

function computerMove() {
    let emptyIndices = board.map((val, idx) => val === '' ? idx : null).filter(val => val !== null);
    if(emptyIndices.length === 0) return;

    // Simple AI: win if possible, block if player about to win, else random
    for(let condition of winConditions) {
        let values = condition.map(i => board[i]);
        if(values.filter(v => v === computer).length === 2 && values.includes('')) {
            let idx = condition[values.indexOf('')];
            board[idx] = computer;
            cells[idx].textContent = computer;
            resultDisplay.textContent = "Computer wins!";
            gameActive = false;
            return;
        }
    }

    for(let condition of winConditions) {
        let values = condition.map(i => board[i]);
        if(values.filter(v => v === player).length === 2 && values.includes('')) {
            let idx = condition[values.indexOf('')];
            board[idx] = computer;
            cells[idx].textContent = computer;
            resultDisplay.textContent = "";
            return;
        }
    }

    if(board[4] === '') {
        board[4] = computer;
        cells[4].textContent = computer;
        resultDisplay.textContent = "";
        return;
    }

    const corners = [0,2,6,8];
    for(let i of corners) {
        if(board[i] === '') {
            board[i] = computer;
            cells[i].textContent = computer;
            resultDisplay.textContent = "";
            return;
        }
    }

    const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    board[randomIndex] = computer;
    cells[randomIndex].textContent = computer;

    if(checkWin(computer)) {
        resultDisplay.textContent = "Computer wins!";
        gameActive = false;
    } else if(board.every(cell => cell !== '')) {
        resultDisplay.textContent = "It's a tie!";
        gameActive = false;
    } else {
        resultDisplay.textContent = ""; 
    }
}

function checkWin(playerSymbol) {
    return winConditions.some(condition => condition.every(index => board[index] === playerSymbol));
}

function resetTicTacToe() {
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    resultDisplay.textContent = '';
    cells.forEach(cell => cell.textContent = '');
}

// Attach click events
cells.forEach(cell => cell.addEventListener('click', handlePlayerClick));
