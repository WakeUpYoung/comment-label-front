import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TextInput, TouchableNativeFeedback,
    View , StatusBar , Image , Alert , ToastAndroid} from 'react-native';
import LinearGradient from "react-native-linear-gradient";

export default class ForgetActivity extends Component {
    constructor(prop){
        super(prop);
        this.state = {
            email : JSON.stringify(this.props.navigation.getParam('email', '')).replace(/"/g,''),
            sendBtnDisable : false,
            btnText : '发送验证码',
            btnColor : '#6495ED',
        }
    }


    onPressSend(){
        if (!this.state.sendBtnDisable){
            let time = 60;
            this.interval = setInterval(() => {
                time--;
                if (time <= 0){
                    this.setState(oldChar => {
                        return {
                            btnText : "发送验证码",
                            sendBtnDisable : false,
                            btnColor: '#6495ED'
                        }
                    });
                    clearInterval(this.interval)
                }else {
                    this.setState(old => {
                        return {
                            sendBtnDisable: true,
                            btnText: "重新发送(" + time + ")",
                            btnColor : "#A9A9A9"
                        }
                    });

                }
            }, 1000);
            return ToastAndroid.show("发送验证码", ToastAndroid.SHORT);
        }else {
            return null
        }
    };


    render(){
        return(
            <LinearGradient colors={['#e3729e', '#fd8f54']}
                            start={{x : 0, y : 0}}
                            end={{x : 0.7, y : 0.8}}
                            style={styles.mainView}>
                <View style={{flex : 1}}/>
                <View style={{flex : 4}}>
                    <TextInput inlineImageLeft='email_32'
                           inlineImagePadding={20}
                           placeholder='邮箱' defaultValue={this.state.email}
                           keyboardType='email-address'
                           style={styles.inputStyle}/>
                    <View style={styles.codeView}>
                        <TextInput inlineImageLeft='code_32'
                                   inlineImagePadding={20}
                                    placeholder="验证码" style={[styles.inputStyle, {flex: 3}]}/>
                        <TouchableNativeFeedback onPress={() => this.onPressSend()}>
                            <View style={[styles.sendBtn, {backgroundColor: this.state.btnColor}]}>
                                <Text style={styles.sendText}>{this.state.btnText}</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
            </View>
            </LinearGradient>
            );
    }

    componentWillUnmount(){
        clearInterval(this.interval)
    }
}

const styles = StyleSheet.create({
    mainView : {
        flexDirection : "column",
        flex : 2,
        paddingLeft: 30,
        paddingRight : 30
    },
    inputStyle : {
        marginBottom : 30,
        paddingLeft : 20,
        paddingRight : 20,
        paddingBottom: 10,
        paddingTop : 10,
        borderColor : "white",
        borderWidth : 1,
        borderRadius : 30
    },
    codeView : {
        flexDirection: "row",
    },
    sendBtn : {
        marginBottom : 30,
        flex : 2,
        justifyContent : "center",
        alignItems : "center",
        marginLeft : 20,
        borderRadius : 30,
    },
    sendText : {
        color : "#fff"
    }

});