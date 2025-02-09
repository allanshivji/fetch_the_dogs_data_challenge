import { useState, useCallback, useEffect } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";

import { GeoLocationFilterProps, SelectOption, Location } from '../../ts_types';
import { searchLocations } from '../../services/api';
import { debounceSearch } from '../../services/debounceSearch';

const mapContainerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: 37.7749, // Default to San Francisco
  lng: -122.4194,
};

const GeoLocationFilter = (props: GeoLocationFilterProps) => {

  const { setTempSelectedFilters, tempSelectedFilters } = props

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [boundingBoxOptions, setBoundingBoxOptions] = useState<SelectOption[]>([]);

  useEffect(() => {
    setTempSelectedFilters({ ...tempSelectedFilters, selectedGeoLocations: boundingBoxOptions })
  }, [boundingBoxOptions])


  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ''
  });

  const onLoad = useCallback((mapInstance: google.maps.Map) => {
    setMap(mapInstance);
  }, []);

   const fetchOptions = async (inputValue: string) => {
    if (!inputValue) return;

    try {
      const response = await searchLocations({ geoBoundingBox: inputValue })
      const locations = response.results as Location[];

      const fetchedGeo: SelectOption[] = locations.map(loc => ({
        label: `${loc.city}, ${loc.state} - ${loc.zip_code}`,
        value: loc.zip_code,
      }));
      setBoundingBoxOptions(fetchedGeo)

    } catch (error) {
      console.error(`Error fetching options:`, error);
      setBoundingBoxOptions([])
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
        bottom_left: { lat: bounds.getSouthWest().lat(), lon: bounds.getSouthWest().lng() },
        top_right: { lat: bounds.getNorthEast().lat(), lon: bounds.getNorthEast().lng() },
      };
      debouncedFetch(geoBoundingBox)
    }
  }, [map]);

  if (loadError) return <p>Error loading maps</p>;
  if (!isLoaded) return <p>Loading maps...</p>;

  return (
    <>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        options={{ streetViewControl: false }}
        center={center}
        onLoad={onLoad} // Capture map instance
        onBoundsChanged={handleBoundsChange} // Fetch bounds only when map exists
        onZoomChanged={handleBoundsChange}
      />
      <div style={{ fontWeight: 'bold', fontSize: '18px' }}>{'Locations:'}</div>
      {boundingBoxOptions.length > 0 &&
        boundingBoxOptions.map((option: SelectOption) => option.label).join(', ')
      }
    </>
  )
}

export default GeoLocationFilter;