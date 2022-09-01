import Validators from "sections/staking/Validators";

const Staking = () => {
    return (
        <div className="w-full h-screen items-start">
            <p>Staking</p>
            <Validators/>        
        </div>
    )

}

const StakingPool = () => {
    return (<div className="w-full seam-outline roundex-2xl text-white">
    </div>);
}

export default Staking;