import Token from '../Token';
import { format_price } from '../../hooks/formatting';
function AssetPrice(props: any){
    return (
        <div key={`${props.asset}-${props.key}`}className="flex flex-row  h-14 items-left outline outline-2 rounded-lg px-2 py-1">
            <Token size="7" token={props.token} />
            <div className="">
                <p className="text-lg font-bold">{format_price(props.price)}</p>
                <p className="text-xs opacity-80">usd / {props.token}</p>

                {/* <div className="text-xs">{props.price_change}</div> */}
            </div>
        </div>
    )


}
export default AssetPrice;