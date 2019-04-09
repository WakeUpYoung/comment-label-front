import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TextInput, TouchableNativeFeedback,
    View , StatusBar , Image , TouchableOpacity , Alert , Button} from 'react-native';

export default class ForgetActivity extends Component {
    constructor(prop){
        super(prop);
    }

    render(){
        return(
            <View>
                <Text>This is Forget password</Text>
                <Button title="Hello" onPress={() => {this.props.navigation.navigate("Login")}}/>
            </View>
            );
    }
}

const styles = StyleSheet.create({

});