
interface TypeProps {
    type_name:string
}
const ModuleOutline = ({type_name}:TypeProps)=>{
    return (<p className="type-outline text-center text-2xl">{type_name}</p>)
}
export default ModuleOutline

