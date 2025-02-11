import FilterTag from './FilterTag';
import ModalComponentContainer from '../../Modal/ModalComponentContainer';
import DisplayAllFiltersView from './DisplayAllFiltersView';
import {
  FiltersState,
  SelectOption,
  FiltersViewProps
} from '../../../ts_types';
import { MAX_VISIBLE_DISPLAY_FILTERS } from '../../../constants/general.constants';

const FiltersView = (props: FiltersViewProps) => {
  const {
    isModalOpen,
    stateFilters,
    handleApplyFilters,
    updateCities,
    updateStates,
    updateZipCodes,
    updateGeoLocations,
    handleToggleModal
  } = props;

  const handleRemoveAllFilters = () => {
    const initialFiltersState = {
      selectedCities: [],
      selectedStates: [],
      selectedZipCodes: [],
      selectedGeoLocations: []
    };
    handleApplyFilters(initialFiltersState, true);
  };

  const removeFilter = (key: string, labelToRemove: string) => {
    const filtersAfterRemoval = {
      ...stateFilters,
      [key]: stateFilters[key as keyof FiltersState].filter(
        (item: SelectOption) => item.label !== labelToRemove
      )
    };
    updateCities(filtersAfterRemoval.selectedCities);
    updateStates(filtersAfterRemoval.selectedStates);
    updateZipCodes(filtersAfterRemoval.selectedZipCodes);
    updateGeoLocations(filtersAfterRemoval.selectedGeoLocations);
    handleApplyFilters(filtersAfterRemoval, true);
  };

  const filterArrays = Object.values(stateFilters) as SelectOption[][];
  const totalFilters = filterArrays.reduce(
    (acc, filters) => acc + filters.length,
    0
  );

  const visibleFilters = [];
  let count = 0;

  for (const key of Object.keys(stateFilters)) {
    for (const option of stateFilters[key as keyof FiltersState]) {
      if (count < MAX_VISIBLE_DISPLAY_FILTERS) {
        visibleFilters.push({ key, option });
        count++;
      }
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        {visibleFilters.map(({ key, option }) => (
          <FilterTag
            key={`${key}-${option.label}`}
            filterKey={key}
            option={option}
            removeFilter={removeFilter}
          />
        ))}

        {totalFilters > MAX_VISIBLE_DISPLAY_FILTERS && (
          <>
            <button
              onClick={() => handleToggleModal('displayAllFilters')}
              className="text-blue-600 extra-filters"
              style={{
                background: 'none',
                border: 'none',
                padding: '0px',
                cursor: 'pointer'
              }}
            >
              ...{totalFilters - MAX_VISIBLE_DISPLAY_FILTERS} more filters
            </button>

            <ModalComponentContainer
              isModalOpen={isModalOpen === 'displayAllFilters'}
              modalTitle="modal.title-all-filter"
              handleToggleModal={() => handleToggleModal(null)}
              modalComponent={DisplayAllFiltersView}
              modalComponentProps={{
                stateFilters,
                removeFilter
              }}
              showApplyAllButton={false}
              showResetButton={true}
              handleApplyFilters={handleApplyFilters}
              handleResetChanges={handleRemoveAllFilters}
              updateCities={updateCities}
              updateStates={updateStates}
              updateZipCodes={updateZipCodes}
              updateGeoLocations={updateGeoLocations}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default FiltersView;
