// import React, { useState, useCallback } from "react";
// import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

// const mapContainerStyle = {
//   width: "100%",
//   height: "500px",
// };

// const center = {
//   lat: 37.7749, // Default to San Francisco
//   lng: -122.4194,
// };


// const GoogleMapComponent: React.FC = () => {
//   console.log('process.env.REACT_APP_GOOGLE_MAPS_API_KEY',process.env.REACT_APP_GOOGLE_MAPS_API_KEY)
  
//   const { isLoaded, loadError } = useLoadScript({
//     googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ''
//   });

//   const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);

//   const handleMapClick = useCallback((event: google.maps.MapMouseEvent) => {
//     if (event.latLng) {
//       setSelectedLocation({
//         lat: event.latLng.lat(),
//         lng: event.latLng.lng(),
//       });
//     }
//   }, []);

//   if (loadError) return <p>Error loading maps</p>;
//   if (!isLoaded) return <p>Loading maps...</p>;

//   return (
//     <div>
//       <GoogleMap
//         mapContainerStyle={mapContainerStyle}
//         zoom={10}
//         center={center}
//         onClick={handleMapClick} // Capture clicks on the map
//       >
//         {selectedLocation && <Marker position={selectedLocation} />}
//       </GoogleMap>
//       {selectedLocation && (
//         <p>
//           Selected Location: <strong>Lat:</strong> {selectedLocation.lat}, <strong>Lng:</strong> {selectedLocation.lng}
//         </p>
//       )}
//     </div>
//   );
// };

// export default GoogleMapComponent;




import React, { useState, useCallback } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: 37.7749, // Default to San Francisco
  lng: -122.4194,
};

const GoogleMapBoundingBox: React.FC<any> = ({ handleGeoSearch }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ''
  });

  const [boundingBox, setBoundingBox] = useState<any>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  // console.log('boundingBox',JSON.stringify(boundingBox))

  // Store the map instance when it loads
  const onLoad = useCallback((mapInstance: google.maps.Map) => {
    setMap(mapInstance);
  }, []);

  // Get bounds when map is changed
  const handleBoundsChange = useCallback(() => {
    if (!map) return; // Ensure map is available
    const bounds = map.getBounds();
    if (bounds) {
      // console.log('bounds',bounds.getNorthEast().lat(), bounds.getNorthEast().lng())
      // setBoundingBox({
      //   top: { lat: bounds.getNorthEast().lat(), lon: bounds.getNorthEast().lng() },
      //   left: { lon: bounds.getSouthWest().lng(), lat: bounds.getSouthWest().lat() },
      //   bottom: { lat: bounds.getSouthWest().lat(), lon: bounds.getSouthWest().lng() },
      //   right: { lon: bounds.getNorthEast().lng(), lat: bounds.getNorthEast().lat() },
      // });
      const geoBoundingBox = {
        // top: { lat: bounds.getNorthEast().lat(), lon: bounds.getCenter().lng() }, // Center longitude
        // bottom: { lat: bounds.getSouthWest().lat(), lon: bounds.getCenter().lng() },
        // left: { lat: bounds.getCenter().lat(), lon: bounds.getSouthWest().lng() }, // Center latitude
        // right: { lat: bounds.getCenter().lat(), lon: bounds.getNorthEast().lng() },
        bottom_left: { lat: bounds.getSouthWest().lat(), lon: bounds.getSouthWest().lng() },
        top_right: { lat: bounds.getNorthEast().lat(), lon: bounds.getNorthEast().lng() },
        // top_right: { lat: bounds.getNorthEast().lat(), lon: bounds.getNorthEast().lng() .getSouthWest().lng() },
        // top_left: { lat: bounds.getNorthEast().lat(), lon: bounds.getSouthWest().lng() },
      };
      setBoundingBox(geoBoundingBox)
      handleGeoSearch(geoBoundingBox)
    }
  }, [map]); // Dependency on map ensures it updates correctly

  if (loadError) return <p>Error loading maps</p>;
  if (!isLoaded) return <p>Loading maps...</p>;

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
        onLoad={onLoad} // Capture map instance
        onBoundsChanged={handleBoundsChange} // Fetch bounds only when map exists
      />
      {/* {boundingBox && (
        <div style={{ marginTop: "10px", textAlign: "center" }}>
          <h3>GeoBoundingBox:</h3>
          <pre>{JSON.stringify(boundingBox, null, 2)}</pre>
        </div>
      )} */}
    </div>
  );
};

export default GoogleMapBoundingBox;

// {
//   "breeds": [],
//   "size": 24,
//   "from": 0,
//   "sort": "breed:asc",
//   "ageMin": 0,
//   "ageMax": 20,
//   "zipCodes": [],
//   "geoBoundingBox": {
//       "top": {
//           "lat": 38.04577191316302,
//           "lon": -122.4194
//       },
//       "bottom": {
//           "lat": 37.50303202107141,
//           "lon": -122.4194
//       },
//       "left": {
//           "lat": 37.774401967117214,
//           "lon": -123.309292578125
//       },
//       "right": {
//           "lat": 37.774401967117214,
//           "lon": -121.529507421875
//       },
//       "bottom_left": {
//           "lat": 37.50303202107141,
//           "lon": -123.309292578125
//       },
//       "top_left": {
//           "lat": 38.04577191316302,
//           "lon": -123.309292578125
//       }
//   }
// }
