import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

interface IProps {
    latLang: google.maps.LatLngLiteral
}

type GoogleMapType = google.maps.Map | null;

const containerStyle = {
  width: '100%',
  height: '400px'
};

const Map = ({ latLang }: IProps) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || ''
  });

  const [, setMap] = React.useState<GoogleMapType>(null);

  const onLoad = React.useCallback(function callback(map: GoogleMapType) {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback() {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={latLang}
      onLoad={onLoad}
      zoom={16}
      onUnmount={onUnmount}
    >
      <Marker position={latLang}/>
    </GoogleMap>
  ) : <></>;
};

export default React.memo(Map);
