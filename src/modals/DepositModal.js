import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import ModalWrapper from './ModalWrapper';


function DepositModal(props) {
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);
  return (
    <ModalWrapper open={open} setOpen={setOpen} cancelButtonRef={cancelButtonRef} title="tets">

      {/* show seam pool name */}

      {/* small boxes each sub-pool  */}
      <p>content</p>

      {/* APPROVE SPEND Button */}

      {/* DEPOSIT button */}

    </ModalWrapper>
  );
}
export default DepositModal;
