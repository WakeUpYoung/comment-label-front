import React,{Component} from "react";
import {StyleSheet, Text, View, TouchableOpacity, StatusBar, ToastAndroid, TextInput,
    TouchableNativeFeedback, Modal, findNodeHandle, UIManager, ART} from "react-native";
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
        this.timeout = setTimeout(() => {
            this.setState({
                modalVisible: true
            })
        }, 100);
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
        const path = new Path("M1.895,87.895 C25.893,37.872 91.135,35.038 60.895,65.895 C42.052,85.122 23.119,23.236 95.895,1.895 M65.895,0.895 L91.895,4.895 L79.895,25.895 ");
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
                             this.actionX = e.layout.x;
                             this.actionY = e.layout.y;
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
                    <View style={styles.modelMain}
                          >
                        <View style={[styles.modelPoint, {top: this.actionY + 120, left: this.actionX - 60}]}>
                            <Surface width={300} height={120} style={{backgroundColor: 'transparent'}}>
                                <Shape d={path} strokeWidth={5} stroke={'#fff'}/>
                            </Surface>
                            <Text style={[styles.modelText]}
                                  onPress={() => {
                                      this.setState({
                                          modalVisible: false
                                      })
                                  }}>点我!</Text>
                        </View>

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
    }
});
