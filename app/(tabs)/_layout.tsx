import { TabBarIconProps } from "@/type";
import { Redirect, Tabs } from 'expo-router';
import React from 'react';
import { Image, Text, View } from "react-native";
import useAuthStore from "../../store/Auth.store";
import {text} from "node:stream/consumers";
import cn from "clsx";

const TabBarIcon = ({focused, icon,title}:TabBarIconProps) => (
        <View className='tab-icon'>
            <Image source={icon} className='size-10' resizeMode='contain' tintColor={focused ? '#FE8C00' : '#5d5f6d'} />
            <Text className={cn('text-sm font-bold',focused?'text-primary':'text-gray-100' )}>{title}</Text>
        </View>
);

export default function TabLayout() {
    const {isAuthenticated} = useAuthStore();
    if(!isAuthenticated) return <Redirect href ='/sign-In'/>
    return (
        <Tabs screenOptions={{
                headerShown:false,
                tabBarShowLabel:false,
                tabBarStyle: {
                    borderTopLeftRadius:50,
                    borderTopRightRadius:50,
                    borderBottomLeftRadius:50,
                    borderBottomRightRadius:50,
                    marginHorizontal:20,
                    height:80,
                    position:'absolute',
                    bottom:40,
                    backgroundColor:'#fff',
                    elevation:5,
                    shadowColor:'#1a1a1a',
                    shadowOffset:{
                        width:0,
                        height:2
                    },
                    shadowRadius:4,
                    shadowOpacity:0.1,
                }
            }}>
            <Tabs.Screen name='index'
                         options={{
                             title:'Home',
                             tabBarIcon:({focused}) => (<TabBarIcon title='Home' icon={require('../../assets/icons/home.png')} focused={focused} />)
                         }}
            />
            <Tabs.Screen name='search'
                         options={{
                             title:'Search',
                             tabBarIcon:({focused}) => (<TabBarIcon title='Search' icon={require('../../assets/icons/search.png')} focused={focused} />)
                         }}
            />
            <Tabs.Screen name='cart'
                         options={{
                             title:'Cart',
                             tabBarIcon:({focused}) => (<TabBarIcon title='Cart' icon={require('../../assets/icons/bag.png')} focused={focused} />)
                         }}
            />
            <Tabs.Screen
                name='profile'
                 options={{
                     title:'Profile',
                     tabBarIcon:({focused}) => (<TabBarIcon title='Profile' icon={require('../../assets/icons/person.png')} focused={focused} />)
                 }}
            />
        </Tabs>
    );
}
