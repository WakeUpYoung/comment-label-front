import React,{Component} from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    StatusBar,
    ToastAndroid,
    TouchableWithoutFeedback,
    ART,
    Modal,
} from "react-native";
import SwiperAnimated from "react-native-swiper-animated/src/Swiper";
import Global from "../config/Global";
import PropTypes from 'prop-types';
import HeaderBar from "../components/HeaderBar";
import HashMap from 'hashmap'

const {Surface, Shape, Path} = ART;

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
            modalVisible: false,
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

    componentDidMount(): void {
        if (Global.needGuide){
            this.showModalTimeOut = setTimeout(() => {
                this.setState({
                    modalVisible: true
                })
            }, 200);
            Global.needGuide = false;
        }

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
        this.timeOut && clearTimeout(this.timeOut);
        this.showModalTimeOut && clearTimeout(this.showModalTimeOut);
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

                <Modal animationType="fade"
                       transparent={true}
                       visible={this.state.modalVisible}>
                    <View style={styles.modelMain}>
                        <View style={{flex: 1}}/>
                        <Text style={[styles.modelText, {flex: 2}]}>这条评论是真是假?</Text>
                        <Surface width={160} height={60} style={styles.modalTrue}>
                            <Shape d={new Path("M35.977,0.005 C33.900,0.005 31.822,0.005 29.745,0.005 C18.099,2.864 7.816,8.915 2.835,18.084 C1.761," +
                                "26.876 2.535,32.306 9.634,38.945 C28.109,44.992 59.649,37.962 71.102,24.574 C74.931,15.174 65.768,8.278 56.372," +
                                "4.177 C34.315,-0.335 0.003,2.662 0.003,25.965 C4.668,45.052 59.470,47.796 66.569,30.369 C68.368,21.540 64.922," +
                                "15.531 57.788,9.045 C43.713,2.326 22.011,-2.081 7.934,6.727 ")}
                            strokeWidth={2} stroke={'#fff'}/>
                        </Surface>
                        <Surface width={160} height={60} style={styles.modalFake}>
                            <Shape d={new Path("M52.448,0.912 C39.225,0.912 21.000,11.095 11.881,20.214 C9.858,28.305 7.259,34.894 14.171,41.806 C35.074," +
                                "52.257 60.683,47.325 81.238,38.862 C83.637,36.572 86.036,34.281 88.435,31.991 C91.305,23.381 90.199,16.743 83.855," +
                                "10.399 C61.402,1.418 28.027,4.543 7.955,17.924 C3.320,23.221 0.758,27.876 0.758,34.936 C1.412,35.808 2.067,36.681 2.721," +
                                "37.553 C14.279,37.444 25.841,37.335 37.399,37.226 ")}
                            strokeWidth={2} stroke={'#fff'}/>
                        </Surface>
                        {/*关闭按钮*/}
                        <TouchableWithoutFeedback
                            onPress={() => {
                                this.setState({
                                    modalVisible: false
                                })
                            }}>
                            <View style={styles.cancel}>
                                <Surface width={30} height={30} style={{backgroundColor: 'transparent'}}>
                                    <Shape d={new Path("M0.000, 0.000 C7.666,8.332 20.501,18.668 27.000,28.000 M26.000,1.000 C19.667,8.999 6.499,19.251 1.000,28.000 ")}
                                           strokeWidth={5} stroke={'#fff'}/>
                                </Surface>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </Modal>

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

    // model
    modelMain: {
        backgroundColor: '#00000050',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    },
    modelText: {
        color: '#fff',
        fontSize: 35,
        fontFamily: Global.handWritten,
    },
    cancel: {
        position: 'absolute',
        top : 60,
        left: Global.windowWidth - 60,
        width: 35,
        height: 35,
    },
    modalTrue: {
        position: 'absolute',
        top: Global.windowHeight - 130,
        left: 40,
    },
    modalFake: {
        position: 'absolute',
        top: Global.windowHeight - 130,
        left: Global.windowWidth - 120,
    }
});

