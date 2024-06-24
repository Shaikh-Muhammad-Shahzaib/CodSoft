import inquirer from 'inquirer';

// Starting program Message 
console.log(" \n Welcome to Tic-tac-toe Game \n ")


type Player = 'X' | 'O' | null;
type Board = Player[][];

interface Move {
    row: number;
    col: number;
}

const boardSize = 3;

// Initialize an empty board
function initializeBoard(): Board {
    return Array(boardSize).fill(null).map(() => Array(boardSize).fill(null));
}

// Check for a win
function checkWin(board: Board, player: Player): boolean {
    // Check rows, columns, and diagonals
    for (let i = 0; i < boardSize; i++) {
        if (board[i].every(cell => cell === player)) return true;
        if (board.every(row => row[i] === player)) return true;
    }
    if (board.every((row, i) => row[i] === player)) return true;
    if (board.every((row, i) => row[boardSize - 1 - i] === player)) return true;
    return false;
}

// Check for a draw
function checkDraw(board: Board): boolean {
    return board.every(row => row.every(cell => cell !== null));
}

// Get available moves
function getAvailableMoves(board: Board): Move[] {
    const moves: Move[] = [];
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            if (board[row][col] === null) {
                moves.push({ row, col });
            }
        }
    }
    return moves;
}

// Apply a move to the board
function applyMove(board: Board, move: Move, player: Player): Board {
    const newBoard = board.map(row => row.slice());
    newBoard[move.row][move.col] = player;
    return newBoard;
}

// Minimax algorithm with alpha-beta pruning
function minimax(board: Board, depth: number, isMaximizing: boolean, alpha: number, beta: number): number {
    const human: Player = 'X';
    const ai: Player = 'O';

    if (checkWin(board, ai)) return 10 - depth;
    if (checkWin(board, human)) return depth - 10;
    if (checkDraw(board)) return 0;

    const availableMoves = getAvailableMoves(board);
    if (isMaximizing) {
        let maxEval = -Infinity;
        for (const move of availableMoves) {
            const evaluation = minimax(applyMove(board, move, ai), depth + 1, false, alpha, beta);
            maxEval = Math.max(maxEval, evaluation);
            alpha = Math.max(alpha, evaluation);
            if (beta <= alpha) break;
        }
        return maxEval;
    } else {
        let minEval = Infinity;
        for (const move of availableMoves) {
            const evaluation = minimax(applyMove(board, move, human), depth + 1, true, alpha, beta);
            minEval = Math.min(minEval, evaluation);
            beta = Math.min(beta, evaluation);
            if (beta <= alpha) break;
        }
        return minEval;
    }
}

// Find the best move for the AI
function findBestMove(board: Board): Move {
    let bestMove: Move | null = null;
    let bestValue = -Infinity;
    const ai: Player = 'O';

    for (const move of getAvailableMoves(board)) {
        const moveValue = minimax(applyMove(board, move, ai), 0, false, -Infinity, Infinity);
        if (moveValue > bestValue) {
            bestValue = moveValue;
            bestMove = move;
        }
    }

    if (bestMove === null) {
        throw new Error("No moves left");
    }
    return bestMove;
}

// Function to display the board
function printBoard(board: Board): void {
    console.log(board.map(row => row.map(cell => cell ? cell : '_').join('|')).join('\n'));
}

// Main game function
async function playGame() {
    let board = initializeBoard();
    let currentPlayer: Player = 'X';

    while (true) {
        printBoard(board);
        if (currentPlayer === 'X') {
            // Human player's turn
            const humanMove = await getHumanMove(board);
            board = applyMove(board, humanMove, 'X');
        } else {
            // AI player's turn
            const aiMove = findBestMove(board);
            board = applyMove(board, aiMove, 'O');
            console.log(`AI chose: row ${aiMove.row + 1}, col ${aiMove.col + 1}`);
        }

        if (checkWin(board, currentPlayer)) {
            printBoard(board);
            console.log(`${currentPlayer} wins!`);
            break;
        } else if (checkDraw(board)) {
            printBoard(board);
            console.log("It's a draw! better luck next time");
            break;
        }

        // Switch player
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

// Function to get the human player's move using Inquirer
async function getHumanMove(board: Board): Promise<Move> {
    while (true) {
        const answer = await inquirer.prompt([
            {
                name: 'row',
                type: 'input',
                message: 'Enter row (1-3):',
                validate: (input) => {
                    const num = Number(input);
                    return !isNaN(num) && num >= 1 && num <= 3 ? true : 'Please enter a valid row number (1-3)';
                }
            },
            {
                name: 'col',
                type: 'input',
                message: 'Enter column (1-3):',
                validate: (input) => {
                    const num = Number(input);
                    return !isNaN(num) && num >= 1 && num <= 3 ? true : 'Please enter a valid column number (1-3)';
                }
            }
        ]);

        const move: Move = { row: Number(answer.row) - 1, col: Number(answer.col) - 1 };

        if (board[move.row][move.col] === null) {
            return move;
        } else {
            console.log("Invalid move! The cell is already occupied.");
        }
    }
}

// Start the game
playGame();
