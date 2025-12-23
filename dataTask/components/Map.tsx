import React from 'react';
import MapView,{Region, Marker} from 'react-native-maps';
import { View, StyleSheet } from 'react-native';

//Map takes latitude and longitude as props in the future
interface MapProps {
    region: Region
}

export default function Map({region}: MapProps) {
  return (
    <MapView
      style={styles.map}
      region={region}>

        <Marker
          coordinate={{latitude: region.latitude, longitude: region.longitude}}
          title={"You are here"}
        />        
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});