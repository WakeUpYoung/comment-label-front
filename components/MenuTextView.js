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
        imageSource : PropTypes.any.isRequired,
    };

    render() {
        return(
            <TouchableNativeFeedback>
                <View style={styles.mainView}>
                    <Image style={styles.imageView} source={this.props.imageSource}/>
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