import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

interface IProps {
  propertiesMapInfo: Array<{
    coordinates: google.maps.LatLngLiteral
    id: number;
  }>
}

type GoogleMapType = google.maps.Map | null;

const containerStyle = {
  width: '100%',
  height: '100vh'
};

const DashboardMap = ({ propertiesMapInfo }: IProps) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || ''
  });

  const [, setMap] = React.useState<GoogleMapType>(null);

  const onLoad = React.useCallback(function callback(map: GoogleMapType) {
    setMap(map);
    if (map) {
      const bounds = new window.google.maps.LatLngBounds();

      if (propertiesMapInfo.length > 0) {
        propertiesMapInfo.forEach((propertyMapInfo) => {
          const marker = new google.maps.Marker({
            position: {
              lat: propertyMapInfo.coordinates.lat,
              lng: propertyMapInfo.coordinates.lng
            },
            map: map
          });
          const markerPosition = marker.getPosition();
          markerPosition && bounds.extend(markerPosition);
        });
      }
      map?.fitBounds(bounds);
    }
  }, [propertiesMapInfo]);

  const onUnmount = React.useCallback(function callback() {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      onLoad={onLoad}
      zoom={16}
      onUnmount={onUnmount}
      >
      {propertiesMapInfo.map((propertyMapInfo) => (
        <Marker key={propertyMapInfo.id} position={propertyMapInfo.coordinates}/>))}
    </GoogleMap>
  ) : <></>;
};

export default React.memo(DashboardMap);
