interface PoolProps {
    pool: any;
}
export const StakingPool = ({ pool }: PoolProps) => {

    // const protocols = pool.

    return (<div className="w-full seam-outline roundex-2xl text-white">
        <div className='flex flex-row justify-between'>
            <h1 className="text-3xl">{pool.name}</h1>
            <div className='flex flex-row justify-end gap gap-4'>
                {/* <BarChart/> */}
                <div className="stat place-items-center">
                    {/* <div className="stat-value">{props.avg_apr_24h}</div> */}
                    <div className="stat-title">apr 24h.</div>
                </div>
                <div className="stat place-items-center">
                    {/* <div className="stat-value">{props.avg_apr_7d}</div> */}
                    <div className="stat-title">apr 7d.</div>
                </div>
            </div>
        </div>
    </div>);
};
