import React, {Component} from 'react';
import {createAppContainer, createStackNavigator} from "react-navigation";
import LoginActivity from "../activities/LoginActivity";
import ForgetActivity from "../activities/ForgetActivity";

const RootStack = createStackNavigator(
    {
        Login : {
            screen : LoginActivity
        },
        Forget : {
            screen : ForgetActivity
        }

    },
    {
        initialRouteName : "Login" ,
        mode: 'modal',
        headerMode: 'none',
    }
);

export default createAppContainer(RootStack);