import {View, Text} from 'react-native'
import React from 'react'
import {Slot} from "expo-router";

export default function _Layout() {
    return (
        <View>
            <Text className='mt-10 ml-18 '>Auth Layout</Text>
            <Slot/>
        </View>
    )
}
