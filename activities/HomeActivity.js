import React, {Component} from 'react';
import {
    Platform, StyleSheet, Text,Image,
    View, StatusBar, ToastAndroid, BackHandler
} from 'react-native';
import Global from "../config/Global";


export default class HomeActivity extends Component{
    constructor(prop) {
        super(prop);
        this.state = {}
    }

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress',
            this.onBackButtonPressAndroid);
    }

    componentWillUnmount() {
        this.backHandler&&this.backHandler.remove();
    }

    onBackButtonPressAndroid = () => {
        if (this.props.navigation.isFocused()) {
            if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
                //最近2秒内按过back键，可以退出应用。
                return false;
            }
            this.lastBackPressed = Date.now();
            ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
            return true;
        }
    };

   render() {
       return(
           <View style={styles.main}>
               <StatusBar hidden={false} barStyle={'light-content'} translucent={true} backgroundColor={'transparent'}/>
               <View style={[styles.head, {backgroundColor : Global.homeStyle}]}>
                   <View>
                       <View style={{height : StatusBar.currentHeight, backgroundColor: '#0000'}}/>
                       <View style={styles.headContext}>
                           <Text style={styles.headTitle}>首页</Text>
                       </View>
                   </View>
               </View>

               <View style={styles.content} >
                   <Text style={styles.contentText}>感谢使用Comment Label</Text>
                   <Text style={styles.contentText}>毕设需要数据</Text>
                   <Text style={styles.contentText}>感谢帮忙❤</Text>
               </View>

               <View style={styles.image}>
                   <Image source={require("../resources/images/lookdown.png")} style={{width: Global.windowWidth/4, height: Global.windowWidth/4}}/>
               </View>

           </View>
       )
   }
}

const styles = StyleSheet.create({
    main : {
        flex : 1,
        flexDirection : 'column',
    },
    head : {
        flexDirection: "column"
    },
    headTitle : {
        color : 'white',
        fontSize : 17,
    },
    headContext : {
        paddingLeft : 20,
        paddingBottom : 10,
        paddingTop: 10,
    },
    content : {
        flex : 2,
        flexDirection : 'column',
        justifyContent : 'center',
        alignItems : 'center',
    },
    contentText : {
        fontSize: 25,
        color : '#848484',
    },
    image : {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    }
});


