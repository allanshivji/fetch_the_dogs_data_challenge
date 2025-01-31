import { useState, useEffect } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';
import { searchLocations } from '../services/api'

// Interface for Location (zip code and related information)
interface Location {
  zip_code: string;
  city: string;
  state: string;
}

interface Option {
  label: string;
  value: string;
}

const useLocationFilter = () => {
  const [cityQuery, setCityQuery] = useState<string>('');
  const [stateQuery, setStateQuery] = useState<string>('');
  const [geoQuery, setGeoQuery] = useState<string>('');
  const [cities, setCities] = useState<Option[]>([]);
  const [states, setStates] = useState<Option[]>([]);
  const [geoLocations, setGeoLocations] = useState<Option[]>([]);
  const [selectedCities, setSelectedCities] = useState<Option[]>([]);
  const [selectedStates, setSelectedStates] = useState<Option[]>([]);
  const [selectedGeoLocations, setSelectedGeoLocations] = useState<Option[]>([]);
  const [zipCodesFromInput, setZipCodesFromInput] = useState<string[]>([])
  const [zipCodes, setZipCodes] = useState<string[]>([]);
  // console.log('selectedCities',selectedCities)

  // Debounced search for cities
  const debouncedSearchCity = debounce(async (query: string) => {
    try {
      const response = await searchLocations({ city: query })
      const locations = response.results as Location[];
      const fetchedCities = locations.map(loc => ({
        label: `${loc.city}, ${loc.state} - ${loc.zip_code}`,
        value: loc.zip_code,
      }));
      setCities(fetchedCities);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  }, 1000);

  // Debounced search for states
  const debouncedSearchState = debounce(async (query: string) => {
    try {
      const response = await searchLocations({ states: [query] })
      const locations = response.results as Location[];
      const fetchedStates = locations.map(loc => ({
        label: `${loc.state} - ${loc.zip_code}`,
        value: loc.zip_code,
      }));
      setStates(fetchedStates);
    } catch (error) {
      console.error('Error fetching states:', error);
    }
  }, 500);

  // Debounced search for geo-location bounding box (if applicable)
  const debouncedSearchGeo = debounce(async (query: string) => {
    try {
      const response = await axios.post(
        'https://frontend-take-home-service.fetch.com/locations/search',
        { geoBoundingBox: query, size: 10 }
      );
      const locations = response.data.results as Location[];
      const fetchedGeo = locations.map(loc => ({
        label: `${loc.city}, ${loc.state} - ${loc.zip_code}`,
        value: loc.zip_code,
      }));
      setGeoLocations(fetchedGeo);
    } catch (error) {
      console.error('Error fetching geo locations:', error);
    }
  }, 500);

  // Handle city input change
  const handleCitySearch = (query: string) => {
    setCityQuery(query);
    debouncedSearchCity(query);
  };

  // Handle state input change
  const handleStateSearch = (query: string) => {
    setStateQuery(query);
    debouncedSearchState(query);
  };

  // Handle geo input change
  const handleGeoSearch = (query: string) => {
    setGeoQuery(query);
    debouncedSearchGeo(query);
  };

  // Combine zip codes from selected cities, states, and geo-locations
  const getSelectedZipCodes = () => {
    const allSelected = [
      ...selectedCities.map(city => city.value),
      ...selectedStates.map(state => state.value),
      ...selectedGeoLocations.map(loc => loc.value),
      ...zipCodesFromInput
    ];
    return allSelected;
  };

  // Effect to update zip codes and trigger dog search
  useEffect(() => {
    const zipCodes = getSelectedZipCodes();
    setZipCodes(zipCodes);
  }, [selectedCities, selectedStates, selectedGeoLocations, zipCodesFromInput]);

  return {
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
    zipCodes,
    setZipCodesFromInput
  };
};

export default useLocationFilter;