import { mobiPoolLink } from '../hooks/useExplorer';
export default function MobiIcon(props) {
    const link =mobiPoolLink(props.address);
    return (
        <a href={link}>
      <div className="h-10 p-2 w-10 justify-center mt-2 rounded-lg bg-black">

          <img className="object-fit" src="../mobius.png" alt="mobius" />
      </div>  </a>
);}