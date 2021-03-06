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
import AboutActivity from "../activities/AboutActivity";

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
        About : AboutActivity,
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
                    return <AntDesign name={'home'} color={tintColor} size={24} />;
                },
                tabBarColor: Global.homeStyle,
                tabBarLabel: '首页',
            }),

        },
        Label : {
            screen : LabelNavigator,
            navigationOptions : ({navigation}) => ({
                tabBarIcon : ({tintColor, focused}) => {
                    return <SimpleLineIcons name={'pencil'} color={tintColor} size={24} />;
                },
                tabBarColor : Global.labelStyle,
                tabBarLabel: '标签',
            }),
        },
        User : {
            screen : UserNavigator,
            navigationOptions : ({navigation}) => ({
                tabBarIcon : ({tintColor, focused}) => {
                    return <FontAwesome name={'user-o'} color={tintColor} size={24} />;
                },
                tabBarColor : Global.userStyle,
                tabBarLabel: '我的',
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

export const RootStack = createStackNavigator(
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

export const MainAppContainer = createAppContainer(TabNavigator);
export const RootScreen = createAppContainer(RootStack);
