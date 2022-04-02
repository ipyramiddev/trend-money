export default function StackedWrapper(props) {
    return (
        <div className="flex flex-row content-center">
            <div className="bg-yellow rounded-2xl stack-section-item w-full">
                <div className="bg-blue stack-section-item w-full">
                    <div className="bg-purple stack-section-item text-left  w-full">
                        {props.children}
                    </div>

                    <div>

                    </div>
                </div>
            </div>
        </div>);
}