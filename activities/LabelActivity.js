import React,{Component} from "react";
import {Text, View} from "react-native";

export default class LabelActivity extends Component{
    constructor(prop) {
        super(prop);
        this.state = {}
    }
    render() {
        return(
            <View>
                <Text>This is LabelActivity</Text>
            </View>
        )
    }
}