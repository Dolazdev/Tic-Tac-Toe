const Tic_tac_toe = (function () {
    const board = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = "X";
    let gameActive = false;
    let player1Name = "Player 1";
    let player2Name = "Player 2";

    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]
    ];

    const gameboardDiv = document.getElementById("gameboard");
    const resultDiv = document.getElementById("result");
    const restartButton = document.getElementById("restart");
    const player1Input = document.getElementById("player1");
    const player2Input = document.getElementById("player2");

    function renderBoard() {
        gameboardDiv.innerHTML = "";
        board.forEach((cell, index) => {
            const cellDiv = document.createElement("div");
            cellDiv.textContent = cell;
            cellDiv.addEventListener("click", () => handleClick(index));
            gameboardDiv.appendChild(cellDiv);
        });
    }

    function handleClick(index) {
        if (!gameActive || board[index] !== "") return;

        board[index] = currentPlayer;
        renderBoard();

        if (checkWin()) {
            const winner = currentPlayer === "X" ? player1Name : player2Name;
            resultDiv.textContent = `${winner} wins!`;
            gameActive = false;
            return;
        }

        if (board.every(cell => cell !== "")) {
            resultDiv.textContent = "It's a tie!";
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === "X" ? "O" : "X";
        resultDiv.textContent = `${currentPlayer === "X" ? player1Name : player2Name}'s turn`;
    }

    function checkWin() {
        return winningCombinations.some(combo => {
            const [a, b, c] = combo;
            return board[a] && board[a] === board[b] && board[a] === board[c];
        });
    }

    function resetGame() {
        board.fill("");
        currentPlayer = "X";
        gameActive = true;
        player1Name = player1Input.value.trim() || "Player 1";
        player2Name = player2Input.value.trim() || "Player 2";
        renderBoard();
        // resultDiv.textContent = `${player1Name || player2Name}'s turn`;
    }

    player1Input.addEventListener("input", () => {
        if (!gameActive) resetGame();
    });
    player2Input.addEventListener("input", () => {
        if (!gameActive) resetGame();
    });
    restartButton.addEventListener("click", resetGame);
    resetGame();
})();

Tic_tac_toe()