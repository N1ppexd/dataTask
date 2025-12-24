import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Map from './components/Map';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Region } from 'react-native-maps';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

export default function App() {

  const latitudeDelta : number = 0.0922;
  const longitudeDelta : number = 0.0421;
  
  const [region, setRegion] = useState<Region>({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: latitudeDelta,
    longitudeDelta: longitudeDelta,
  });

  useEffect(() => {
    // Request location permissions and get current location
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: latitudeDelta,
        longitudeDelta: longitudeDelta,
      });
    })();
  }, []);
  
  return (
    <SafeAreaView style={styles.container}>
      <Map region={region} />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
