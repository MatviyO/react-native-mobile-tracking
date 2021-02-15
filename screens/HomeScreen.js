import React, { useState, useEffect } from 'react'
import {View, Text} from "react-native";
import styled from "styled-components/native";
import * as Location from 'expo-location';
import * as TaskManager from "expo";


const HomeScreen = ({navigation}) => {

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        setInterval(() => {
            (async () => {
                let { status } = await Location.requestPermissionsAsync();
                if (status !== 'granted') {
                    setErrorMsg('Permission to access location was denied');
                    return;
                }

                let location = await Location.getCurrentPositionAsync({});
                setLocation(location.coords);
                console.log(location.coords)
                console.log(typeof location.coords)
            })();
        }, 5000)

    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }

    const TASK_FETCH_LOCATION = 'TASK_FETCH_LOCATION';

// 1 define the task passing its name and a callback that will be called whenever the location changes
    TaskManager.defineTask(TASK_FETCH_LOCATION, async ({ data: { locations }, error }) => {
        if (error) {
            console.error(error);
            return;
        }
        const [location] = locations;
        try {
            const url = `https://<your-api-endpoint>`;
            await axios.post(url, { location }); // you should use post instead of get to persist data on the backend
        } catch (err) {
            console.error(err);
        }
    });

// 2 start the task
    Location.startLocationUpdatesAsync(TASK_FETCH_LOCATION, {
        accuracy: Location.Accuracy.Highest,
        distanceInterval: 1, // minimum change (in meters) betweens updates
        deferredUpdatesInterval: 1000, // minimum interval (in milliseconds) between updates
        // foregroundService is how you get the task to be updated as often as would be if the app was open
        foregroundService: {
            notificationTitle: 'Using your location',
            notificationBody: 'To turn off, go back to the app and switch something off.',
        },
    });

// 3 when you're done, stop it
    Location.hasStartedLocationUpdatesAsync(TASK_FETCH_LOCATION).then((value) => {
        if (value) {
            Location.stopLocationUpdatesAsync(TASK_FETCH_LOCATION);
        }
    });


   return (
       <Container>

           <GroupItem>
               <View >
                   <Text>{text}</Text>
               </View>
           </GroupItem>

       </Container>
   )
}


const GroupItem = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 20px;
  border-bottom-width: 1px;
  border-bottom-color: #f3f3f3;
  margin-bottom: 50px;
`;


HomeScreen.navigationOptions = {
    title: 'Patients',
    headerColor: '#2A86FF',
    headerTransparent: false,
    headerStyle: {
        elevation: 0.5,
        shadowOpacity: 0.5
    }
}
export default HomeScreen;

const Container = styled.View`
  flex: 1;
`;
