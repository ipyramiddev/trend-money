
interface DappFrameProps {
    dapp: Dapp;


}

const DappHeader = (dapp:Dapp) =>{
    return(<div className="flex flex-row gap gap-2 items-center text-baseline px-4">
    <p className="text-2xl">{dapp.name}</p>
    <img className="rounded-lg w-12 h-12 " src={`./dapps/${dapp.image}`} alt="dapp-img" />
    </div>);

}

const DappFrame = ({dapp}:DappFrameProps) => {

    return (
        <div className="">
            {DappHeader(dapp)}
        <div className="mockup-window flex flex-row w-full py-6">
            
        <iframe className="scrollbar rounded-xl  scrollbar-thumb-pink scrollbar-track-blue" 
            width={'100%'}
            height={'800px'}
            title="host" src={dapp.url}/>
        </div>
        </div>
    )
}

export default DappFrame;