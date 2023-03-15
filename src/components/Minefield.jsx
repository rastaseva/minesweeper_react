import React, { useState, useEffect, useContext } from 'react';
import CellCopy from './CellCopy';


let onceCalled = false;

let Interval;

let seconds = '00';
let tens = '00'

const Minefield = () => {
    const [smiley, setSmiley] = useState();
    const [timer, setTimer] = useState([]);
    const [count, setCount] = useState([]);

    useEffect(() => {
        const getSmiley = async () => {
            const smiley = await document.querySelector('.App-header-smiley-Btn');

            setSmiley(smiley)
        }
        const getTableNumbers = async () => {

            let appendBombs = await document.querySelector('.App-header-counter-img-2');
            let appendTensBombs = await document.querySelector(".App-header-counter-img-1");
            let appendHundredsBombs = await document.querySelector(".App-header-counter-img-0");

            let appendSeconds = await document.querySelector('.App-header-timer-img-2');
            let appendTensSeconds = await document.querySelector(".App-header-timer-img-1");
            let appendHundredsSeconds = await document.querySelector(".App-header-timer-img-0");
            setTimer([appendSeconds, appendTensSeconds, appendHundredsSeconds]);
            setCount([appendBombs, appendTensBombs, appendHundredsBombs]);
        }

        getTableNumbers();
        getSmiley();

    }, [])




    function start() {
        clearInterval(Interval);
        Interval = setInterval(startTimer, 10)
    }

    function startTimer() {
        tens++;
        if (tens > 99) {
            seconds++;
            timer[0].setAttribute('src', `sprites/minesweeper-sprites_${seconds}.jpg`);
            tens = 0;
        }
        if (seconds > 9) {
            const tens = seconds.toString().split('');
            timer[0].setAttribute('src', `sprites/minesweeper-sprites_${tens[1]}.jpg`);
            timer[1].setAttribute('src', `sprites/minesweeper-sprites_${tens[0]}.jpg`);
        }
        if (seconds > 99) {
            const hundreds = seconds.toString().split('');
            timer[0].setAttribute('src', `sprites/minesweeper-sprites_${hundreds[2]}.jpg`);
            timer[1].setAttribute('src', `sprites/minesweeper-sprites_${hundreds[1]}.jpg`);
            timer[2].setAttribute('src', `sprites/minesweeper-sprites_${hundreds[0]}.jpg`);

        }
    }

    const width = 16;
    const height = 16;
    const bombsQuantity = 40;

    const cellsCount = width * height;


    const cellsArray = [];
    const bombs = [...Array(cellsCount).keys()]
        .sort(() => Math.random() - 0.5)
        .slice(0, bombsQuantity);

    for (let i = 0; i < cellsCount; i++) {
        const cell = {}
        cell.isBomb = 0;
        cell.index = i;
        cell.bombsQuantity = bombsQuantity;
        cell.bombsLocation = bombs;
        cell.width = width;
        cell.height = height;

        for (let bomb in bombs) {
            if (i === bombs[bomb]) {
                cell.isBomb = bombs[bomb];
            }
        }
        cellsArray.push(cell)
    }

    return (
        <div className="App-minefield"
            onMouseDown={
                () => {
                    smiley.style.background = "url('/sprites/minesweeper-sprites_smiley(field-clicked).jpg')"
                }}
                onClick={start}
                onContextMenuCapture={start}
            onMouseUp={
                () => {
                    smiley.style.background = "url('/sprites/minesweeper-sprites_smiley.jpg')"
                }}>
            {cellsArray.map((cell) => (
                <CellCopy
                    key={cell.index}
                    id={cell.index}
                    isBomb={cell.isBomb}
                    bombs={bombs}
                    timer={timer}
                    count={count}
                    interval={Interval}
                />
            ))}
        </div>
    )
}

export default Minefield;