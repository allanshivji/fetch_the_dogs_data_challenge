import { FC, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

import { updateCities, updateStates, updateZipCodes } from '../../actions';
import { ModalComponentProps, FiltersState, SelectOption } from '../../ts_types'

const ModalComponent = (props: ModalComponentProps) => {

  const {
    isModalOpen,
    modalTitle,
    handleToggleModal,
    handleApplyFilters,
    modalComponent: ModalComponent,
    updateCities,
    updateStates,
    updateZipCodes
  } = props

  const [tempSelectedFilters, setTempSelectedFilters] = useState<FiltersState>({ selectedCities: [], selectedStates: [], selectedZipCodes: [] })

  const handleApplyChanges = () => {
    updateCities(tempSelectedFilters.selectedCities)
    updateStates(tempSelectedFilters.selectedStates)
    updateZipCodes(tempSelectedFilters.selectedZipCodes)
    handleApplyFilters(tempSelectedFilters)
  }

  return (
     <Modal isOpen={isModalOpen} toggle={handleToggleModal}>
      <ModalHeader toggle={handleToggleModal}>{modalTitle}</ModalHeader>
      <ModalBody>
        <ModalComponent 
          tempSelectedFilters={tempSelectedFilters}
          setTempSelectedFilters={setTempSelectedFilters} 
        />
      </ModalBody>
      <ModalFooter>
        {/* <Button onClick={handleAllZipCodes}>Apply Changes</Button> */}
        <Button onClick={handleApplyChanges}>Apply Changes</Button>
      </ModalFooter>
    </Modal> 
  )
}

const mapDispatchStateToProps = (dispatch: any) => ({
  updateCities: (cities: SelectOption[]) => dispatch(updateCities(cities)),
  updateStates: (states: SelectOption[]) => dispatch(updateStates(states)),
  updateZipCodes: (zipCodes: SelectOption[]) => dispatch(updateZipCodes(zipCodes))
})

export default connect(
  null,
  mapDispatchStateToProps
)(ModalComponent);

// export default ModalComponent;