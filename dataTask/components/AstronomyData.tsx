import { View, Text, StyleSheet } from 'react-native'
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

    }, [])


    async function fetchAstronomyInfo(): Promise<void> {
        const myHeaders = new Headers();
        myHeaders.append("x-api-key", String(process.env.API_KEY));

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow" as RequestRedirect
        };

        fetch(`https://api.ipgeolocation.io/v2/astronomy?lat=${region?.latitude}&long=${region?.longitude}&elevation=10`, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                return response.json();
            })
            .then((result: any) => {
                const astronomyData: AstronomyDataType = {
                    date: result.date,
                    current_time: result.current_time,
                    sunrise: result.sunrise,
                    sunset: result.sunset,
                    sun_status: result.sun_status,
                    day_length: result.day_length,
                    sun_altitude: result.sun_altitude,
                    moon_phase: result.moon_phase,
                    moonrise: result.moonrise,
                    moon_altitude: result.moon_altitude,
                    moon_illumination_percentage: result.moon_illumination_percentage
                };
                setData(astronomyData);
                console.log(astronomyData);
            })
            .catch((error) => console.error(error));
    }

    return (
        <View style={styles.container}>
            <Text style={styles.infoText}>Current time = {data?.current_time}</Text>
            <Text style={styles.infoText}>Sunrise time = {data?.sunrise}</Text>
        </View>
    )
}

const styles = StyleSheet.create({

    container:
    {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 10,
        borderRadius: 10,
    },
    infoText:{
        fontSize: 16,
        alignContent: 'center',
        alignItems: 'center',
        color: 'white',
    }

})