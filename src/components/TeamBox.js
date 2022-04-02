export default function TeamBox(props) {
    return (
        <div className="p-4 m-5 items-center text-center bg-team-box-img bg-contain bg-no-repeat bg-top rounded-3xl">
            <p className="text-5xl"> {props.emoji}</p>
            <p className="text-3xl"> {props.name}</p>
            <div className="pt-3 pb-4 px-3">
                <p className="opacity-50">Roles + resp.</p>
                {props.roles.map(role => {
                    return (
                        <p className="text-center text-lg"> {role}</p>
                    );
                })}
            </div>

        </div>
    );
}