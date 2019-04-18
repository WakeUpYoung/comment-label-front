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
               <StatusBar hidden={false} barStyle={'light-content'} translucent={true} backgroundColor={'transparent'}/>
               <View style={{height : StatusBar.currentHeight}}/>
               <Text>This is HomeActivity</Text>

           </View>
       )
   }
}

