import React, { useEffect } from 'react';
import MapView,{Region, Marker} from 'react-native-maps';
import { View, StyleSheet } from 'react-native';
import AstronomyData from './AstronomyData';

//Map takes latitude and longitude as props in the future
interface MapProps {
    region: Region
}

export default function Map({region}: MapProps) {


  useEffect(() => {
    console.log("Map region updated:", region);
  }, [region]);


  return (
    <MapView
      style={styles.map}
      region={region}
      onRegionChangeComplete={(newRegion) => region=newRegion}
      >

        <Marker
          coordinate={{latitude: region.latitude, longitude: region.longitude}}
          title={"You are here"}
        />
        <AstronomyData region={region} />
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});