import React,{Component} from "react";
import {Text, View} from "react-native";

export default class UserActivity extends Component{
    constructor(prop) {
        super(prop);
        this.state = {}
    }
    render() {
        return(
            <View>
                <Text>This is UserActivity</Text>
            </View>
        )
    }
}