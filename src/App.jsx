import './App.css';
import Minefield from './components/Minefield';
import HeaderTable from './components/HeaderTable';


function App() {
    return (
        <div className="App">
            <HeaderTable />
            <Minefield />
            <div className="App-rules">
                <h2>Hey! Let's play minesweeper!</h2>
                <h3>Here's how to do it:</h3>
                <p>Left click to open cell in the field</p>
                <p>Right click to mark the cell with mine (if you're sure)</p>
                <p>Right click on the cell with mine again to mark it with question (if you're not sure)</p>
                <p>You'll win when there's no cells left to click and only these with mines are</p>
            </div>
        </div>
    );
}

export default App;
