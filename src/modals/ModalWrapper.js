import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';


function ModalWrapper(props) {

    return (
        <Transition.Root show={props.open} as={Fragment}>
            <Dialog
                as="div"
                className="fixed z-10 inset-0 overflow-y-auto text-black"
                initialFocus={props.cancelButtonRef}
                onClose={() => props.setOpen(false)}
            >
                <div
                    className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block
         sm:p-0"
                >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed  top-0 bg-white inset-0 w bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-400"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div
                            className="inline-block align-bottom bg-white rounded-lg
               text-left 
            overflow-hidden shadow-xl 
            transform transition-all 
            "
                        >
                            <div className="bg-black seam-outline text-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-center">

                                    <div className="mt-3 text-center">
                                        {/* <p className="text-2xl font-medium ">
                                            {props.title}
                                        </p> */}
                                        <div className="mt-2">
                                            
                                            <div>
                                                {props.children}
                                                <button
                                                    type="button"
                                                    className="px-3 inline-flex justify-center"
                                                    onClick={() => props.setOpen(false)}
                                                    ref={props.cancelButtonRef}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
export default ModalWrapper;