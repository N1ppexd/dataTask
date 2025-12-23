import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AstronomyDataType } from '../types/astronomyType'

export default function AstronomyData() {

    const [data, setData] = useState<AstronomyDataType | null>(null)

    useEffect(() => {


        async function fetchAstronomyInfo(): Promise<void> {
            const myHeaders = new Headers();


            const requestOptions = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow" as RequestRedirect
            };

            fetch(`https://api.ipgeolocation.io/v2/astronomy?apiKey=${process.env.API_KEY}&location=New%20York%2C%20US&elevation=10`, requestOptions)
                .then((response) => response.json())
                .then((result) => setData(result))
                .catch((error) => console.error(error));
        }


    }, [])

    return (
        <View>
            <Text>astronomyData</Text>
            <Text>{data?.current_time}</Text>
        </View>
    )
}