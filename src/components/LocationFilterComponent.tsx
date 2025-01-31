import Select from 'react-select';
import { Label } from 'reactstrap';
import TilesInput from './TilesInput';
import useLocationFilter from './useLocationFilter';
import { useEffect } from 'react';

interface LocationFilterComponentProps {
  handleZipCodesFromFilter: (zipCodes: string[]) => void
}

const LocationFilterComponent: React.FC<LocationFilterComponentProps> = ({ handleZipCodesFromFilter }) => {
  const {
    cities,
    cityQuery,
    states,
    stateQuery,
    geoLocations,
    geoQuery,
    selectedCities,
    selectedStates,
    selectedGeoLocations,
    handleCitySearch,
    handleStateSearch,
    handleGeoSearch,
    setSelectedCities,
    setSelectedStates,
    setSelectedGeoLocations,
    setZipCodesFromInput,
    zipCodes
  } = useLocationFilter();

  useEffect(() => {
    handleZipCodesFromFilter(zipCodes)
  }, [zipCodes])

  return (
    <div>
      {/* City Search with React-Select */}
      <div>
        {/* <input
          type="text"
          value={cityQuery}
          onChange={(e) => handleCitySearch(e.target.value)}
          placeholder="Search by City"
        /> */}
        <Label for="sortOrder">City</Label>
        <Select
          isMulti
          options={cities}
          value={selectedCities}
          // onChange={(selected) => setSelectedCities(selected)}
          onChange={(newValue: any) => setSelectedCities(newValue)}
          onInputChange={(newVal: any) => handleCitySearch(newVal)}
          placeholder="Select Cities"
        />
      </div>

      {/* State Search with React-Select */}
      <div>
        {/* <input
          type="text"
          value={stateQuery}
          onChange={(e) => handleStateSearch(e.target.value)}
          placeholder="Search by State"
        /> */}
        <Label for="sortOrder">State</Label>
        <Select
          isMulti
          options={states}
          value={selectedStates}
          onChange={(newVal: any) => setSelectedStates(newVal)}
          onInputChange={(newVal: any) => handleStateSearch(newVal)}
          placeholder="Select States"
        />
      </div>

      <div>
        <Label for="sortOrder">Zip Code</Label>
        <TilesInput setZipCodesFromInput={setZipCodesFromInput} />
      </div>

      {/* Geo-location Search with React-Select */}
      {/* <div> */}
        {/* <input
          type="text"
          value={geoQuery}
          onChange={(e) => handleGeoSearch(e.target.value)}
          placeholder="Search by Geo Location"
        /> */}
        {/* <Label for="sortOrder">Geolocation</Label>
        <Select
          isMulti
          options={geoLocations}
          value={selectedGeoLocations}
          onChange={(newVal: any) => setSelectedGeoLocations(newVal)}
          placeholder="Select Geo Locations"
        /> */}
      {/* </div> */}

      {/* Display selected zip codes */}
      <div>
        <h3>Selected Zip Codes:</h3>
        <ul>
          {zipCodes.length > 0 ? (
            zipCodes.map((zip) => <li key={zip}>{zip}</li>)
          ) : (
            <li>No zip codes selected.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default LocationFilterComponent;