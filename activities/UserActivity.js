import React,{Component} from "react";
import {Text, View, StatusBar , StyleSheet , Dimensions , ART, Image, FlatList} from "react-native";
import MenuTextView from "../components/MenuTextView";

export default class UserActivity extends Component{
    constructor(prop) {
        super(prop);
        this.state = {}
    }

    render() {
        let {width, height} = Dimensions.get("window");
        const path = new ART.Path(
            "M 0 0, L 0 100, C " + width * 0.33 + " 170," + width * 0.66 + " 170, " + width + " 100, L " + width + " 0"
        )
            .close();
        let avatarLeft = width/2 - 50;
        let avatarTop = 100;
        return(
            <View style={styles.mainView}>
                <StatusBar hidden={false} barStyle={'light-content'} translucent={true} backgroundColor={'transparent'}/>
                <ART.Surface width={width} height={250}>
                    <ART.Shape d={path} stroke="#000000" fill={"#4e69d4"} strokeWidth={0}/>
                </ART.Surface>
                <View style={[styles.imgView , {left : avatarLeft, top : avatarTop}]}>
                    <Image style={styles.userImg} width={48} height={48} source={require('../resources/images/user_grey.png')}/>
                </View>
                <MenuTextView title={"邮箱"} imageSource={require('../resources/images/email_t_32.png')}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainView : {
        flexDirection: "column",
        flex: 1

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
    },
    userImg : {

    }
});