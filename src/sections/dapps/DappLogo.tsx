const DappLogo = (dappImg:string) => {
    return (
        <div className="p-1 w-10 h-10">
        <img className="rounded-sm  " src={`dapps/${dappImg}`} alt="dapp-img" />
        </div>
    )

}
export default DappLogo;