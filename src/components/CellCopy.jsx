import React, { useState, useEffect, useContext } from 'react';


let onceCalled = false;
let bombsLeftCount = 40;


const width = 16;
const height = 16;
const cellsCount = width * height;
let cellsLeftCounter = cellsCount;


const CellCopy = (props) => {
    const [minefield, setMinefield] = useState([]);
    const [smiley, setSmiley] = useState();
    const [cells, setCells] = useState([]);
    const [cellState, setCellState] = useState('Cell');

    useEffect(() => {
        const getSmiley = async () => {
            const smiley = await document.querySelector('.App-header-smiley-Btn');

            setSmiley(smiley);
        }
        const getMinefield = async () => {
            const minefield = await document.querySelector(".App-minefield");
            setMinefield(minefield);
            setCells([...minefield.children])
        }

        getSmiley();
        getMinefield();

    }, [])



    function clickCell(row, column) {
        if (!cellValidator(row, column)) return;

        let index = row * width + column;
        const cell = cells[index]

        if (cell.disabled === true) return;

        setCellState('Clicked!');
        cell.disabled = true;

        cell.style.background = 'url("/sprites/minesweeper-sprites_cell(clicked).jpg")';

        if (bombCheck(row, column)) {
            for (let cell in cells) {
                for (let bomb of props.bombs) {
                    if (cells[bomb] !== cells[cell] && cells[cell].style.background === 'url("/sprites/minesweeper-sprites_mine(question).jpg")') {
                        console.log(cells[cell]);
                        setCellState('Wrong cell!');
                        cells[cell].style.background = 'url("/sprites/minesweeper-sprites_bomb(false).jpg")';
                    }
                    if (cells[bomb].style.background !== 'url("/sprites/minesweeper-sprites_mine(defused).jpg")') {
                        setCellState('Real bomb!');
                        cells[bomb].style.background = "url('/sprites/minesweeper-sprites_bomb(shown).jpg')";
                    }
                    
                }
            }

            
            setCellState('Detonated bomb!');
            cell.style.background = "url('/sprites/minesweeper-sprites_bomb(dead).jpg')";
            if (cellState === 'Real bomb!') {
                console.log('show me!', cell);
            }
            gameOver();
            return;
        }

        cellsLeftCounter--;

        if (cellsLeftCounter === props.bombs.length) {
            smiley.style.background = "url('/sprites/minesweeper-sprites_smiley-win.jpg')";
            minefield.style['pointer-events'] = 'none';
            clearInterval(props.Interval);
            return;
        }

        const count = getMineCount(row, column);

        if (count !== 0) {
            setCellState(`${count} mine around`);
            cell.style.background = `url("/sprites/minesweeper-sprites_${count}(mine).jpg")`;
            return;
        }

        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                clickCell(row + j, column + i);
            }
        }

        function cellValidator(row, column) {
            return row >= 0 &&
                row < height &&
                column >= 0 &&
                column < width
        };

        function bombCheck(row, column) {
            if (!cellValidator(row, column)) return;
            const index = row * width + column;
            return props.bombs.includes(index);
        };

        function getMineCount(row, column) {
            let count = 0
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    if (bombCheck(row + j, column + i)) {
                        count++;
                    }
                }
            }
            return count;
        };
    }

    function markMine(e) {
        if (e.target.style.background === 'url("/sprites/minesweeper-sprites_mine(question).jpg")') {
            setCellState('Cell!');
            e.target.style.background = 'url("/sprites/minesweeper-sprites_cell.jpg")'
            bombsLeftCount++;
            const bombsLeftString = bombsLeftCount.toString().split('');
            props.count[0].setAttribute('src', `/sprites/minesweeper-sprites_${bombsLeftString[1]}.jpg`);
            props.count[1].setAttribute('src', `/sprites/minesweeper-sprites_${bombsLeftString[0]}.jpg`);
            return;
        }
        if ((!e.target.disabled && e.target.style.background === "") ||
            e.target.style.background === 'url("/sprites/minesweeper-sprites_cell.jpg")') {
            bombsLeftCount--;
            const bombsLeftString = bombsLeftCount.toString().split('');
            props.count[0].setAttribute('src', `/sprites/minesweeper-sprites_${bombsLeftString[1]}.jpg`);
            props.count[1].setAttribute('src', `/sprites/minesweeper-sprites_${bombsLeftString[0]}.jpg`);
            if (bombsLeftCount < 10) {
                props.count[0].setAttribute('src', `/sprites/minesweeper-sprites_${bombsLeftString[0]}.jpg`);
                props.count[1].setAttribute('src', '/sprites/minesweeper-sprites_0.jpg');
            }
            if (bombsLeftCount <= 0) {
                props.count[0].setAttribute('src', '/sprites/minesweeper-sprites_0.jpg');
            }

            setCellState('Defused!');
            e.target.style.background = 'url("/sprites/minesweeper-sprites_mine(defused).jpg")';
            return;
        }
        if (e.target.style.background === 'url("/sprites/minesweeper-sprites_mine(defused).jpg")') {
            setCellState('Maybe bomb!');
            e.target.style.background = 'url("/sprites/minesweeper-sprites_mine(question).jpg")';
            return;
        }
    }

    function gameOver() {
        smiley.style.background = "url('sprites/minesweeper-sprites_smiley-lose.jpg')";
        minefield.style['pointer-events'] = 'none';
        clearInterval(props.Interval);
    }



    return (
        <button className={`cell_${props.id}_${props.isBomb}`}
            onClick={
                (ev) => {
                    if (ev.target.tagName !== 'BUTTON') {
                        return;
                    }


                    const index = cells.indexOf(ev.target);
                    const column = index % height;
                    const row = Math.floor(index / width);


                    function firstMoveValidator() {
                        if (!onceCalled) {
                            for (let bomb of props.bombs) {
                                // if (index === bomb) {
                                //     const bombsAfterFirstMove = bombs.splice(bombs.indexOf(bomb), 1, bomb += 1);
                                // }
                            }
                        }

                        onceCalled = true;
                    }

                    firstMoveValidator();
                    clickCell(row, column);

                    return;
                }
            }
            onContextMenuCapture={
                (ev) => {
                    if (ev.target.tagName !== 'BUTTON') {
                        return;
                    }
                    ev.preventDefault();

                    markMine(ev);
                    console.log(cellState);
                    return;
                }
            }></button>
    )
};

export default CellCopy;
