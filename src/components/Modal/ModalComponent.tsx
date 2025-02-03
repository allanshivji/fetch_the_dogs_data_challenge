import { FC } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';

interface ModalComponentProps {
  isModalOpen: boolean;
  modalTitle: string;
  handleToggleModal: () => void;
  handleAllZipCodes: (zipCodes: string[]) => void;
  modalComponent: FC<{ handleAllZipCodes: (zipCodes: string[]) => void }>
}

const ModalComponent: FC<ModalComponentProps> = (props) => {

  const {
    isModalOpen,
    modalTitle,
    handleToggleModal,
    handleAllZipCodes,
    modalComponent: ModalComponent 
  } = props

  return (
     <Modal isOpen={isModalOpen} toggle={handleToggleModal}>
      <ModalHeader toggle={handleToggleModal}>{modalTitle}</ModalHeader>
      <ModalBody>
        <ModalComponent handleAllZipCodes={handleAllZipCodes} />
      </ModalBody>
    </Modal> 
  )
}

export default ModalComponent;