import Cell from './Cell';

const Minefield = () => {

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
        <>
            {cellsArray.map((cell) => (
                <Cell
                    key={cell.index}
                    id={cell.index}
                    isBomb={cell.isBomb}
                    width={cell.width}
                    height={cell.height}
                    bombsQuantity={cell.bombsQuantity}
                    bombsLocation={cell.bombsLocation}
                />
            ))}
        </>
    )
}

export default Minefield;