import React, { Component } from "react";
import { Modal, Text, StatusBar, View, ToastAndroid, Button} from "react-native";
import LoadModel from "../components/LoadModel";

export default class TestActivity extends Component {
    constructor(props){
        super(props);
        this.loading = null;
    }

    render() {
        return (
            <View>
                <LoadModel title={'aaaa'} ref={(view) => this.loading=view}/>
                <Button title={'click'} onPress={() => {
                    ToastAndroid.show('aaa', ToastAndroid.SHORT);
                    return this.loading.showLoading();
                }}/>
            </View>
        );
    }

}