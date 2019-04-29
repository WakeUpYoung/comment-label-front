import React,{Component} from "react";
import {Text, View, ART,} from "react-native";
import Global from "../config/Global";

const {Shape, Path, Surface} = ART;
export default class TestActivity extends Component{
    render() {
        return (
            <View>
                <Text>Hello</Text>
                <Surface width={30} height={30} style={{backgroundColor: "#fff"}}/>
            </View>
        )
    }
}