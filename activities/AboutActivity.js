import React, {Component} from 'react';
import {
    Platform, StyleSheet, Text, TouchableOpacity,
    View, ToastAndroid, BackHandler, StatusBar, Image
} from 'react-native';
import Global from "../config/Global";
import HeaderBar from "../components/HeaderBar";

export default class AboutActivity extends Component{

    constructor(props){
        super(props)
    }

    render() {
        return (
            <View style={}>
                <HeaderBar onPressBack={() => this.props.navigation.goBack()} color={Global.userStyle} />
                <View>

                </View>
            </View>

        );
    }

}
