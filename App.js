import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {RootNavigator, MainAppContainer} from "./navigator/Router";
import TestActivity from "./activities/TestActivity";

export default class App extends Component {
    render() {
        return <MainAppContainer />;
    }
}
