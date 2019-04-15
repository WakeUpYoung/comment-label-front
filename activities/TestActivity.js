import React, { Component } from "react";
import { Modal, Text, TouchableHighlight, View, ToastAndroid , Button} from "react-native";

export default class TestActivity extends Component {
    constructor(props){
        super(props);
        this.state = {
            modalVisible: false
        };
        this.setModalVisible = this.setModalVisible.bind(this)
    }


    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    render() {
        return (
            <View style={{ marginTop: 22 , flex : 1, flexDirection : 'row'}}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        ToastAndroid.show("Modal has been closed.", ToastAndroid.SHORT);
                        this.setModalVisible(false)
                    }}
                >
                    <View style={{ marginTop: 22, flexDirection : 'row', flex : 1, justifyContent : "center", alignItems: "center", backgroundColor : "#00000050"}}>
                        <View style={{justifyContent : "center", alignItems: "center", width : 100, height : 100, backgroundColor : "#fff"}}>
                            <Text>Hello World!</Text>

                        </View>
                    </View>
                </Modal>

                <View style={{backgroundColor : "#61b4cd", flex : 1}}>
                    <Button
                        title={'click'}
                        onPress={() => {
                            this.setModalVisible(true);
                        }}
                    >
                        <Text
                        >Show Modal</Text>
                    </Button>
                </View>
            </View>
        );
    }
}