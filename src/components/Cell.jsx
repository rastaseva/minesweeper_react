import React, { useState, useEffect, useContext } from 'react';

const cellStyle = {
    clickedCell: "url('/sprites/minesweeper-sprites_cell(clicked).jpg')",
    blownBomb: "url('/sprites/minesweeper-sprites_bomb(dead).jpg')",
}


const Cell = (props) => {
    let Interval;
    let bombsLeftCount = props.bombsQuantity;

    const cellsCount = props.width * props.height;

    let cellsLeftCounter = cellsCount;


    function clickCell(e, row, column) {
        if (!cellValidator(row, column)) return;

        if (e.target.disabled === true) return;

        e.target.disabled = true;

        e.target.style.background = cellStyle.clickedCell;

        if (bombCheck()) {
            // for (let cell in cells) {
            //     for (let bomb of bombs) {
            //         if (cells[bomb] !== cells[cell] && cells[cell].style.background === 'url("/sprites/minesweeper-sprites_mine(question).jpg")') {
            //             cells[cell].style.background = 'url("/sprites/minesweeper-sprites_bomb(false).jpg")';
            //         }
            //         if (cells[bomb].style.background !== 'url("/sprites/minesweeper-sprites_mine(defused).jpg")') {
            //             cells[bomb].style.background = "url('/sprites/minesweeper-sprites_bomb(shown).jpg')";
            //         }
            //     }

            // }
            e.target.style.background = cellStyle.blownBomb;
            // gameOver();
            console.log('bang!');
            return;
        }

        cellsLeftCounter--;

        if (cellsLeftCounter === props.bombsQuantity) {
            // smiley.style.background = "url('/sprites/minesweeper-sprites_smiley-win.jpg')"
            // minefield.style['pointer-events'] = 'none';
            clearInterval(Interval);
            return;
        }

        const count = getMineCount(row, column);

        if (count !== 0) {
            e.target.style.background = `url("/sprites/minesweeper-sprites_${count}(mine).jpg")`;
            return;
        }
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                clickCell(e, row + j, column + i)
                console.log(`next row is ${row + j}, next column is ${column + i}`);
            }
        }

        function cellValidator(row, column) {
            return row >= 0 &&
                row < props.height &&
                column >= 0 &&
                column < props.width
        };

        function bombCheck(row, column) {
            const index = row * props.width + column;
            return props.bombsLocation.includes(index)
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
    clearInterval(Interval);

    function markMine(e) {
        if (e.target.style.background === 'url("/sprites/minesweeper-sprites_mine(question).jpg")') {

            e.target.style.background = 'url("/sprites/minesweeper-sprites_cell.jpg")'
            bombsLeftCount++;
            const bombsLeftString = bombsLeftCount.toString().split('');
            // appendBombs.setAttribute('src', `/sprites/minesweeper-sprites_${bombsLeftString[1]}.jpg`);
            // appendTensBombs.setAttribute('src', `/sprites/minesweeper-sprites_${bombsLeftString[0]}.jpg`);
            return;
        }
        if ((!e.target.disabled && e.target.style.background === "") ||
            e.target.style.background === 'url("/sprites/minesweeper-sprites_cell.jpg")') {

            bombsLeftCount--;
            const bombsLeftString = bombsLeftCount.toString().split('');
            // appendBombs.setAttribute('src', `/sprites/minesweeper-sprites_${bombsLeftString[1]}.jpg`);
            // appendTensBombs.setAttribute('src', `/sprites/minesweeper-sprites_${bombsLeftString[0]}.jpg`);
            if (bombsLeftCount < 10) {
                // appendBombs.setAttribute('src', `/sprites/minesweeper-sprites_${bombsLeftString[0]}.jpg`);
                // appendTensBombs.setAttribute('src', '/sprites/minesweeper-sprites_0.jpg');
            }
            if (bombsLeftCount <= 0) {
                // appendBombs.setAttribute('src', '/sprites/minesweeper-sprites_0.jpg');
            }
            e.target.style.background = 'url("/sprites/minesweeper-sprites_mine(defused).jpg")';
            return;
        }
        if (e.target.style.background === 'url("/sprites/minesweeper-sprites_mine(defused).jpg")') {
            e.target.style.background = 'url("/sprites/minesweeper-sprites_mine(question).jpg")';
            return;
        }
    }

    return (
        <button className={`cell_${props.id}_${props.isBomb}`}
            onClick={
                (ev) => {
                    if (ev.target.tagName !== 'BUTTON') {
                        return;
                    }


                    const index = props.id
                    const column = index % props.width;
                    const row = Math.floor(index / props.width);

                    function firstMoveValidator() {
                        if (firstMoveValidator.isRun) {
                            return false
                        }
                        if (index === props.isBomb) {
                            // const propsAfterFirstMove = props.splice(props.indexOf(prop), 1, prop += 1);
                            console.log('bomb, gotta think how to fix it');
                        }

                        firstMoveValidator.isRun = true;
                    }
                    firstMoveValidator();
                    clickCell(ev, row, column);
                    return;
                }
            }
            onContextMenuCapture={
                (ev) => {
                    if (ev.target.tagName !== 'BUTTON') {
                        return;
                    }
                    ev.preventDefault();
                    console.log(`index of this cell is ${props.id}, so yeah, right click works just fine!`);
                    markMine(ev);
                    return;
                }
            }></button>
    )
};

export default Cell;
