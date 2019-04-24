import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ToastAndroid, BackHandler} from 'react-native';
import PropTypes from "prop-types";
import Global from "./config/Global";
import {ADScreen, MainAppContainer} from "./navigator/Router";

export default class App extends Component {

    constructor(props){
        super(props);
        this.initPage = <ADScreen/>;
    }

    componentDidMount(): void {
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
                // TODO 需要更新时
                }
            })
            .catch();
    }

    render() {
        return this.initPage;
    }
}
