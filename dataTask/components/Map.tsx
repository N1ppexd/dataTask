import React, { useEffect } from 'react';
import MapView,{Region, Marker} from 'react-native-maps';
import { View, StyleSheet } from 'react-native';
import AstronomyData from './AstronomyData';

//Map takes latitude and longitude as props in the future
interface MapProps {
    region: Region
}

export default function Map({region}: MapProps) {


  const [currentRegion, setCurrentRegion] = React.useState<Region>(region);

  useEffect(() => {
    setCurrentRegion(region);
  }, []);


  return (
    <View style={{ flex: 1, width: '100%' }}>
      <MapView
        style={styles.map}
        region={region}
        onPress={(newRegion) => {
          setCurrentRegion({
            latitude: newRegion.nativeEvent.coordinate.latitude,
            longitude: newRegion.nativeEvent.coordinate.longitude, latitudeDelta: region.latitudeDelta, longitudeDelta: region.longitudeDelta
          })
        }}
      >

        <Marker
          coordinate={{ latitude: currentRegion.latitude, longitude: currentRegion.longitude }}
          title={"You are here"}
        />

      </MapView>
      <AstronomyData region={currentRegion} />
    </View>

  );
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});