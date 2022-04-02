import StackedWrapper from '../components/StackedWrapper';
import CurrentPool from './CurrentPool';
import UserPositions from './UserPositions';
import RecentPools from './RecentPools';

function format_tvl(tvl) {
    if (tvl === null) {
        return '-';
    }
    tvl = tvl.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return "$" + tvl;
}

export default function Tvl(props) {
    return(
        <div className="m-10">
        <StackedWrapper>
            <div className="m-6 text-white text-center">
                <div className="text-4xl pb-4">
                    <p>TVL: {format_tvl(props.stats.tvl_usd)}</p>
                </div>
                <p className="text-2xl">24h vol. {format_tvl(props.stats.vol_24h)}</p>
                
                <p> Total Interest Earned : ${props.stats.total_interest}</p>
                </div>
                <div className="grid grid-cols-2 content-center">
                    <div className="p-2">
                    <CurrentPool {...props.current_pool}/>
                    <RecentPools previous_pools={props.previous_pools}/>
                    </div>
                    <div className="p-2">
                    <UserPositions {...props.user}/>
                    </div>
                </div>

        </StackedWrapper>
        </div>
    );
}