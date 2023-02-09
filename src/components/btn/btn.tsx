import "./btn.css";

type btnProps={
    label: string;
    onClick?: () => void;
};

const Btn = ({label, onClick}:btnProps):JSX.Element => {
    return (
        <div>
            <div className="bttn out cyan">
                <span><button className="animation-btn" onClick={onClick}>{ label }</button></span>
                <div className="corners top"></div>
                <div className="corners bottom"></div>
            </div>  
        </div>
    );
}

export default Btn;