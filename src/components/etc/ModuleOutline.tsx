
interface ModProps {
    module_name:string
}
const ModuleOutline = ({module_name}:ModProps)=>{
    return (
        <div className="px-3">
    <p className="module-outline text-center text-2xl">{module_name}</p>
    </div>)
}
export default ModuleOutline
