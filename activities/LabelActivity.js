import React,{Component} from "react";
import {StyleSheet, Text, View, TouchableOpacity, StatusBar, ToastAndroid} from "react-native";
import SwiperAnimated from "react-native-swiper-animated/src/Swiper";
import Global from "../config/Global";
import PropTypes from 'prop-types';
import HeaderBar from "../components/HeaderBar";

export default class LabelActivity extends Component{
    constructor(prop) {
        super(prop);
        this.state = {
            commodityId : 0,
            commodityName : 'XXX商品',
            commodityType : "",
            rate : "",
            rateTitle : '评分',
            isDisable : false,
            commodities : [],

        };
        this.swiper=null;
        this.item = {};
    }


    componentDidMount() {
        fetch(Global.backendUrl + "/comment/random/10", {
            method : "GET",
            headers : {
            'Content-Type' : 'application/json;charset=utf-8'
            },
        }).then(data => data.json())
            .then(json => {
                if (json.code === 0){
                    this.setState({
                        commodityId : json.data[0].commodityId,
                        commodities : json.data,
                    })
                } else {
                    ToastAndroid.show(json.errMsg, ToastAndroid.SHORT);
                }

            })
            .catch(e => {console.warn("error : " + e)})

    }

    next = () => {
        if (this.state.isDisable){
            return false;
        }
        this.swiper.forceRightSwipe();
        let type = this.item.type;
        let rateStr;
        let rateTitle = "";
        let commodityType = "";
        // 淘宝
        if (type === 0){
            rateTitle = "好评率";
            rateStr = this.item.favorableRate + "%";
            commodityType = "淘宝";
        }else {
            rateTitle = "评分";
            rateStr = this.item.commodityRate;
            commodityType = "天猫";
        }
        this.setState({
            isDisable : true,
            commodityName : this.item.commodityName,
            commodityType : commodityType,
            rate : rateStr,
            rateTitle : rateTitle,
        });
        this.timeOut = setTimeout(() => {
            this.setState({
                isDisable : false,
            })
        }, 500);
    };

    componentWillUnmount() {
        this.timeOut && clearTimeout(this.timeOut)
    }

    render() {
        let width = Global.windowWidth;
        return(
            <View style={styles.main}>
                <StatusBar hidden={false} barStyle={'light-content'} translucent={true} backgroundColor={'transparent'}/>
                <HeaderBar onPressBack={() => this.props.navigation.goBack()} backgroundColor={'#009688'} color={'white'}/>
                <View style={styles.commodityView}>
                    <View style={[styles.commodityHead, {width : width}]}>
                        <Text style={[styles.commodityText, {flex : 1}]}>商品来源</Text>
                        <Text style={[styles.commodityText, {flex : 3}]}>{this.state.commodityType}</Text>
                    </View>
                    <View style={[styles.commodityHead, {width : width}]}>
                        <Text style={[styles.commodityText, {flex : 1}]}>商品名称</Text>
                        <Text style={[styles.commodityText, {flex : 3}]}>{this.state.commodityName}</Text>
                    </View>
                    <View style={[styles.commodityHead, {width : width}]}>
                        <Text style={[styles.commodityText, {flex : 1}]}>{this.state.rateTitle}</Text>
                        <Text style={[styles.commodityText, {flex : 3}]}>{this.state.rate}</Text>
                    </View>
                </View>
                <SwiperAnimated
                    ref={(swiper) => {
                        this.swiper = swiper;
                    }}
                    style={styles.wrapper}
                    paginationStyle={{ container: { backgroundColor: 'transparent' } }}
                    smoothTransition
                    loop={false}
                    swiper={false}
                    showPaginationBelow={true}
                    paginationDotColor={"#c1c1c1"}
                    paginationActiveDotColor={"#ff873f"}>
                    {this.state.commodities.map(item => {
                        if(this.state.commodityId === item.commodityId) {
                            this.item = item;
                        }
                        return(
                            <View key={item.commentId} style={styles.slide1}>
                                <Text style={styles.text}>{item.premiereComment}</Text>
                            </View>
                        )
                    })}
                </SwiperAnimated>
                <View style={styles.buttonContainer}>

                    <TouchableOpacity onPress={this.next} style={styles.btn}>
                        <Text style={styles.btnText}>Believable</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.next} style={styles.btn}>
                        <Text style={styles.btnText}>Fake</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    main : {
        flexDirection : "column",
        flex: 1
    },
    commodityView : {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: '#009688',
        alignItems : "center",
        justifyContent : "center",
        fontWeight: "bold"
    },
    commodityHead : {
        flexDirection : "row",
        alignItems : "center",
        paddingLeft : 30,
        paddingRight : 30,
    },
    commodityText : {
        fontSize: 18,
        color : "white",
    },
    viewPager : {
        flex: 2,
        alignItems: 'center',
        padding: 20,
        height:200,
    },
    pageStyle : {
        backgroundColor : '#ff832c'
    },
    wrapper: {
        backgroundColor: '#009688',
        flex: 3
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e91e63',
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#673ab7',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3f51b5',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    btn: {
        height: 45,
        width: 130,
        backgroundColor: '#000000ab',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius : 30
    },
    buttonContainer: {
        flexDirection: 'row',
        position: 'absolute',
        justifyContent: 'space-between',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 10,
    },
    btnText: {
        color: '#FFF',
    },
});

