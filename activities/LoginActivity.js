import React, {Component} from 'react';
import Global from '../config/Global';
import {Platform, StyleSheet, Text, TextInput, TouchableNativeFeedback,
    View , StatusBar , Image , TouchableOpacity , Alert, ToastAndroid} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as QQAPI from 'react-native-qq';
import {createAppContainer, createStackNavigator, StackNavigator} from 'react-navigation';
import LoadModel from "../components/LoadModel";

export default class LoginActivity extends Component {
    constructor(prop){
        super(prop);
        this.state = {
            username : '',
            password : ''
        };
        this.loadModel = null;
        this.loginWithQQ = this.loginWithQQ.bind(this)
    }

    loginWithQQ(){
        let scopes = 'get_userinfo';
        QQAPI.isQQInstalled()
            .then(install => {
                if (install){
                    QQAPI.login(scopes)
                        .then(data => {
                            fetch(Global.backendUrl + "/user/loginWithQQ",{
                                method : 'POST',
                                headers : {
                                    'Content-Type' : 'application/json;charset=utf-8'
                                },
                                body : JSON.stringify({
                                    expiresIn : data.expires_in,
                                    oauthConsumerKey : data.oauth_consumer_key,
                                    accessToken : data.access_token,
                                    openId : data.openid,
                                })
                            })
                                .then(res => {
                                    this.loadModel.showLoading();
                                    return res.json()
                                })
                                .then(json => {
                                    this.loadModel.hiddenLoading();
                                    if (json.code === 0){
                                        this.props.navigation.navigate("Main");
                                    }else {
                                        ToastAndroid.show(json.errMsg, ToastAndroid.SHORT);
                                    }

                                })
                                .catch(error => console.warn("warn :" + JSON.stringify(error)))
                        })

                }else {
                    ToastAndroid.show("啊哦，您好像没有安装QQ", ToastAndroid.SHORT)
                }
            });
    }

    render() {
        return (
            <LinearGradient colors={['#e3729e', '#fd8f54']}
                            start={{x : 0, y : 0}}
                            end={{x : 0.7, y : 0.8}}
                            style={styles.mainView}>
                <StatusBar hidden={false} barStyle={'light-content'} translucent={true} backgroundColor={'transparent'}/>
                <View style={{flex : 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={styles.title}>Welcome</Text>
                </View>
                <View style={{flex : 2}}>
                    <TextInput inlineImageLeft='user_32'
                               inlineImagePadding={20}
                               placeholder='用户名/邮箱'
                               style={styles.inputStyle}
                               onChangeText={(text) => this.setState({username : text})}/>
                    <TextInput inlineImageLeft='password_32' inlineImagePadding={20}
                               placeholder='密码' secureTextEntry={true}
                               style={styles.inputStyle}
                               onChangeText={(text) => this.setState({password : text})}/>
                    <TouchableNativeFeedback>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>登录</Text>
                        </View>
                    </TouchableNativeFeedback>
                    <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center'}}>
                        <TouchableOpacity style={styles.bottomText}
                                          onPress={() => {{this.props.navigation.navigate("Forget", {email : this.state.username})}}}>
                            <Text>忘记密码?</Text>
                        </TouchableOpacity>
                        <Text style={{marginLeft:20, marginRight:20}}>|</Text>
                        <TouchableOpacity style={styles.bottomText}
                            onPress={() => {ToastAndroid.show("直接QQ登录就好了(￣▽￣)\"", ToastAndroid.SHORT)}}>
                            <Text>立即注册</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.loginWithOther}>
                        <TouchableOpacity onPress={this.loginWithQQ}>
                            <Image source={require('../resources/images/qq_48_white.png')} style={styles.loginImg}/>
                        </TouchableOpacity>
                    </View>

                </View>

                <LoadModel ref={view => this.loadModel = view} title={'登录中'}/>

            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    title : {
        fontSize : 60,
        color: 'white',
    },
    inputStyle : {
        marginBottom : 30,
        paddingLeft : 20,
        paddingBottom: 10,
        paddingTop : 10,
        borderColor : "white",
        borderWidth : 1,
        borderRadius : 30
    },
    buttonText: {
        color : "white",
        fontSize : 18,
        letterSpacing : 30
    },
    button : {
        backgroundColor : "#ffffff5A",
        height : 45,
        flexDirection : "row",
        alignItems : "center",
        justifyContent : "center",
        borderRadius: 30,
        marginBottom: 30,
    },
    mainView : {
        flexDirection : "column",
        flex : 1,
        paddingLeft: 30,
        paddingRight : 30
    },
    bottomText : {
        color : '#ffffff'
    },
    loginWithOther : {
        marginTop : 50,
        flexDirection : "row",
        justifyContent : "center",
        alignItems : "center",
        opacity: 0.8
    },
    loginImg : {
        opacity : 0.8
    }

});