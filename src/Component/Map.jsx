import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '15px'
};


const center = {
  lat: 23.8103, 
  lng: 90.4125
};

function MapComponent() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCG9M4Ppb42CbTV57ixaCkO_ICt42pNxK8" 
  })

  return isLoaded ? (
      <div className="p-4 bg-[#020314]  border border-white/10">
        <h3 className="text-white text-4xl font-bold mb-4 text-center">Our Location</h3>
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
        >
          
            <Marker position={center} />
        </GoogleMap>
      </div>
  ) : <div className="text-white">Loading Map...</div>
}

export default React.memo(MapComponent)