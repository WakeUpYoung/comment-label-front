import {Dimensions} from "react-native";

export default {
    backendUrl : 'https://www.wakeupeidolon.cn:8094',
    homeStyle : '#fd8f54',
    labelStyle : '#00b4a1',
    userStyle : '#3f51b5',
    user : {
        id : null,
        openid : null,
        email : null,
        nickname : null,
        gender : null,
        figureurl_qq_small : null,
        figureurl_qq_big : null,
    },
    emailRegx : /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/g,
    windowWidth : Dimensions.get('window').width,
    windowHeight : Dimensions.get('window').height,
    currentVersion: '1.0.0',
}