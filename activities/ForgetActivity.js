import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TextInput, TouchableNativeFeedback,
    View , StatusBar , Image , Alert , Button} from 'react-native';
import LinearGradient from "react-native-linear-gradient";

export default class ForgetActivity extends Component {
    constructor(prop){
        super(prop);
        this.state = {
            email : null
        }
    }

    static navigationOptions = {
        title: '邮箱验证',
        headerStyle: {
            backgroundColor: '#fd8f54',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

    render(){
        const { navigation } = this.props;
        const email = navigation.getParam('email', 'default');
        return(
            <LinearGradient colors={['#e3729e', '#fd8f54']}
                            start={{x : 0, y : 0}}
                            end={{x : 0.7, y : 0.8}}
                            style={styles.mainView}>
                <View style={{flex : 1}}/>
                <View style={{flex : 4}}>
                    <TextInput inlineImageLeft='email_32'
                           inlineImagePadding={20}
                           placeholder='邮箱'
                           style={styles.inputStyle}/>
                    <View style={styles.codeView}>
                        <TextInput inlineImageLeft='code_32'
                                   inlineImagePadding={20}
                                    placeholder="验证码" style={[styles.inputStyle, {flex: 3}]}/>
                        <TouchableNativeFeedback>
                            <View style={styles.sendBtn}>
                                <Text style={styles.sendText}>发送验证码</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
            </View>
            </LinearGradient>
            );
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
        flex : 1,
        marginBottom : 30,
        alignItems : "center",
        justifyContent : "center",
        backgroundColor: "#6495ED",
    },
    sendText : {
        color : "#fff"
    }

});