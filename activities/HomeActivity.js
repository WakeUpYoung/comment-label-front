import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TextInput, TouchableNativeFeedback,
    View , StatusBar , Image , TouchableOpacity , Alert} from 'react-native';


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

