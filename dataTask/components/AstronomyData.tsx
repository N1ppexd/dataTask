import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AstronomyDataType } from '../types/astronomyType'
import { Region } from 'react-native-maps'

type Props = {
    region?: Region
}

export default function AstronomyData({ region }: Props) {

    const [data, setData] = useState<AstronomyDataType | null>(null)

    useEffect(() => {

        //call the function to fetch data
        fetchAstronomyInfo();

    }, [region])


    async function fetchAstronomyInfo(): Promise<void> {
        const myHeaders = new Headers();

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow" as RequestRedirect
        };

        console.log('latitude ' + region?.latitude)


        await fetch(`https://api.ipgeolocation.io/v2/astronomy?apiKey=${process.env.API_KEY}&lat=${region?.latitude}&long=${region?.longitude}&elevation=10`, requestOptions)
            .then((response) => {
                
                if(!response.ok){
                    throw console.error("response is not ok");
                }
                return response.json();

            })
            .then((result: any) => {
                console.log(result)
                try{

                    const astronomyData: AstronomyDataType = {
                        date: result.astronomy.date,
                        current_time: result.astronomy.current_time,
                        sunrise: result.astronomy.sunrise,
                        sunset: result.astronomy.sunset,
                        sun_status: result.astronomy.sun_status,
                        day_length: result.astronomy.day_length,
                        sun_altitude: result.astronomy.sun_altitude,
                        moon_phase: result.astronomy.moon_phase,
                        moonrise: result.astronomy.moonrise,
                        moon_altitude: result.astronomy.moon_altitude,
                        moon_illumination_percentage: result.astronomy.moon_illumination_percentage
                    }
                    setData(astronomyData)
                }
                catch{
                    throw new Error("not ok");
                }
                
            })
            .catch((error) => console.error(error));
    }

    return (
        <View style={styles.box}>
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
             <Text style={styles.infoText}>Date = {data?.date}</Text>
             <Text style={styles.infoText}>Current time = {data?.current_time}</Text>
             <Text style={styles.infoText}>Sunrise time = {data?.sunrise}</Text>
             <Text style={styles.infoText}>Sunset time = {data?.sunset}</Text>
             <Text style={styles.infoText}>Sun status = {data?.sun_status}</Text>
             <Text style={styles.infoText}>Day length = {data?.day_length}</Text>
             <Text style={styles.infoText}>Sun altitude = {data?.sun_altitude}</Text>
             <Text style={styles.infoText}>Moon phase = {data?.moon_phase}</Text>
             <Text style={styles.infoText}>Moonrise time = {data?.moonrise}</Text>
             <Text style={styles.infoText}>Moon altitude = {data?.moon_altitude}</Text>
             <Text style={styles.infoText}>Moon illumination = {data?.moon_illumination_percentage}%</Text>
            </ScrollView>
        </View>
     )
 }
 
 const styles = StyleSheet.create({
 
    box: {
        position: 'absolute',
        top: 20,
        right: 20,
        width: 320,
        maxHeight: '70%',
        backgroundColor: '#ffffffcc',
        borderRadius: 10,
        padding: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
     container: {
        alignItems: 'flex-start',
        width: '100%',
        paddingVertical: 6,
    },
     infoText:{
         fontSize: 16,
         alignContent: 'center',
         alignItems: 'center',
         color: '#000',
     }
 
 })