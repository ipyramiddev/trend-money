interface Props {
    address: string;
    module_name: string;
    func_name: string;
}

const TxnHeader = ({ address, module_name, func_name }: Props) => {
    return (
        <div className="flex flex-row justify-between items-center">
            {/* Address */}
            <p className="account-outline text-bold text-xl">{address}</p>

            {/* Module */}
            <p className="module-outline text-bold text-xl">{module_name}</p>

            {/* Function */}
            <p className="function-outline">{func_name}</p>
        </div>
    );
};

export default TxnHeader;