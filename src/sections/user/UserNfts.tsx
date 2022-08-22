const UserNfts = ({ collections, nfts, collection_count,sent_count, minted_count, }: UserNfts) => {

    return (
        <div className="flex flex-col p-1 rounded-lg text-left items-start justify-start">
        <div className="flex flex-row justify-start gap gap-4">
            <div className="user-stat">
                <p className="text-4xl">{collection_count}</p>
                <p className="text-sm opacity-60">collections created</p>
            </div>
            <div className="user-stat">
                <p className="text-4xl">{minted_count}</p>
                <p className="text-sm opacity-60">nfts Minted</p>
            </div>
            <div className="user-stat">
                <p className="text-4xl">{sent_count}</p>
                <p className="text-sm opacity-60">nfts sent</p>
            </div>
        </div>
        </div>
    )
}

export default UserNfts;