import React,{Component} from "react";
import {StyleSheet, Text, View, TouchableOpacity, StatusBar, ToastAndroid} from "react-native";
import SwiperAnimated from "react-native-swiper-animated/src/Swiper";

export default class LabelActivity extends Component{
    constructor(prop) {
        super(prop);
        this.state = {
            commodityName : '商品名称',
            isDisable : false,

        };
        this.swiper=null;
    }

    next = () => {
        if (this.state.isDisable){
            return false;
        }
        this.swiper.forceRightSwipe();
        this.setState({
            isDisable : true,
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
        return(
            <View style={styles.main}>
                <View style={styles.commodityView}>
                    <Text style={styles.commodityText}>这里放商品详情</Text>
                </View>
                <SwiperAnimated
                    ref={(swiper) => {
                        this.swiper = swiper;
                    }}
                    style={styles.wrapper}
                    paginationStyle={{ container: { backgroundColor: 'transparent' } }}
                    smoothTransition
                    loop swiper={false}
                    showPaginationBelow={true}
                    paginationDotColor={"#c1c1c1"}
                    paginationActiveDotColor={"#ff873f"}>
                    {items.map(item => (
                        <View key={Math.random()} style={item.css}>
                            <Text style={styles.text}>{item.title}</Text>
                        </View>
                    ))}
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
        flex: 1,
        backgroundColor: '#009688',
        alignItems : "center",
        justifyContent : "center",
        fontWeight: "bold"
    },
    commodityText : {
        fontSize: 25,
        color : "white"
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

const items = [
    { title: 'Hello Swiper', css: styles.slide1 },
    { title: 'Beautiful', css: styles.slide2 },
    { title: 'And simple', css: styles.slide3 },
];