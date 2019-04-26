import React,{Component} from "react";
import {StyleSheet, Text, View, TouchableOpacity, StatusBar, ToastAndroid} from "react-native";
import SwiperAnimated from "react-native-swiper-animated/src/Swiper";
import Global from "../config/Global";
import PropTypes from 'prop-types';
import HeaderBar from "../components/HeaderBar";
import HashMap from 'hashmap'

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
        this.swiperColors = ['#e91e63', '#673ab7', '#3f51b5'];
        this.swiper=null;
        this.index = 0;
        this.commentMap = new Map();
        this.onClickLabel = this.onClickLabel.bind(this);
    }

    static checkType(type, favorableRate, rate){
        let rateStr;
        let rateTitle = "";
        let commodityType = "";
        // 淘宝
        if (type === 0){
            rateTitle = "好评率";
            rateStr = favorableRate + "%";
            commodityType = "淘宝";
        }else {
            rateTitle = "评分";
            rateStr = rate;
            commodityType = "天猫";
        }
        return {rateTitle, rateStr, commodityType}
    }

    componentWillMount(): void {
        let commodities = this.props.navigation.getParam('commodities', null);
        let type = commodities[0].type;
        let favorableRate = commodities[0].favorableRate;
        let commodityRate = commodities[0].commodityRate;
        let commodityName = commodities[0].commodityName;
        let commodityId = commodities[0].commodityId;
        let {rateStr, rateTitle, commodityType} = LabelActivity.checkType(type, favorableRate, commodityRate);
        this.setState({
            commodities : commodities,
            commodityName : commodityName,
            commodityId : commodityId,
            commodityType : commodityType,
            rate : rateStr,
            rateTitle : rateTitle,
        });
    }

    onClickLabel(isBelievable){
        if (this.state.isDisable){
            return false;
        }
        let currentIndex = this.index;
        let nextIndex = currentIndex + 1;

        fetch(Global.backendUrl + "/comment/label", {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json;charset=utf-8'
            },
            body : JSON.stringify({
                commentId : this.commentMap.get(currentIndex).commentId,
                whetherBelievable : isBelievable,
            })
        }).catch();
        if (currentIndex < this.commentMap.size -1){
            this.swiper.forceRightSwipe();
            let type = this.commentMap.get(nextIndex).type;
            let commodityName = this.commentMap.get(nextIndex).commodityName;
            let commodityId = this.commentMap.get(nextIndex).commodityId;
            let favorableRate = this.commentMap.get(nextIndex).favorableRate;
            let commodityRate = this.commentMap.get(nextIndex).commodityRate;
            let {rateStr, rateTitle, commodityType} = LabelActivity.checkType(type, favorableRate, commodityRate);
            this.setState({
                isDisable : true,
                commodityName : commodityName,
                commodityId : commodityId,
                commodityType : commodityType,
                rate : rateStr,
                rateTitle : rateTitle,
            });
        }

        // 如果不是最后一页, -1 是因为map 的size从1开始
        // 判断是否是最后一页
        if (currentIndex === this.commentMap.size - 1){
            this.props.navigation.goBack();
            ToastAndroid.show("感谢您提交宝贵数据", ToastAndroid.SHORT);
            return false;
        }
        this.index ++;

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
                    backPressToBack={false}
                    loop={false}
                    swiper={false}
                    showPaginationBelow={true}
                    paginationDotColor={"#c1c1c1"}
                    paginationActiveDotColor={"#ff873f"}>
                    {this.state.commodities.map((item, index) => {
                        this.commentMap.set(index, item);
                        let hidden = true;
                        let append = "";
                        if (item.appendComment){
                            hidden = false;
                            append = item.appendComment;
                        }
                        let len = item.premiereComment.length + append.length;
                        let fontSize;
                        if (len < 100){
                            fontSize = 30
                        } else if (len < 300){
                            fontSize = 20
                        }else {
                            fontSize = 16
                        }
                        return(
                            <View key={item.commentId} style={[styles.slide, {backgroundColor : this.swiperColors[index % 3]}]}>
                                <Text style={[styles.text, {fontSize : fontSize}]}>{item.premiereComment}</Text>

                                {
                                    hidden ? null :
                                    <Text style={[styles.text, {fontSize : fontSize}]}>追评: {item.appendComment}</Text>
                                }


                            </View>
                        )
                    })}
                </SwiperAnimated>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => this.onClickLabel(true)} style={styles.btn}>
                        <Text style={styles.btnText}>真</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.onClickLabel(false)} style={styles.btn}>
                        <Text style={styles.btnText}>假</Text>
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
    slide: {
        flex: 1,
        paddingLeft : 20,
        paddingRight : 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#fff',
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

