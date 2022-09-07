const DappLogo = (dappImg:string) => {
    return (
        <img className="rounded-lg w-12 h-12 " src={`.dapps/${dappImg}`} alt="dapp-img" />
    )

}
export default DappLogo;