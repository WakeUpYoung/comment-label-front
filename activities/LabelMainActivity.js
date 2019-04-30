import React,{Component} from "react";
import {StyleSheet, Text, View, TouchableOpacity, StatusBar, ToastAndroid, TextInput,
    TouchableNativeFeedback, Modal, findNodeHandle, UIManager, ART, TouchableWithoutFeedback} from "react-native";
import Global from "../config/Global";
import PropTypes from 'prop-types';
import LoadModel from "../components/LoadModel";

const {Path, Surface, Shape} = ART;

export default class LabelMainActivity extends Component{
    constructor(props){
        super(props);
        this.state = {
            num : 5,
            modalVisible: false,
        };
        this.actionX = 0;
        this.actionY = 0;
        this.onClickAction = this.onClickAction.bind(this);
        this.loadModel = null;
    }

    componentDidMount(): void {
        if (Global.needGuide){
            this.timeout = setTimeout(() => {
                this.setState({
                    modalVisible: true
                })
            }, 200);
        }

    }

    componentWillUnmount(): void {
        this.timeout && clearTimeout(this.timeout)
    }

    onClickAction(){
        let expectLabel = this.state.num;
        if (isNaN(expectLabel)){
            ToastAndroid.show("要填数字哦~", ToastAndroid.SHORT);
            return false;
        }
        if (expectLabel < 5){
            ToastAndroid.show("最小数字是5哦~（＞人＜；）", ToastAndroid.SHORT);
            return false;
        }
        if (expectLabel > 20){
            ToastAndroid.show("客官, 最多20个哦~o(*￣▽￣*)o", ToastAndroid.SHORT);
            return false;
        }
        this.loadModel.showLoading();
        fetch(Global.backendUrl + "/comment/random/" + expectLabel, {
            method : "GET",
            headers : {
                'Content-Type' : 'application/json;charset=utf-8'
            },
        }).then(data => data.json())
            .then(json => {
                this.loadModel.hiddenLoading();
                if (json.code === 0){
                    this.props.navigation.navigate("Labeling", {
                        commodities : json.data
                    })
                } else {
                    ToastAndroid.show(json.errMsg, ToastAndroid.SHORT);
                }

            })
            .catch()
    }

    render() {
        const path = new Path("M1.895,87.895 C25.893,37.872 91.135,35.038 60.895,65.895 C42.052," +
            "85.122 23.119,23.236 95.895,1.895 M65.895,0.895 L91.895,4.895 L79.895,25.895 ");
        return (
            <View style={[styles.main]}>
                <StatusBar hidden={false} barStyle={'light-content'} translucent={true} backgroundColor={'transparent'}/>
                <View sytle={styles.inputMain}>
                    <Text style={styles.inputTitle}>请输入您要标记的评论数量</Text>
                    <TextInput style={styles.input}
                               clearButtonMode={'while-editing'}
                               keyboardType={'numeric'}
                               selectionColor={'#e91e63'}
                               maxLength={2}
                               defaultValue={'5'}
                               onChangeText={(text) => {
                                   this.setState({
                                       num : text,
                                   })
                               }}
                               placeholder={'输入数量(5-20)'}/>
                </View>

                <TouchableNativeFeedback ref='action'
                         onLayout={({nativeEvent:e}) => {
                             UIManager.measure(e.target, (x, y, width, height, pageX, pageY) => {
                                 this.actionX = pageX;
                                 this.actionY = pageY;
                             });
                         }}
                        onPress={() => {this.onClickAction()}}>
                    <View style={styles.action}
                        >
                        <Text style={styles.actionText}>开始!</Text>
                    </View>
                </TouchableNativeFeedback>

                <LoadModel backgroundColor={'white'} color={Global.labelStyle} title={'Loading'} ref={(view) => this.loadModel = view}/>

                <Modal animationType="fade"
                       transparent={true}
                       visible={this.state.modalVisible}>
                    <View style={styles.modelMain}>
                        {/* 指向箭头 */}
                        <View style={[styles.modelPoint, {top: this.actionY + 120, left: this.actionX - 60}]}>
                            <Surface width={300} height={120} style={{backgroundColor: 'transparent'}}>
                                <Shape d={path} strokeWidth={5} stroke={'#fff'}/>
                            </Surface>
                            <Text style={styles.modelText}>点我!</Text>
                        </View>
                        {/*Model Action*/}
                        <TouchableNativeFeedback
                            onPress={() => {
                                this.setState({
                                    modalVisible: false,
                                });
                                this.onClickAction()
                            }}>
                            <View style={[styles.modelAction, {top: this.actionY - StatusBar.currentHeight, left: this.actionX}]}
                            >
                                <Text style={styles.actionText}>开始!</Text>
                            </View>
                        </TouchableNativeFeedback>

                        {/*按动特效*/}
                        <View style={[styles.passOn, {left: this.actionX + 90, top: this.actionY - StatusBar.currentHeight - 30}]}>
                            <Surface width={70} height={70} style={{backgroundColor: 'transparent'}}>
                                <Shape d={new Path("M-0.013,9.003 C-0.013,9.003 3.521,11.513 3.987,15.005 C4.517,18.984 1.987,24.007 1.987,24.007 C1.987," +
                                    "24.007 20.555,22.464 32.987,29.009 C45.420,35.554 52.988,50.015 52.988,50.015 L66.988,49.015 C66.988,49.015 60.233," +
                                    "44.932 59.988,41.012 C59.733,36.932 65.988,33.010 65.988,33.010 C65.988,33.010 55.414,32.863 51.988,28.009 C49.609," +
                                    "24.637 53.988,16.005 53.988,16.005 C53.988,16.005 44.601,19.601 39.988,17.005 C36.928,15.284 37.988,7.002 37.988," +
                                    "7.002 C37.988,7.002 25.701,12.004 19.987,10.003 C16.032,8.618 17.987,-0.000 17.987,-0.000 C17.987,-0.000 15.528," +
                                    "5.731 10.987,8.002 C6.529,10.232 -0.013,9.003 -0.013,9.003 Z")}
                                       strokeWidth={3} stroke={'#fff'}/>
                            </Surface>
                        </View>

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
        );
    }
}

const styles = StyleSheet.create({
    main : {
        flex : 1,
        justifyContent : "center",
        alignItems : "center",
        backgroundColor: "#009688",
    },
    inputMain : {
        flexDirection : 'row',
        flex : 1,
    },
    inputTitle : {
        color : 'white',
        marginBottom : 5,
    },
    input : {
        marginBottom : 30,
        paddingLeft : 20,
        paddingBottom: 10,
        paddingTop : 10,
        borderColor : "#e91e63",
        borderWidth : 1,
        borderRadius : 30,
        color : 'white',
    },
    action : {
        marginBottom : 30,
        backgroundColor : "#e91e63",
        height : 150,
        width : 150,
        borderRadius : 75,
        justifyContent : "center",
        alignItems : "center",
    },
    actionText : {
        color : "white",
        fontSize : 30,
    },

    modelMain: {
        backgroundColor: '#00000050',
        flex: 1,
    },
    modelPoint: {
        position: 'absolute',

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

    passOn: {
        position: 'absolute',
        height: 70,
        width: 70,
    },

    modelAction: {
        backgroundColor : "#e91e63",
        height : 150,
        width : 150,
        borderRadius : 75,
        position: 'absolute',
        justifyContent : "center",
        alignItems : "center",
    }
});
