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


        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow" as RequestRedirect
        };

        fetch(`https://api.ipgeolocation.io/v2/astronomy?apiKey=` + process.env.API_KEY + `&lat=${region?.latitude}&long=${region?.longitude}&elevation=10`, requestOptions)
            .then((response) => response.json())
            .then((result: AstronomyDataType) => {
                setData(result)
                console.log(result)
            })
            .catch((error) => console.error(error));
    }

    return (
        <View style={styles.container}>
            <Text style={styles.infoText}>Current time = {data?.current_time}</Text>
            <Text style={styles.infoText}>{data?.sunrise}</Text>
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