import { useState } from 'react';
import Square from '../square/square.component';

const Board = () => {
	const [xIsNext, setXIsNext] = useState(true);
	const [squares, setSquares] = useState(Array(9).fill(null));

	// calculate a winner based on state of board
	const calculateWinner = (squares) => {
		// create an array of possible winning lines using squares array indexes (i.e. 0 = square 1 in board)
		const lines = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];
		// loop through the array lines and check to see if any lines match in the state of the board, if yes, return the winner
		for (let i = 0; i < lines.length; i++) {
			const [a, b, c] = lines[i]; // for winning line option i, assign to destructured array variables a, b, c. This makes a, b, c equal to any winning line based on the iteration of i.
			// check to see if winning line i exists in squares (Board state): check if first position is the winning line is not null, then check if that value of posotion a is equal to b and c. if yes, then this means the winning line is true and thus there is a winner.
			if (
				squares[a] &&
				squares[a] === squares[b] &&
				squares[a] === squares[c]
			) {
				return squares[a];
			}
		}
		return null;
	};

	const handleClick = (i) => {
		if (calculateWinner(squares) || squares[i]) {
			return;
		}
		const nextSquares = squares.slice();
		if (xIsNext) {
			nextSquares[i] = 'X';
		} else {
			nextSquares[i] = 'O';
		}
		setSquares(nextSquares);
		setXIsNext(!xIsNext);
	};

	const winner = calculateWinner(squares);
	let status;
	if (winner) {
		status = `Winner: ${winner}`;
	} else {
		status = `Next player: ${xIsNext ? 'X' : 'O'}`;
	}

	return (
		<div>
			<div className="status">{status}</div>
			<div className="board-row">
				<Square value={squares[0]} onSquareClick={() => handleClick(0)} />
				<Square value={squares[1]} onSquareClick={() => handleClick(1)} />
				<Square value={squares[2]} onSquareClick={() => handleClick(2)} />
			</div>
			<div className="board-row">
				<Square value={squares[3]} onSquareClick={() => handleClick(3)} />
				<Square value={squares[4]} onSquareClick={() => handleClick(4)} />
				<Square value={squares[5]} onSquareClick={() => handleClick(5)} />
			</div>
			<div className="board-row">
				<Square value={squares[6]} onSquareClick={() => handleClick(6)} />
				<Square value={squares[7]} onSquareClick={() => handleClick(7)} />
				<Square value={squares[8]} onSquareClick={() => handleClick(8)} />
			</div>
		</div>
	);
};

export default Board;
