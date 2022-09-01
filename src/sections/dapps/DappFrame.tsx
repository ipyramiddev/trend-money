
interface DappFrameProps {
    dapp: Dapp;


}

const DappFrame = ({dapp}:DappFrameProps) => {

    return (
        <div className="mockup-window flex flex-row w-full py-6">
            
        <iframe className="scrollbar rounded-xl  scrollbar-thumb-pink scrollbar-track-blue" 
            width={'100%'}
            height={'800px'}
            title="host" src={dapp.url}/>
        </div>
    )
}

export default DappFrame;