import React,{Component} from "react";
import {Text, View, StyleSheet, Image, TouchableNativeFeedback} from "react-native";
import PropTypes from 'prop-types';

export default class MenuTextView extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    static propTypes = {
        title : PropTypes.string.isRequired,
        onPress : PropTypes.func,
        image : PropTypes.element.isRequired,
    };

    render() {
        return(
            <TouchableNativeFeedback
                onPress={this.props.onPress}>
                <View style={styles.mainView}>
                    <View style={{marginLeft: 30, marginRight: 20}}>
                        {this.props.image}
                    </View>
                    <Text style={styles.content}>{this.props.title}</Text>
                </View>
            </TouchableNativeFeedback>
        )
    }
}

const styles = StyleSheet.create({
    mainView : {
        flexDirection : "row",
        alignItems : "center",
        backgroundColor : "#fff",
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