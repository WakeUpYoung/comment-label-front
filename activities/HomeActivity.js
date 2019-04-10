import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TextInput, TouchableNativeFeedback,
    View , StatusBar , Image , TouchableOpacity , Alert} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {createAppContainer, createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from "react-native-vector-icons/AntDesign";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import {declareFunction} from "@babel/types";

export default class HomeActivity extends Component{
    constructor(prop) {
        super(prop);
        this.state = {}
    }
   render() {
       return(
           <View>
               <Text>This is HomeActivity</Text>

           </View>
       )
   }
}

