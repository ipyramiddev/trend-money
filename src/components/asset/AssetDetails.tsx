function AssetDetails(props: any) {
  const { asset } = props.asset;

  return (
    <div className="p-2">
      <div className="flex flex-row">
        <p>{asset.name}</p>
        <p>{asset.symbol}</p>
        <img src="" />
      </div>
      <div className="flex flex-row">
        <div className="stat place-items-center">
          <div className="stat-value">{asset.price}</div>
          <div className="stat-title">price</div>
        </div>
      </div>
    </div>
  );
}
