
import useModal from "hooks/useModal";
import { createContext, useContext } from "react";
 
// Create a context to mange the state of the dapp ui and iframe


export interface DappContext{
    // selectDapp: (dapp: Dapp) => void;
    dapp: Dapp | null;
    isHome: boolean;
    // isHome: boolean;
    // goHome: () => void;
    // goBack: () => void;
    // goForward: () => void;

}


const context = createContext<DappContext>({
    
    dapp: null,
    isHome: true,
});
export const DappContextProvider = context.Provider;
export const DappContextConsumer = context.Consumer;

export const useDappContext = () => {
  const context1 = useContext<DappContext>(context);
//   const { modal, handleModal, modalContent} =useModal(content)

    const selectDapp=(dapp: Dapp|null)=>{ 
      if (dapp){
        console.log("selectDapp",dapp)
        context1.isHome=false;
        context1.dapp = dapp;
      }
      else {context1.isHome=true}
      console.log("context1",context1)
    }
    const toggleHome=()=>{
      context1.isHome=!context1.isHome;
    }


  if (!context) {
    throw new Error("useDapp context must be used with DppProvider");
  }
  return { ...context1, selectDapp,toggleHome };
};
