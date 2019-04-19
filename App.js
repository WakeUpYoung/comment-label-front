import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ToastAndroid, BackHandler} from 'react-native';
import {LoginNavigator, MainAppContainer} from "./navigator/Router";
import TestActivity from "./activities/TestActivity";
import AsyncStorage from '@react-native-community/async-storage';

export default class App extends Component {

    async hasLogin() {
        try {
            const userJson = await AsyncStorage.getItem('user');
            if (userJson !== null) {
                let user = JSON.parse(userJson)
            // TODO 保存用户到Global
            }
        } catch (error) {
            console.warn(JSON.stringify(error))
        }
    }

    render() {
        return <TestActivity />;
    }
}
