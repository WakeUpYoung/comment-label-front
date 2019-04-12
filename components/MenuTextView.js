import React,{Component} from "react";
import {Text, View, StatusBar , StyleSheet , Dimensions , ART, Image, FlatList} from "react-native";

export default class MenuTextView extends Component {
    constructor(prop) {
        super(prop);
        this.state = {}
    }

    render() {
        return(
            <View style={styles.mainView}>
                <Image style={styles.imageView} source={require("../resources/images/email_t_32.png")}/>
                <Text style={styles.content}>邮箱</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainView : {
        flexDirection : "row",
        alignItems : "center",
    },
    imageView : {
        marginLeft : 30,
        marginRight : 30
    },
    content : {
        flex : 1,
        fontSize : 15,
        color : '#3f3f3f',
        borderColor : "#d4d4d4",
        borderStyle : "solid",
        borderBottomWidth : 1,
        paddingBottom : 10,
        paddingTop : 10,
    }
});