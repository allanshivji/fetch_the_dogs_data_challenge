import { useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

import { ModalComponentProps, FiltersState } from '../../ts_types';
import IntlMessages from '../common/IntlMessages';

const ModalComponent = <T extends object = {}>(props: ModalComponentProps) => {
  const {
    isModalOpen,
    modalTitle,
    handleToggleModal,
    handleApplyFilters,
    handleResetChanges,
    modalComponent: ModalComponent,
    modalComponentProps = {} as T,
    showApplyAllButton,
    showResetButton,
    updateCities,
    updateStates,
    updateZipCodes,
    updateGeoLocations
  } = props;

  const [tempSelectedFilters, setTempSelectedFilters] = useState<FiltersState>({
    selectedCities: [],
    selectedStates: [],
    selectedZipCodes: [],
    selectedGeoLocations: []
  });

  const handleApplyChanges = () => {
    updateCities(tempSelectedFilters.selectedCities);
    updateStates(tempSelectedFilters.selectedStates);
    updateZipCodes(tempSelectedFilters.selectedZipCodes);
    updateGeoLocations(tempSelectedFilters.selectedGeoLocations);
    handleApplyFilters(tempSelectedFilters);
  };

  return (
    <Modal
      isOpen={isModalOpen}
      toggle={() => handleToggleModal(null)}
      size="lg"
    >
      <ModalHeader toggle={() => handleToggleModal(null)}>
        <IntlMessages id={modalTitle} />
      </ModalHeader>
      <ModalBody>
        <ModalComponent
          tempSelectedFilters={tempSelectedFilters}
          setTempSelectedFilters={setTempSelectedFilters}
          {...(modalComponentProps as T)}
        />
      </ModalBody>
      {(showApplyAllButton || showResetButton) && (
        <ModalFooter className="justify-content-between">
          {showResetButton && (
            <Button color="secondary" onClick={handleResetChanges}>
              <IntlMessages id="button.reset-loctions" />
            </Button>
          )}
          {showApplyAllButton && (
            <Button color="primary" onClick={handleApplyChanges}>
              <IntlMessages id="button.apply-changes" />
            </Button>
          )}
        </ModalFooter>
      )}
    </Modal>
  );
};

export default ModalComponent;
