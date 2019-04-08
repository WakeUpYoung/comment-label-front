import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TextInput, TouchableNativeFeedback,
    View , StatusBar , Image , TouchableOpacity , Alert} from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import LinearGradient from 'react-native-linear-gradient';

class LoginActivity extends Component {
    constructor(prop){
        super(prop);
        this.state = {
            username : "",
            password : ""
        };
    }

    loginWithQQ(){
        Alert.alert('You tapped the QQ button!')
    }
    render() {
        return (
            <LinearGradient colors={['#e3729e', '#fd8f54']}
                            start={{x :0, y : 0}}
                            end={{x : 0.7, y: 0.8}}
                            style={styles.mainView}>
                <StatusBar hidden={false} backgroundColor={'#e3729e'}/>
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
                        <TouchableOpacity style={styles.bottomText}>
                            <Text>忘记密码?</Text>
                        </TouchableOpacity>
                        <Text style={{marginLeft:20, marginRight:20}}>|</Text>
                        <TouchableOpacity style={styles.bottomText}>
                            <Text>立即注册</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.loginWithOther}>
                        <TouchableOpacity onPress={this.loginWithQQ}>
                            <Image source={require('../resources/images/qq_48_white.png')} style={styles.loginImg}/>
                        </TouchableOpacity>
                    </View>

                </View>

            </LinearGradient>
        );
    }

}

const LoginStack = createStackNavigator(
    {
        Login : {
            screen : LoginActivity
        },
    },
    {
        mode: 'modal',
        headerMode: 'none',
    }
);

export default createAppContainer(LoginStack);

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