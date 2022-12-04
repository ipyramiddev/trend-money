import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import ModalWrapper from './ModalWrapper';
import { BASE_TYPES } from "BaseStyles";
import axios from "axios";
const SEAM_SERVER = "http://127.0.0.1:5000";

function AddDappModal() {
  const [open, setOpen] = useState(true);
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [address, setAddress] = useState('');
  const [category, setCategory] = useState('');
    const [response, setResponse] = useState('');

const doSubmit = async () => {
    const res = await axios.post(SEAM_SERVER+"/add-dapp", 
      {
        name:name,
        url: url,
        description:description,
        image:image,
        address:address,
        category:category,
      },
    );
    setResponse(res.data.message);
  }


  const cancelButtonRef = useRef(null);
  return (
    <ModalWrapper open={open} setOpen={setOpen} cancelButtonRef={cancelButtonRef} title="tets">

      {/* Create inputs to add dapp name, address, url and image */}
        <div className="flex flex-col gap gap-2">
            <p className="text-center text-3xl"> Submit A Dapp </p>
            <p className="text-center text-sm"> (beta-under manual review) </p>
        <input className={BASE_TYPES.BASE_INPUT} type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className={BASE_TYPES.BASE_INPUT} type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
        <input className={BASE_TYPES.BASE_INPUT} type="text" placeholder="Url" value={url} onChange={(e) => setUrl(e.target.value)} />
        <input className={BASE_TYPES.BASE_INPUT} type="text" placeholder="Image url " value={image} onChange={(e) => setImage(e.target.value)} />
        <input className={BASE_TYPES.BASE_INPUT} type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <input className={BASE_TYPES.BASE_INPUT} type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
        <button className='seam-button w-full'
            onClick={doSubmit}
        >Submit</button>
        <p className="text-center text-3xl"> {response.toString()} </p>
        </div>
    </ModalWrapper>
  );
}
export default AddDappModal;
