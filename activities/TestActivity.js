import React, { Component } from "react";
import {Text, StatusBar, View, ToastAndroid, Button, TextInput, StyleSheet} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';

export default class TestActivity extends Component {
    constructor(props){
        super(props);
        this.state = {
            text : "",
        }
    }

    async onClick() {
        let text = this.state.text;
        try {
            await AsyncStorage.setItem('someKey', text);
            ToastAndroid.show('保存成功', ToastAndroid.SHORT);
        }catch (e) {
            console.warn(JSON.stringify(e))
        }

    }

    async get(){
        try {
            const value = await AsyncStorage.getItem('user');
            if (value !== null) {
                this.setState({
                    text : value,
                });
            }
        } catch (error) {
            console.warn(JSON.stringify(error))
        }
    }

    render() {
        return (
            <View>
                <View style={{height : StatusBar.currentHeight}}/>
                <Text>{this.state.text}</Text>
                <TextInput
                    style={styles.input}
                onChangeText={(text) => {
                    this.setState({
                        text : text,
                    })
                }}/>
                <Button style={{marginBottom : 30}} title={'save'} onPress={() => {this.onClick()}}/>
                <Button title={'get'} onPress={() => {this.get()}}/>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    input : {
        borderWidth : 1,
        borderColor : "#3f71ed"
    }
});