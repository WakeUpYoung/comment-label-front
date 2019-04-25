import React, {Component} from 'react';
import {
    Platform, StyleSheet, Text, TouchableOpacity,
    View, ToastAndroid, BackHandler, StatusBar, Image
} from 'react-native';
import Global from "../config/Global";
import AsyncStorage from "@react-native-community/async-storage";
import PropTypes from "prop-types";

export default class ADActivity extends Component{
    constructor(props){
        super(props);
        this.state = {
            time: 5,
        };
        this.onPress = this.onPress.bind(this);
        this.nextPage = "Login";
    }

    componentDidMount(): void {
        ADActivity.hasLogin()
            .then(bool => {
               if (bool) {
                   this.nextPage = "Main";
               }
            });
        this.interval = setInterval(() => {
            let time = this.state.time;
            if (time > 0){
                time--;
                this.setState({
                    time : time,
                })
            }else{
                this.props.navigation.replace(this.nextPage);
            }
        }, 1000);
    }

    componentWillUnmount(): void {
        this.interval && clearInterval(this.interval)
    }

    onPress(){
        this.props.navigation.replace(this.nextPage);
    }

    static async hasLogin() : boolean {
        try {
            const userJson = await AsyncStorage.getItem('user');
            // 如果用户之前有登录过
            if (userJson) {
                let user = JSON.parse(userJson);
                ADActivity.saveUserInfo(user);
                return true;
                // 如果没有登录过则跳到登录页面
            }else{
                return false;
            }
        } catch (error) {
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
        let num = Global.windowWidth * 0.7;
        return (
            <View style={styles.main}>
                <StatusBar hidden={true}/>
                <View style={styles.skipBtn}>
                    <TouchableOpacity
                        underlayColor={Global.homeStyle}
                        onPress={this.onPress}>
                        <View style={styles.skip}>
                            <Text style={styles.skipText}>跳过 ( {this.state.time} )</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.adView}>
                    <Image
                        style={{width: num, height: num}}
                        source={require('../resources/images/ad_require.png')} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,

    },
    text : {
        color: '#ff2c1a',
        fontSize: 35,
        fontWeight: 'bold'
    },
    skipBtn: {
        flex: 1,
        flexDirection: 'row',
        position: "absolute",
        left: 0,
        right: 0,
        justifyContent: "flex-end",
    },
    skip : {
        backgroundColor: '#00000090',
        borderRadius: 15,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        marginRight: 20,
        marginTop: 20,
    },
    skipText: {
        color: '#fff',
        fontSize: 13,
    },
    adView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

});