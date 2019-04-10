import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import RootStack, {MainAppContainer} from "./navigator/Router";
import TestStack from "./activities/TestActivity";

export default class App extends Component {
    render() {
        return <MainAppContainer />;
    }
}
