import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import Menu from "./componentes/home/Menu";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import ListComponent from "./componentes/list/List";
import User from './screen/User'
import Chat from "./screen/Chat";
import Pdf from "./screen/Pdf";

const Tab = createBottomTabNavigator()

const Navigation = () => {
    return (
        <Tab.Navigator initialRouteName="Home">
            <Tab.Screen name="Home" component={Menu} options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({color, size}) => (
                    <MaterialCommunityIcons name="home" color={color} size={size}/>
                )
            }}/>
            <Tab.Screen name={'Listado'} component={ListComponent} options={{
                tabBarLabel: 'Listado',
                tabBarIcon: ({color, size}) => (
                    <MaterialCommunityIcons name={'clipboard-list'} color={color} size={size}/>
                )
            }}/>
            <Tab.Screen name={'Usuarios'} component={User} options={{
                tabBarLabel: 'Usuario',
                tabBarIcon: ({color, size}) => (
                    <MaterialCommunityIcons name={'account'} color={color} size={size}/>
                )
            }}/>
            <Tab.Screen name={'Convertidor (Powered by OpenAI)'} component={Chat} options={{
                tabBarLabel: 'Chat',
                tabBarIcon: ({color, size}) => (
                    <MaterialCommunityIcons name={'chat'} color={color} size={size}/>
                )
            }}/>
            <Tab.Screen name={'Analizador de PDF (Powered by OpenAI)'} component={Pdf} options={{
                tabBarLabel: 'PDF',
                tabBarIcon: ({color, size}) => (
                    <MaterialCommunityIcons name={'file-pdf-box'} color={color} size={size}/>
                )
            }}/>
        </Tab.Navigator>
    )
}

export default Navigation