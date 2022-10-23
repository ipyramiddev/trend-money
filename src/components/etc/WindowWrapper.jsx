const WindowWrapper = ({children}) =>{
    return (<div className="w-full min-w-full">
            <div className="mockup-window border-pink  px-6 py-4  mockup-window-outline border-4 shadow-xl  shadow-pink  w-full pt-2 m-3">
                {children}
            </div>
            </div>)
}

export default WindowWrapper;