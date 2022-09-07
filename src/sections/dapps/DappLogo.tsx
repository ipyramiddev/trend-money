const DappLogo = (dappImg:string) => {
    return (
        <div className="p-1 w-8 h-8">
        <img className="rounded-sm  " src={`dapps/${dappImg}`} alt="dapp-img" />
        </div>
    )

}
export default DappLogo;