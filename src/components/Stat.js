import { format_large_number } from '../hooks/formatting';

export default function Stat(props){
    return(
        <div className="">
            <p className={`text-xl text-${props.color}`}>{props.format?format_large_number(props.value):props.value} {props.unit?props.unit:''}</p>
            <p className='text-sm inline-block opacity-80'>{props.name}</p>
        </div>
    );

}