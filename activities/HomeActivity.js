import React, {Component} from 'react';
import {
    Platform, StyleSheet, Text, TextInput, TouchableNativeFeedback,
    View, StatusBar, Image, TouchableOpacity, Alert, ToastAndroid, BackHandler
} from 'react-native';


export default class HomeActivity extends Component{
    constructor(prop) {
        super(prop);
        this.state = {}
    }

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress',
            this.onBackButtonPressAndroid);
    }

    componentWillUnmount() {
        this.backHandler&&this.backHandler.remove();
    }

    onBackButtonPressAndroid = () => {
        if (this.props.navigation.isFocused()) {
            if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
                //最近2秒内按过back键，可以退出应用。
                return false;
            }
            this.lastBackPressed = Date.now();
            ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
            return true;
        }
    };

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

