import React from "react";

interface ModalContextType {
  isModal: boolean;
  openModal: () => void;
  closeModal: () => void;
}

interface ModalStateType {
  children: React.ReactNode;
}

export const ModalContext = React.createContext<ModalContextType>({
  isModal: false,
  openModal: () => {},
  closeModal: () => {},
});

export const ModalProvider = (props: ModalStateType) => {
  const [isModal, setIsModal] = React.useState(false);
  const openModal = () => setIsModal(true);
  const closeModal = () => setIsModal(false);

  return <ModalContext.Provider value={{ isModal, openModal, closeModal }}>{props.children}</ModalContext.Provider>;
};
