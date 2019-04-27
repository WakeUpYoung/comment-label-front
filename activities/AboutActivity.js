import React, {Component} from 'react';
import {
    Platform, StyleSheet, Text, TouchableOpacity,
    View, ToastAndroid, BackHandler, StatusBar, Image
} from 'react-native';
import Global from "../config/Global";
import HeaderBar from "../components/HeaderBar";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MenuTextView from "../components/MenuTextView";

export default class AboutActivity extends Component{

    constructor(props){
        super(props)
    }

    checkVersion(){
        fetch(Global.backendUrl + "/version/lasted")
            .then(data => data.json())
            .then(json => {
                if (json.code === 0){
                    return json.data.lasted !== Global.currentVersion;
                }else {
                    return false;
                }
            })
            .then(res => {
                if (res){
                    ToastAndroid.show("软件有新版本哦", ToastAndroid.SHORT);
                }else{
                    ToastAndroid.show("当前是最新版本", ToastAndroid.SHORT);
                }
            })
            .catch();
    }

    render() {
        return (
            <View style={styles.main}>
                <HeaderBar onPressBack={() => this.props.navigation.goBack()} color={Global.userStyle} />
                <View style={styles.target}>
                    <Image source={require('../resources/images/logo.png')} style={{width: Global.windowWidth/5, height: Global.windowWidth/5, marginBottom: 20}} />
                    <View>
                        <Text>当前版本 {Global.currentVersion}</Text>
                    </View>
                </View>
                <View style={styles.menu}>
                    <MenuTextView title={"新版本检测"}
                                  image={<MaterialCommunityIcons name={'update'} color={Global.userStyle} size={30} />}
                                  onPress={this.checkVersion}/>

                </View>
            </View>

        );
    }

}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#f4f4f4',
    },
    target: {
        backgroundColor: '#ffffff',
        alignItems: 'center',
        marginBottom: 30,
    },
    menu: {
        flex: 1,
    }
});
