import { useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

import { ModalComponentProps, FiltersState } from '../../ts_types'

const ModalComponent = <T extends object = {}>(props: ModalComponentProps) => {

  const {
    isModalOpen,
    modalTitle,
    handleToggleModal,
    handleApplyFilters,
    handleResetChanges,
    modalComponent: ModalComponent,
    modalComponentProps = {} as T,
    hideModalFooter,
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
          {...(modalComponentProps as T)}
        />
      </ModalBody>
      {!hideModalFooter &&
        // <ModalFooter>
        //   <Button onClick={handleApplyChanges}>Apply Changes</Button>
        // </ModalFooter>
        <ModalFooter className="justify-content-between">
          <Button color="secondary" onClick={handleResetChanges}>Reset Locations</Button>
          <Button color="primary" onClick={handleApplyChanges}>Apply Changes</Button>
      </ModalFooter>
      }
    </Modal> 
  )
}

export default ModalComponent;