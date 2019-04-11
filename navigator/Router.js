import React, {Component} from 'react';
import {createAppContainer, createBottomTabNavigator, createStackNavigator} from "react-navigation";
import LoginActivity from "../activities/LoginActivity";
import ForgetActivity from "../activities/ForgetActivity";
import AntDesign from "react-native-vector-icons/AntDesign";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import HomeActivity from "../activities/HomeActivity";
import LabelActivity from "../activities/LabelActivity";
import UserActivity from "../activities/UserActivity";
import createMaterialBottomTabNavigator
    from "react-navigation-material-bottom-tabs/dist/navigators/createMaterialBottomTabNavigator";

const RootStack = createStackNavigator(
    {
        Login : {
            screen : LoginActivity
        },
        Forget : {
            screen : ForgetActivity
        }
    },
    {
        initialRouteName : "Login" ,
        mode: 'modal',
        headerMode: 'none',
    }
);

const TabNavigator = createMaterialBottomTabNavigator(
    {
        Home : {
            screen : HomeActivity,
            navigationOptions : ({navigation}) => ({
                tabBarIcon : ({tintColor, focused}) => {
                    return <AntDesign name={'home'} color={tintColor} size={26} />;
                },
                tabBarColor: "#fd8f54"
            }),

        },
        Label : {
            screen : LabelActivity,
            navigationOptions : ({navigation}) => ({
                tabBarIcon : ({tintColor, focused}) => {
                    return <SimpleLineIcons name={'pencil'} color={tintColor} size={26} />;
                },
                tabBarColor : "#00b4a1",
            }),
        },
        User : {
            screen : UserActivity,
            navigationOptions : ({navigation}) => ({
                tabBarIcon : ({tintColor, focused}) => {
                    return <FontAwesome name={'user-o'} color={tintColor} size={26} />;
                },
                tabBarColor : "#3f51b5",
            }),
        },
    },
    {
        initialRouteName : 'Home',
        mode: 'card',
        shifting : true,
        lazy : true,
        activeColor: '#f0edf6',
        inactiveColor: '#0000005C',
        barStyle: { backgroundColor: '#fd8f54' },
    }
);
export const MainAppContainer = createAppContainer(TabNavigator);

/*const MainStack = createStackNavigator(
    {
        Forget : {screen : ForgetActivity},
    },
    {
        initialRouteName : "Forget",
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        },
    }
);*/

export default createAppContainer(RootStack);