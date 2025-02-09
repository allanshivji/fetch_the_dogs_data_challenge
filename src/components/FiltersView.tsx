import FilterTag from './FilterTag';
import ModalComponentContainer from './Modal/ModalComponentContainer';
import DisplayAllFiltersView from './DisplayAllFiltersView';
import { FiltersState, SelectOption, FiltersViewProps } from '../ts_types';

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
    }
    handleApplyFilters(initialFiltersState, true)
  }

  const removeFilter = (key: string, labelToRemove: string) => {
    const filtersAfterRemoval = { 
      ...stateFilters,
      [key]: stateFilters[key as keyof FiltersState].filter((item: SelectOption) => item.label !== labelToRemove)
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
  );;

  // Get first 5 filters for display
  const visibleFilters = [];
  let count = 0;
  
  for (const key of Object.keys(stateFilters)) {
    for (const option of stateFilters[key as keyof FiltersState]) {
      if (count < 5) {
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
        
        {totalFilters > 5 && (
          <>
            <button
              onClick={() => handleToggleModal('displayAllFilters')}
              className="text-blue-600 hover:text-blue-800"
            >
              ...{totalFilters - 5} more filters
            </button>

            <ModalComponentContainer
              isModalOpen={isModalOpen === 'displayAllFilters'}
              modalTitle="All Filters"
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