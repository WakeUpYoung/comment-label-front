import React,{Component} from "react";
import {StyleSheet, Text, View, TouchableOpacity, StatusBar, ToastAndroid, TextInput, TouchableNativeFeedback} from "react-native";
import Global from "../config/Global";
import PropTypes from 'prop-types';

export default class LabelMainActivity extends Component{
    constructor(props){
        super(props);
        this.state = {
            num : 5,
        };
        this.onClickAction = this.onClickAction.bind(this);
    }

    onClickAction(){
        let expectLabel = this.state.num;
        fetch(Global.backendUrl + "/comment/random/" + expectLabel, {
            method : "GET",
            headers : {
                'Content-Type' : 'application/json;charset=utf-8'
            },
        }).then(data => data.json())
            .then(json => {
                if (json.code === 0){
                    this.props.navigation.navigate("Labeling", {
                        commodities : json.data
                    })
                } else {
                    ToastAndroid.show(json.errMsg, ToastAndroid.SHORT);
                }

            })
            .catch(e => {console.warn("error : " + e)})
    }

    render() {
        return (
            <View style={[styles.main]}>
                <StatusBar hidden={false} barStyle={'light-content'} translucent={true} backgroundColor={'transparent'}/>
                <TextInput style={styles.input}
                           clearButtonMode={'while-editing'}
                           keyboardType={'numeric'}
                           selectionColor={'#e91e63'}
                           defaultValue={'5'}
                           onChangeText={(text) => {
                               this.setState({
                                   num : text,
                               })
                           }}
                           placeholder={'输入数量'}/>
                <TouchableNativeFeedback
                        onPress={() => {this.onClickAction()}}>
                    <View style={styles.action}>
                        <Text style={styles.actionText}>Action</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main : {
        flex : 1,
        justifyContent : "center",
        alignItems : "center",
        backgroundColor: "#009688",
    },
    input : {
        marginBottom : 30,
        paddingLeft : 20,
        paddingBottom: 10,
        paddingTop : 10,
        borderColor : "#e91e63",
        borderWidth : 1,
        borderRadius : 30,
        width : 300,
    },
    action : {
        marginBottom : 30,
        backgroundColor : "#e91e63",
        height : 150,
        width : 150,
        borderRadius : 75,
        justifyContent : "center",
        alignItems : "center",
    },
    actionText : {
        color : "white",
        fontSize : 30,
    },
});
