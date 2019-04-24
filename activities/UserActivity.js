import React,{Component} from "react";
import {Text, View, StatusBar , StyleSheet , Dimensions , ART, Image, TouchableNativeFeedback, ToastAndroid} from "react-native";
import MenuTextView from "../components/MenuTextView";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Global from "../config/Global";
import AsyncStorage from "@react-native-community/async-storage";

export default class UserActivity extends Component{
    constructor(prop) {
        super(prop);
        this.state = {
            y : 20,
        };
        this.logout = this.logout.bind(this)
    }

    componentDidMount() {
        this.intervalTimer = setInterval(() => {
            let _y = this.state.y;
            if (_y >= 170){
                clearInterval(this.intervalTimer)
            }
            _y += 10;
            this.setState({
                y : _y,
            })
        }, 2);

    }

    async logout(){
        await AsyncStorage.removeItem("user");
    }


    render() {
        let {width, height} = Dimensions.get("window");
        const path = new ART.Path(
            "M 0 0, L 0 100, C " + width * 0.33 + " " + this.state.y + "," + width * 0.66 + " "+ this.state.y + "," + width + " 100, L " + width + " 0"
        )
            .close();
        let avatarLeft = width/2 - 50;
        let avatarTop = 100;
        let avatar = Global.user.figureurl_qq_big == null ? require('../resources/images/user_default_grey_100.png') : {uri : Global.user.figureurl_qq_big};
        return(
            <View style={styles.mainView}>
                <StatusBar hidden={false} barStyle={'light-content'} translucent={true} backgroundColor={'transparent'}/>
                <ART.Surface width={width} height={250}>
                    <ART.Shape d={path} stroke="#000000" fill={Global.userStyle} strokeWidth={0}/>
                </ART.Surface>
                {/*用户头像*/}
                <View style={[styles.imgView , {left : avatarLeft, top : avatarTop}]}>
                    <Image style={styles.userImg} width={90} height={90} source={avatar}/>
                </View>
                <MenuTextView title={"邮箱"}
                              image={<MaterialCommunityIcons name={'email-outline'} size={30} color={Global.userStyle} />}
                              onPress={() => {this.props.navigation.navigate('Email',{
                                  type : 'modify',
                                  email : Global.user.email,
                              })}}/>
                <MenuTextView title={"我的战绩"}
                                image={<MaterialCommunityIcons name={'google-analytics'} size={30} color={Global.userStyle}/>}
                              onPress={() => {ToastAndroid.show("功能完善中", ToastAndroid.SHORT)}}/>
                <MenuTextView title={"提交BUG"} image={<MaterialCommunityIcons name={'bug-outline'} size={30} color={Global.userStyle}/>}
                    onPress={() => {ToastAndroid.show("功能完善中", ToastAndroid.SHORT)}}/>
                <MenuTextView title={"关于此软件"}
                              image={<MaterialCommunityIcons name={'information-outline'} color={Global.userStyle} size={30} />}
                            onPress={() => {ToastAndroid.show("这是一个超厉害的软件(ง •_•)ง", ToastAndroid.SHORT)}}/>
                <View style={{marginTop : 50, backgroundColor : "transparent"}}/>
                <TouchableNativeFeedback
                    onPress={this.logout}>
                    <View style={styles.logout}>
                        <Text style={{color : "#cf2a37", fontSize : 15}}>退出登录</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainView : {
        flexDirection: "column",
        flex: 1,
        backgroundColor: '#f4f4f4',

    },
    userTopView : {
        padding: 0,
        margin: 0,
    },
    imgView : {
        width : 100,
        height : 100,
        position : "absolute",
        backgroundColor : "#ffffffbb",
        alignItems : "center",
        justifyContent : "center",
        borderRadius : 50,
        elevation : 20,
        shadowOffset: {width: 0, height: 0},
        shadowColor: 'black',
        shadowOpacity: 1,
        shadowRadius: 5,
    },
    userImg : {
        borderRadius: 45,
    },
    logout : {
        backgroundColor : "#fff",
        alignItems: "center",
        justifyContent: "center",
        paddingTop : 10,
        paddingBottom : 10,
        borderTopWidth : 1,
        borderBottomWidth : 1,
        borderColor : "#d4d4d4",
    },
});