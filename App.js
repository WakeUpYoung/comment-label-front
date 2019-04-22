import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ToastAndroid, BackHandler} from 'react-native';
import {LoginNavigator, MainAppContainer} from "./navigator/Router";
import TestActivity from "./activities/TestActivity";
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from "prop-types";
import Global from "./config/Global";

export default class App extends Component {

    constructor(props){
        super(props);
        this.initPage = null;
    }

    componentWillMount(): void {
        if (App.hasLogin()){
            this.initPage = <MainAppContainer/>;
        }else {
            this.initPage = <LoginNavigator/>;
        }
    }

    componentDidMount(): void {
        fetch(Global.backendUrl + "/version/lasted")
            .then(data => data.json())
            .then(json => {
                if (json.code === 0){
                    return json.data.lasted !== Global.currentVersion;
                }else {
                    console.warn("something error");
                    return false;
                }
            })
            .then(res => {
                if (res){
                // TODO 需要更新时
                }
            })
            .catch();

    }

    static async hasLogin() : boolean {
        try {
            const userJson = await AsyncStorage.getItem('user');
            // 如果用户之前有登录过
            if (userJson) {
                let user = JSON.parse(userJson);
                App.saveUserInfo(user);
                return true;
            // 如果没有登录过则跳到登录页面
            }else{
                return false;
            }
        } catch (error) {
            console.warn(error);
            return false;
        }
    }

    // 保存用户信息到内存
    static saveUserInfo(user : PropTypes.object.isRequired){
        Global.user.id = user.id;
        Global.user.email = user.email;
        Global.user.openid = user.openId;
        Global.user.gender = user.gender;
        Global.user.nickname = user.nickname;
        Global.user.figureurl_qq_small = user.figureurlQqSmall;
        Global.user.figureurl_qq_big = user.figureurlQqBig;
    }

    render() {
        return this.initPage;
    }
}
