import React, { useState, useEffect } from "react";


const HeaderTable = () => {
    const [minefield, setMinefield] = useState([]);

    useEffect(() => {
        const getMinefield = async () => {
            const minefield = await document.querySelector(".App-minefield");
            setMinefield(minefield);
        }
        getMinefield();

    }, [])
    function restart() {
        window.location.reload();
        minefield.style['pointer-events'] = 'auto';
        return;
    }
    return (
        <div className="App-header">
            <div className="App-header-counter">
                <img className="App-header-counter-img-0" src="/sprites/minesweeper-sprites_0.jpg" alt="counter-0" />
                <img className="App-header-counter-img-1" src="/sprites/minesweeper-sprites_4.jpg" alt="counter-1" />
                <img className="App-header-counter-img-2" src="/sprites/minesweeper-sprites_0.jpg" alt="counter-2" />
            </div>
            <button className="App-header-smiley-Btn"
                onMouseDown={
                    (ev) => {
                        ev.target.style.background = "url('/sprites/minesweeper-sprites_smiley(clicked).jpg')"
                    }}
                onMouseUp={
                    (ev) => {
                        ev.target.style.background = "url('/sprites/minesweeper-sprites_smiley.jpg')"
                    }}
                    onClick={restart}></button>
            <div className="App-header-timer">
                <img className="App-header-timer-img-0" src="/sprites/minesweeper-sprites_0.jpg" alt="timer-0" />
                <img className="App-header-timer-img-1" src="/sprites/minesweeper-sprites_0.jpg" alt="timer-1" />
                <img className="App-header-timer-img-2" src="/sprites/minesweeper-sprites_0.jpg" alt="timer-2" />
            </div>
        </div>);
}

export default HeaderTable;