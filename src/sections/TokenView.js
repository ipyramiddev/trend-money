import { useQuery } from '@apollo/react-hooks';
import { UBE_OVERVIEW_QUERY } from '../hooks/queries/ubeQueries';

function TokenView(){
    // const { open, setOpen } = useState(true);

    const today = new Date()
    const yesterday = new Date(today)

    yesterday.setDate(yesterday.getDate() - 2)
    const time = yesterday.toLocaleDateString();

    const { loading, error, data } = useQuery(UBE_OVERVIEW_QUERY,
        { variables: { $day: time, $topN: 10 } });
        if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.toString()}</p>;

    const pairs = data.pairDayDatas;
    localStorage.setItem('ube_pairs', JSON.stringify(pairs));
    return data.pairDayDatas.slice(0,10).map((pairDayData,i) => {
        return (<div key={i} >
            eee
                </div>)
    })
}

export default TokenView;