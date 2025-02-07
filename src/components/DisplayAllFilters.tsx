import { FiltersState, DisplayAllFiltersProps, SelectOption } from "../ts_types";

const DisplayAllFilters = (props: DisplayAllFiltersProps) => {
  const { 
    stateFilters,
    handleApplyFilters,
    updateCities,
    updateStates,
    updateZipCodes,
    updateGeoLocations
  } = props;

  const removeFilter = (key: string, labelToRemove: string) => {
    const filtersAfterRemoval = { 
      ...stateFilters,
      [key]: stateFilters[key as keyof FiltersState].filter((item: SelectOption) => item.label !== labelToRemove)
    }
    updateCities(filtersAfterRemoval.selectedCities)
    updateStates(filtersAfterRemoval.selectedStates)
    updateZipCodes(filtersAfterRemoval.selectedZipCodes)
    updateGeoLocations(filtersAfterRemoval.selectedGeoLocations)
    handleApplyFilters(filtersAfterRemoval, true)
  };

  return (
    <div>
      {/* {Object.keys(allFilters).map((key) => ( */}
      {Object.keys(stateFilters).map((key) => (
        <div key={key}>
          {/* <h3>{key.toUpperCase()}:</h3> */}
          {/* Render the labels as tiles with X button */}
          <div>
            {/* {allFilters[key as keyof FiltersState].map((option: SelectOption) => ( */}
            {stateFilters[key as keyof FiltersState].map((option: SelectOption) => (
              <span key={option.label} style={{ margin: '5px', display: 'inline-block' }}>
                <span
                  style={{
                    padding: '5px 10px',
                    border: '1px solid #ccc',
                    borderRadius: '15px',
                    backgroundColor: '#f0f0f0',
                    display: 'inline-flex',
                    alignItems: 'center',
                  }}
                >
                  {option.label}
                  <button
                    onClick={() => removeFilter(key, option.label)}
                    style={{
                      marginLeft: '5px',
                      backgroundColor: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'red',
                    }}
                  >
                    X
                  </button>
                </span>
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default DisplayAllFilters;