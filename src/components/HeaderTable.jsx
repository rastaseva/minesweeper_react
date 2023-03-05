const HeaderTable = () => {
    return (
        <div className="App-container-header">
            <div className="App-container-header-counter">
                <img className="App-container-header-counter-img-0" src="/sprites/minesweeper-sprites_0.jpg" alt="counter-0" />
                <img className="App-container-header-counter-img-1" src="/sprites/minesweeper-sprites_4.jpg" alt="counter-1" />
                <img className="App-container-header-counter-img-2" src="/sprites/minesweeper-sprites_0.jpg" alt="counter-2" />
            </div>
            <button className="App-container-header-smiley-Btn"></button>
            <div className="App-container-header-timer">
                <img className="App-container-header-timer-img-0" src="/sprites/minesweeper-sprites_0.jpg" alt="timer-0" />
                <img className="App-container-header-timer-img-1" src="/sprites/minesweeper-sprites_0.jpg" alt="timer-1" />
                <img className="App-container-header-timer-img-2" src="/sprites/minesweeper-sprites_0.jpg" alt="timer-2" />
            </div>
        </div>);
}

export default HeaderTable;