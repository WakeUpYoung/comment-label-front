import {Dimensions} from "react-native";

const remote = 'https://www.wakeupeidolon.cn:8094';
const local = 'http://192.168.2.109:8085';

export default {
    backendUrl : remote,
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
    handWritten: '沐瑶软笔手写体',
    windowWidth : Dimensions.get('window').width,
    windowHeight : Dimensions.get('window').height,
    currentVersion: '1.1.0',
}