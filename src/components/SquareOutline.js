export default function SquareOutline(props){
    return (
        <div className="p-3 m-3 ">
            <div className={`text-white text-md text-bold bg-${props.color}`}>
                <p>{props.text}</p>
            </div>
        </div>);

}