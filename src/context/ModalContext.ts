
import useModal from "hooks/useModal";
import { createContext, useContext } from "react";
 
// Create a context to access these from different components within the app
// use via <ModalContextConsumer/> + provider
export interface ModalContext{
  showModal: boolean;
  // modalContent:any;
  // setIsOpen: (isOpen: boolean) => void || undefined;
}
const context = createContext<ModalContext>({showModal:false});
export const ModalContextProvider = context.Provider;
export const ModalContextConsumer = context.Consumer;

export const useModalContext = (content:any, setShow:(isOpen:boolean)=>void) => {
  // const context1 = useContext<ModalContext>(context);
  const { modal, handleModal, modalContent} =useModal(content)

  if (!context) {
    throw new Error("useModalContext must be used within a modalContext");
  }
  return {modal,};
};
