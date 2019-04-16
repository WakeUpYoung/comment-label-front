import React, {Component} from 'react';
import {
    Platform, StyleSheet, Text, ProgressBarAndroid,
    View, ToastAndroid, Modal
} from 'react-native';
import PropTypes from 'prop-types';

export default class LoadModel extends Component{
    constructor(props){
        super(props);
        this.state = {
            visible : false,
        };
        this.showLoading = this.showLoading.bind(this);
        this.hiddenLoading = this.hiddenLoading.bind(this);
    }

    static propTypes = {
        color : PropTypes.string,
        title : PropTypes.string,
    };

    static defaultProps = {
        color : '#ff832c',
    };

    showLoading(){
        this.setState({
            visible : true
        })
    }

    hiddenLoading(){
        this.setState({
            visible : false
        })
    }

    render() {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.visible}
                onRequestClose={() => {
                    return false
                }}
            >
                <View style={styles.father}>
                    <View style={styles.child}>
                        <ProgressBarAndroid styleAttr={'Normal'}
                                            color={this.props.color}/>
                        <Text style={styles.title}>{this.props.title}</Text>

                    </View>
                </View>
            </Modal>
        );
    }

}

const styles = StyleSheet.create({
    father : {
        flexDirection : 'row',
        flex : 1,
        justifyContent : "center",
        alignItems: "center",
        backgroundColor : "#00000090"
    },
    child : {
        justifyContent : "center",
        alignItems: "center",
        width : 200,
        height : 200,
        backgroundColor : "#fff"
    },
    title : {
        fontSize : 16,
        marginTop : 20,
    }
});