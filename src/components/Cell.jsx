

const Cell = (props) => {

console.log(props.cellState, props.id);
    return (
        <button className={`cell_${props.id}_${props.isBomb}`}></button>
    )
};

export default Cell;
