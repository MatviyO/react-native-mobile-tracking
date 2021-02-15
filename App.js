import React from 'react';
import {HomeScreen, PatientScreen} from "./screens";
import {createAppContainer} from "react-navigation";
import { createStackNavigator} from 'react-navigation-stack'

const AppNavigator = createStackNavigator({
    Home: {
        screen: HomeScreen
    },
    Patient: {
        screen: PatientScreen
    }
    },
    {
        initialRouteName: 'Home'
    })
;

export default createAppContainer(AppNavigator)
