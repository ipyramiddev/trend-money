// file for component to show pool showcase



export default function PoolShowcase(props) {
    return (
        <div className="p-3 transform ">
            <p className="text-white  text-center text-3xl"> Simplified, fragmented deposits across top celo apps</p>
            <div className="flex items-center text-white justify-center">
                <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2 xl:max-w-6xl max-w-4xl">
                    {props.apps.map((app, index) => {
                        return (<div className="flex bg-white bg-opacity-30 rounded-lg p-4 m-2 transition duration-500 hover:scale-110 hover:bg-opacity-20" >
                            <div className="h-14 w-auto bg-gray-400 rounded-lg">
                                <img src={app.img_src} className="w-full h-full" alt="" />
                            </div>
                            <div className="flex flex-col items-start ml-4">
                                <h4 className="text-xl font-semibold">{app.name}</h4>
                                <p className="text-sm">{app.description}</p>
                                <a className="p-2 leading-none rounded font-medium mt-3 bg-gray-400 text-xs " href="/pool_view">view pools</a>
                            </div>
                        </div>);
                    })}

                </div>
            </div>
        </div>)

}