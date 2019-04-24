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
            validCode: '',
            sendBtnDisable : false,
            btnText : '发送验证码',
            btnColor : '#6495ED',
        };
        let type = JSON.stringify(this.props.navigation.getParam('type', '')).replace(/["']/g,'');
        if (type === 'default'){
            this.background = ['#e3729e', '#fd8f54'];
            this.defaultBtnColor = '#6495ED';
            this.disableColor = '#A9A9A9';
            this.modify = false;
        } else {
            this.background = ['#6495ED', '#6495ED'];
            this.defaultBtnColor = '#00000050';
            this.disableColor = '#0000002c';
            this.modify = true;
        }
        this.onPressSend = this.onPressSend.bind(this);
        this.submit = this.submit.bind(this);
    }

    componentWillMount() {
        this.setState({
            btnColor : this.defaultBtnColor,
        })
    }

    componentDidMount(): void {
    }

    // 发送验证码
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
            fetch(Global.backendUrl + "/user/sendEmail", {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json;charset=utf-8'
                },
                body : JSON.stringify({
                    email: this.state.email,
                    modify: this.modify,
                })
            })
                .then(data => data.json())
                .then(json => {
                    if (json.code ===0){
                        ToastAndroid.show("已发送验证码", ToastAndroid.SHORT);
                    } else{
                        ToastAndroid.show(json.errMsg, ToastAndroid.SHORT);
                    }
                })
                .catch()

        }else {
            return null;
        }
    }

    // 点击提交按钮
    submit(){
        if (this.modify){
            fetch(Global.backendUrl + "/user/modifyEmail", {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json;charset=utf-8'
                },
                body : JSON.stringify({
                    email: this.state.email,
                    validCode: this.state.validCode,
                    id: Global.user.id,
                })
            })
                .then(data => data.json())
                .then(json => {
                    if (json.code === 0){
                        ToastAndroid.show("修改成功", ToastAndroid.SHORT);
                        Global.user.email = this.state.email;
                    }else{
                        ToastAndroid.show(json.errMsg, ToastAndroid.SHORT);
                    }
                })
                .catch();
        }
    }


    render(){
        let email = Global.user.email;
        if (email || email == null || email.startsWith('not_set_')){
            email = '';
        }
        return(
            <LinearGradient colors={this.background}
                            start={{x : 0, y : 0}}
                            end={{x : 0.7, y : 0.8}}
                            style={styles.mainView}>

                <HeaderBar onPressBack={() => this.props.navigation.goBack()}
                        backgroundColor={this.background[0]}/>

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
                                   onChangeText={text => this.setState({validCode: text})}
                                    placeholder="验证码" style={[styles.inputStyle, {flex: 3}]}/>
                        <TouchableNativeFeedback onPress={() => this.onPressSend()}>
                            <View style={[styles.sendBtn, {backgroundColor: this.state.btnColor}]}>
                                <Text style={styles.sendText}>{this.state.btnText}</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                    <View style={styles.submit}>
                        <TouchableNativeFeedback
                            onPress={() => this.submit()}>
                            <View style={[styles.submitBtn, {backgroundColor: this.defaultBtnColor}]}>
                                <Text style={styles.submitText}>确认</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </View>
            </LinearGradient>
            );
    }

    componentWillUnmount(){
        this.interval && clearInterval(this.interval)
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
    },
    submit: {

    },
    submitBtn: {
        justifyContent : "center",
        alignItems : "center",
        borderRadius : 30,
        paddingTop: 10,
        paddingBottom: 10,
    },
    submitText: {
        color: "#fff",
        letterSpacing: 20,
    }


});