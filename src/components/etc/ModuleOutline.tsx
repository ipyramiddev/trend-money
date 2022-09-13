
interface ModProps {
    module_name:string
}
const ModuleOutline = ({module_name}:ModProps)=>{
    return (<p className="module-outline text-center">{module_name}</p>)
}
export default ModuleOutline
