import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TextInput, TouchableNativeFeedback,
    View ,StatusBar , Image, ToastAndroid, TouchableOpacity} from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import HeaderBar from "../components/HeaderBar";
import Global from "../config/Global";

export default class EmailActivity extends Component {
    constructor(prop){
        super(prop);
        this.state = {
            email : JSON.stringify(this.props.navigation.getParam('email', '')).replace(/["']/g,''),
            sendBtnDisable : false,
            btnText : '发送验证码',
            btnColor : '#6495ED',
        };
        let type = JSON.stringify(this.props.navigation.getParam('type', '')).replace(/["']/g,'');
        if (type === 'default'){
            this.background = ['#e3729e', '#fd8f54'];
            this.defaultBtnColor = '#6495ED';
            this.disableColor = '#A9A9A9';
        } else {
            this.background = ['#6495ED', '#6495ED'];
            this.defaultBtnColor = '#00000050';
            this.disableColor = '#0000002c';
        }

    }

    componentWillMount() {
        this.setState({
            btnColor : this.defaultBtnColor,
        })
    }

    onPressSend(){
        if (!this.state.sendBtnDisable){
            if (!Global.emailRegx.test(this.state.email)) {
                return ToastAndroid.show('输入的邮箱格式不正确', ToastAndroid.SHORT);
            }
            let time = 60;
            this.interval = setInterval(() => {
                time--;
                if (time <= 0){
                    this.setState(() => {
                        return {
                            btnText : "发送验证码",
                            sendBtnDisable : false,
                            btnColor: this.defaultBtnColor,
                        }
                    });
                    clearInterval(this.interval)
                }else {
                    this.setState(() => {
                        return {
                            sendBtnDisable: true,
                            btnText: "重新发送(" + time + ")",
                            btnColor : this.disableColor,
                        }
                    });

                }
            }, 1000);
            return ToastAndroid.show("发送验证码", ToastAndroid.SHORT);
        }else {
            return null;
        }
    };


    render(){
        let email = this.state.email;
        if (email || email == null || email.startsWith('not_set_')){
            email = '';
        }

        return(
            <LinearGradient colors={this.background}
                            start={{x : 0, y : 0}}
                            end={{x : 0.7, y : 0.8}}
                            style={styles.mainView}>

                <HeaderBar onPressBack={() => this.props.navigation.goBack()}/>

                <View style={{flex : 1}}/>
                <View style={styles.contentView}>
                    <TextInput inlineImageLeft='email_32'
                           inlineImagePadding={20}
                           placeholder='邮箱'
                           defaultValue={email}
                           keyboardType='email-address'
                               onChangeText={(text) => this.setState({email : text})}
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
    },

    contentView : {
        flex : 4,
        marginLeft: 30,
        marginRight : 30,
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
        color : "#fff",
    }

});