import React,{Component} from "react";
import {StyleSheet, Text, View, TouchableOpacity, StatusBar, ToastAndroid, TextInput, TouchableNativeFeedback} from "react-native";
import Global from "../config/Global";
import PropTypes from 'prop-types';
import LoadModel from "../components/LoadModel";

export default class LabelMainActivity extends Component{
    constructor(props){
        super(props);
        this.state = {
            num : 5,
        };
        this.onClickAction = this.onClickAction.bind(this);
        this.loadModel = null;
    }

    onClickAction(){
        let expectLabel = this.state.num;
        if (isNaN(expectLabel)){
            ToastAndroid.show("要填数字哦~", ToastAndroid.SHORT);
            return false;
        }
        if (expectLabel < 5){
            ToastAndroid.show("最小数字是5哦~（＞人＜；）", ToastAndroid.SHORT);
            return false;
        }
        if (expectLabel > 20){
            ToastAndroid.show("客官, 最多20个哦~o(*￣▽￣*)o", ToastAndroid.SHORT);
            return false;
        }
        this.loadModel.showLoading();
        fetch(Global.backendUrl + "/comment/random/" + expectLabel, {
            method : "GET",
            headers : {
                'Content-Type' : 'application/json;charset=utf-8'
            },
        }).then(data => data.json())
            .then(json => {
                this.loadModel.hiddenLoading();
                if (json.code === 0){
                    this.props.navigation.navigate("Labeling", {
                        commodities : json.data
                    })
                } else {
                    ToastAndroid.show(json.errMsg, ToastAndroid.SHORT);
                }

            })
            .catch()
    }

    render() {
        return (
            <View style={[styles.main]}>
                <StatusBar hidden={false} barStyle={'light-content'} translucent={true} backgroundColor={'transparent'}/>
                <View sytle={styles.inputMain}>
                    <Text style={styles.inputTitle}>请输入您要标记的评论数量</Text>
                    <TextInput style={styles.input}
                               clearButtonMode={'while-editing'}
                               keyboardType={'numeric'}
                               selectionColor={'#e91e63'}
                               maxLength={2}
                               defaultValue={'5'}
                               onChangeText={(text) => {
                                   this.setState({
                                       num : text,
                                   })
                               }}
                               placeholder={'输入数量(5-20)'}/>
                </View>

                <TouchableNativeFeedback
                        onPress={() => {this.onClickAction()}}>
                    <View style={styles.action}>
                        <Text style={styles.actionText}>开始!</Text>
                    </View>
                </TouchableNativeFeedback>

                <LoadModel backgroundColor={'white'} color={Global.labelStyle} title={'Loading'} ref={(view) => this.loadModel = view}/>
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
    inputMain : {
        flexDirection : 'row',
        flex : 1,
    },
    inputTitle : {
        color : 'white',
        marginBottom : 5,
    },
    input : {
        marginBottom : 30,
        paddingLeft : 20,
        paddingBottom: 10,
        paddingTop : 10,
        borderColor : "#e91e63",
        borderWidth : 1,
        borderRadius : 30,
        color : 'white',
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
