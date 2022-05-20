



function UserHeader(user) {
    return (
            <div className="flex flex-col p-3 m-3  bg-white rounded-lg text-left justify-between bg-opacity-20">
                <p className="text-lg sm:text-xs opacity-70">Welcome back</p>
                <p className="text-2xl sm:text-lg text-yellow1">{user.walletAddress}</p>
                
            </div>
            )
}
export default UserHeader;