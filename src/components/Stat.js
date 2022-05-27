import { format_large_number } from '../hooks/formatting';
import { AiOutlineInfoCircle } from 'react-icons/ai';
export default function Stat(props) {
    return (
        <div className="inline-block">
            <p className={`text-xl text-${props.color}`}>{props.format ? format_large_number(props.value) : props.value} {props.unit ? props.unit : ''}</p>
            <div className='flex flex-row gap-2 text-sm inline opacity-80'>
                {props.name}
                <AiOutlineInfoCircle />
            </div>

        </div>
    );

}