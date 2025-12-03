//your JS code here. If required.
 const submitBtn = document.getElementById('submit');
    const setupDiv = document.getElementById('setup');
    const gameDiv = document.getElementById('game');
    const messageDiv = document.getElementById('message');
    let player1, player2, currentPlayer, board;

    submitBtn.onclick = function() {
        player1 = document.getElementById('player-1').value.trim();
        player2 = document.getElementById('player-2').value.trim();

        if (player1 && player2) {
            setupDiv.classList.add('hidden');
            gameDiv.classList.remove('hidden');
            startGame();
        }
    };

    function startGame() {
        board = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = player1;
        messageDiv.textContent = `${currentPlayer}, you're up`;
        document.querySelectorAll('.cell').forEach(cell => {
            cell.textContent = '';
            cell.onclick = handleClick;
        });
    }

    function handleClick(e) {
        const id = e.target.id;
        if (board[id-1] !== '') return;

        board[id-1] = currentPlayer === player1 ? 'X' : 'O';
        e.target.textContent = board[id-1];

        if (checkWin()) {
            messageDiv.textContent = `${currentPlayer} congratulations you won!`;
            disableBoard();
        } else if (board.every(cell => cell !== '')) {
            messageDiv.textContent = "It's a draw!";
        } else {
            currentPlayer = currentPlayer === player1 ? player2 : player1;
            messageDiv.textContent = `${currentPlayer}, you're up`;
        }
    }

    function checkWin() {
        const winPatterns = [
            [0,1,2], [3,4,5], [6,7,8],
            [0,3,6], [1,4,7], [2,5,8],
            [0,4,8], [2,4,6]
        ];
        return winPatterns.some(pattern => {
            return board[pattern[0]] !== '' &&
                   board[pattern[0]] === board[pattern[1]] &&
                   board[pattern[1]] === board[pattern[2]];
        });
    }

    function disableBoard() {
        document.querySelectorAll('.cell').forEach(cell => {
            cell.onclick = null;
        });
    }