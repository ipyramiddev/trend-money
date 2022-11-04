import React from "react";

export default (modalType:any) => {
  let [modal, setModal] = React.useState(false);
  let [modalContent, setModalContent] = React.useState(modalType);

  let handleModal = (content = false) => {
    setModal(!modal);
    if (content) {
      setModalContent(content);
    }
  };

  return { modal, handleModal, modalContent };
};

