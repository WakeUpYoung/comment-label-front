import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ToastAndroid, BackHandler} from 'react-native';
import PropTypes from "prop-types";
import Global from "./config/Global";
import {ADScreen, MainAppContainer} from "./navigator/Router";
import Orientation from 'react-native-orientation';

export default class App extends Component {

    constructor(props){
        super(props);
        this.initPage = <ADScreen/>;
    }

    componentDidMount(): void {
        Orientation.lockToPortrait();
        fetch(Global.backendUrl + "/version/lasted")
            .then(data => data.json())
            .then(json => {
                if (json.code === 0){
                    return json.data.lasted !== Global.currentVersion;
                }else {
                    return false;
                }
            })
            .then(res => {
                if (res){
                    ToastAndroid.show("软件有新版本哦", ToastAndroid.SHORT);
                }
            })
            .catch();
    }

    render() {
        return this.initPage;
    }
}
