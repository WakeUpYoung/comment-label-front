import React, {Component} from 'react';
import {View, StatusBar, Image, Text, TouchableOpacity, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

export default class HeaderBar extends Component{
    constructor(props){
        super(props);
    }

    static propTypes = {
        title : PropTypes.string,
        onPressBack : PropTypes.func.isRequired,
        color : PropTypes.string,
        backgroundColor : PropTypes.string,
    };

    static defaultProps = {
        color : 'white',
        backgroundColor : 'white',
    };

    render(){
        return (
            <View style={[styles.mainView, {backgroundColor : this.props.backgroundColor}]}>

                <TouchableOpacity
                    onPress={this.props.onPressBack}>
                    <View style={[{paddingTop : StatusBar.currentHeight}, styles.backButton]}>
                        <SimpleLineIcons name={'arrow-left'} color={this.props.color} size={20}/>
                        <Text style={{color : this.props.color, fontSize : 15}}>返回</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.title}>
                    <Text>{this.props.title}</Text>
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    mainView : {
        flexDirection: 'row',
        paddingBottom: 10,
        paddingTop: 5,
    },
    backButton : {
        flexDirection : 'row',
        alignItems: 'center',
        margin : 0,
        padding : 0,
        marginLeft : 10,
    },
    title : {
        flex : 1,
        flexDirection : 'row',
        alignItems: 'center',
        fontSize: 15
    }
});