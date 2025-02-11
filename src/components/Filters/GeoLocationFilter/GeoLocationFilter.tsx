import { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';

import {
  GeoLocationFilterProps,
  SelectOption,
  Location
} from '../../../ts_types';
import { API } from '../../../services/api.service';
import { debounceSearch } from '../../../services/debounce-search';
import { GEO_LOCATION_FILTER_INITIAL_COORD } from '../../../constants/general.constants';
import IntlMessages from '../../common/IntlMessages';

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const GeoLocationFilter = (props: GeoLocationFilterProps) => {
  const { setTempSelectedFilters, tempSelectedFilters } = props;

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [boundingBoxOptions, setBoundingBoxOptions] = useState<SelectOption[]>(
    []
  );

  useEffect(() => {
    setTempSelectedFilters({
      ...tempSelectedFilters,
      selectedGeoLocations: boundingBoxOptions
    });
  }, [boundingBoxOptions]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: API_KEY || ''
  });

  const onLoad = useCallback((mapInstance: google.maps.Map) => {
    setMap(mapInstance);
  }, []);

  const fetchOptions = async (inputValue: string) => {
    if (!inputValue) return;

    try {
      const response = await API.SEARCH_LOCATIONS({
        geoBoundingBox: inputValue
      });
      const locations = response.data.results as Location[];

      const fetchedGeo: SelectOption[] = locations.map((loc) => ({
        label: `${loc.city}, ${loc.state} - ${loc.zip_code}`,
        value: loc.zip_code
      }));
      setBoundingBoxOptions(fetchedGeo);
    } catch (error) {
      console.error(`Error fetching options:`, error);
      setBoundingBoxOptions([]);
    }
  };

  const debouncedFetch = useCallback(
    debounceSearch((inputValue: string) => fetchOptions(inputValue)),
    []
  );

  const handleBoundsChange = useCallback(() => {
    if (!map) return; // Ensure map is available

    const bounds = map.getBounds();
    if (bounds) {
      const geoBoundingBox = {
        bottom_left: {
          lat: bounds.getSouthWest().lat(),
          lon: bounds.getSouthWest().lng()
        },
        top_right: {
          lat: bounds.getNorthEast().lat(),
          lon: bounds.getNorthEast().lng()
        }
      };
      debouncedFetch(geoBoundingBox);
    }
  }, [map]);

  if (!API_KEY) {
    return (
      <div className="p-4 border border-red-500 bg-red-100 rounded-md">
        <h3 className="text-red-700 font-semibold mb-2">
          <IntlMessages id="error.map-config-error-title" />
        </h3>
        <p className="text-red-600">
          <IntlMessages id="error.map-display-error" />
        </p>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="p-4 border border-red-500 bg-red-100 rounded-md">
        <h3 className="text-red-700 font-semibold mb-2">
          <IntlMessages id="error.map-loading-error-title" />
        </h3>
        <p className="text-red-600">
          {loadError.message || <IntlMessages id="error.map-load-error" />}
        </p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="p-4 border border-blue-200 bg-blue-50 rounded-md">
        <p className="text-blue-700">
          <IntlMessages id="error.map-loading-maps" />
        </p>
      </div>
    );
  }

  return (
    <>
      <GoogleMap
        mapContainerStyle={{
          width: '100%',
          height: '500px'
        }}
        zoom={13}
        options={{ streetViewControl: false }}
        center={GEO_LOCATION_FILTER_INITIAL_COORD}
        onLoad={onLoad} // Capture map instance
        onBoundsChanged={handleBoundsChange} // Fetch bounds only when map exists
        onZoomChanged={handleBoundsChange}
      />
      <div style={{ fontWeight: 'bold', fontSize: '18px' }}>{'Locations:'}</div>
      {boundingBoxOptions.length > 0 &&
        boundingBoxOptions
          .map((option: SelectOption) => option.label)
          .join(', ')}
    </>
  );
};

export default GeoLocationFilter;
