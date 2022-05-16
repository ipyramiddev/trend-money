import { ubePoolLink } from '../hooks/useExplorer';
export default function MobiIcon(props) {
    const link =ubePoolLink(props.address);
    return (
        <a href={link}>
      <div className="h-10 p-2 w-10  rounded-lg hover:bg-gradient-to-br from-blue to-pink hover:bg-opacity-70">

          <img className="object-fit" src="../mobius.png" alt="mobius" />
      </div>  </a>
);}