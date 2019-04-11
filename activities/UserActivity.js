import React,{Component} from "react";
import {Text, View, StatusBar} from "react-native";

export default class UserActivity extends Component{
    constructor(prop) {
        super(prop);
        this.state = {}
    }
    render() {
        return(
            <View>
                <View style={{height : StatusBar.currentHeight}}/>
                <Text>This is UserActivity</Text>
                <View>

                </View>
            </View>
        )
    }
}