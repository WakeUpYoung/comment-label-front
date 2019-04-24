import React, {Component} from 'react';
import {createAppContainer, createStackNavigator} from "react-navigation";
import EmailActivity from "../activities/EmailActivity";
import LabelActivity from "../activities/LabelActivity";
import UserActivity from "../activities/UserActivity";
import ADActivity from "../activities/ADActivity";
import Global from "../config/Global";
import LabelMainActivity from "../activities/LabelMainActivity";
import createMaterialBottomTabNavigator
    from "react-navigation-material-bottom-tabs/dist/navigators/createMaterialBottomTabNavigator";
import HomeActivity from "../activities/HomeActivity";
import AntDesign from "react-native-vector-icons/AntDesign";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import LoginActivity from "../activities/LoginActivity";

export const LabelNavigator = createStackNavigator(
    {
        LabelMain : LabelMainActivity,
        Labeling : LabelActivity,
    },
    {
        initialRouteName : "LabelMain" ,
        mode: 'modal',
        headerMode: 'none',
    }
);

export const UserNavigator = createStackNavigator(
    {
        User : UserActivity,
        Email : EmailActivity,
    },
    {
        initialRouteName : "User" ,
        mode: 'modal',
        headerMode: 'none',
    },
);

export const TabNavigator = createMaterialBottomTabNavigator(
    {
        Home : {
            screen : HomeActivity,
            navigationOptions : ({navigation}) => ({
                tabBarIcon : ({tintColor, focused}) => {
                    return <AntDesign name={'home'} color={tintColor} size={26} />;
                },
                tabBarColor: Global.homeStyle,
            }),

        },
        Label : {
            screen : LabelNavigator,
            navigationOptions : ({navigation}) => ({
                tabBarIcon : ({tintColor, focused}) => {
                    return <SimpleLineIcons name={'pencil'} color={tintColor} size={26} />;
                },
                tabBarColor : Global.labelStyle,
            }),
        },
        User : {
            screen : UserNavigator,
            navigationOptions : ({navigation}) => ({
                tabBarIcon : ({tintColor, focused}) => {
                    return <FontAwesome name={'user-o'} color={tintColor} size={26} />;
                },
                tabBarColor : Global.userStyle,
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

export const LoginStack = createStackNavigator(
    {
        Login : {
            screen : LoginActivity
        },
        Forget : {
            screen : EmailActivity
        },
        Main : {
            screen : TabNavigator
        },

    },
    {
        initialRouteName : "Login" ,
        mode: 'modal',
        headerMode: 'none',
    }
);

export const ADScreenNavigator = createStackNavigator(
    {
        AD : ADActivity,
        Login: LoginStack,
        Main: TabNavigator,
    },
    {
        initialRouteName : "AD" ,
        mode: 'modal',
        headerMode: 'none',
    },
);

export const LoginNavigator = createAppContainer(LoginStack);
export const MainAppContainer = createAppContainer(TabNavigator);
export const ADScreen = createAppContainer(ADScreenNavigator);
