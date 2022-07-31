function AssetDetails(props) {
    const { asset } = props.asset;

    return (
        <div className="p-2">
            <div className="flex flex-row">
                <p>{asset.name}</p>
                <p>{asset.symbol}</p>
                <img src="" />
            </div>
            <div className="flex flex-row">
                <div class="stat place-items-center">
                    <div class="stat-value">{asset.price}</div>
                    <div class="stat-title">price</div>
                </div>
            </div>
        </div>
    );
}

