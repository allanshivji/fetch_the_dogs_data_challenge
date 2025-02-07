import { useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

import { ModalComponentProps, FiltersState } from '../../ts_types'

const ModalComponent = (props: ModalComponentProps) => {

  const {
    isModalOpen,
    modalTitle,
    handleToggleModal,
    handleApplyFilters,
    modalComponent: ModalComponent,
    updateCities,
    updateStates,
    updateZipCodes,
    updateGeoLocations
  } = props

  const [tempSelectedFilters, setTempSelectedFilters] = useState<FiltersState>({ selectedCities: [], selectedStates: [], selectedZipCodes: [], selectedGeoLocations: [] })

  const handleApplyChanges = () => {
    updateCities(tempSelectedFilters.selectedCities)
    updateStates(tempSelectedFilters.selectedStates)
    updateZipCodes(tempSelectedFilters.selectedZipCodes)
    updateGeoLocations(tempSelectedFilters.selectedGeoLocations)
    handleApplyFilters(tempSelectedFilters)
  }

  return (
     <Modal isOpen={isModalOpen} toggle={handleToggleModal} size='lg'>
      <ModalHeader toggle={handleToggleModal}>{modalTitle}</ModalHeader>
      <ModalBody>
        <ModalComponent 
          tempSelectedFilters={tempSelectedFilters}
          setTempSelectedFilters={setTempSelectedFilters} 
        />
      </ModalBody>
      <ModalFooter>
        <Button onClick={handleApplyChanges}>Apply Changes</Button>
      </ModalFooter>
    </Modal> 
  )
}

export default ModalComponent;