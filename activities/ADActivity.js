import React, {Component} from 'react';
import {
    Platform, StyleSheet, Text, TouchableOpacity,
    View, ToastAndroid, BackHandler
} from 'react-native';
import Global from "../config/Global";

export default class ADActivity extends Component{
    constructor(props){
        super(props);
        this.state = {
            time: 5,
        };
        this.onPress = this.onPress.bind(this)
    }

    componentDidMount(): void {
        this.interval = setInterval(() => {
            let time = this.state.time;
            if (time > 0){
                time--;
                this.setState({
                    time : time,
                })
            }else{
                this.props.navigation.replace("Main");
            }

        }, 1000)
    }

    componentWillUnmount(): void {
        this.interval && clearInterval(this.interval)
    }

    onPress(){
        this.props.navigation.replace("Main");

    }

    render() {
        return (
            <View style={styles.main}>
                <View style={styles.skipBtn}>
                    <TouchableOpacity
                        underlayColor={Global.homeStyle}
                        onPress={this.onPress}>
                        <View style={styles.skip}>
                            <Text style={styles.skipText}>跳过 ( {this.state.time} )</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.adView}>
                    <Text style={styles.text}>广告位招租</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,

    },
    text : {
        color: '#ff2c1a',
        fontSize: 35,
        fontWeight: 'bold'
    },
    skipBtn: {
        flex: 1,
        flexDirection: 'row',
        position: "absolute",
        left: 0,
        right: 0,
        justifyContent: "flex-end",
    },
    skip : {
        backgroundColor: '#00000090',
        borderRadius: 20,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
    },
    skipText: {
        color: '#fff',
        fontSize: 16,
    },
    adView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

});