import React, {useEffect, useState, useRef} from 'react'
import { View, Text, StatusBar, Image, TouchableOpacity } from 'react-native'
import { MainHeader, FooterVersion, RefreshComponent, ShowBusses } from './components'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {images} from '../assets'
import Animated from 'react-native-reanimated'
import api from '../api'

const HEADER_HEIGHT = 200;

const JeepHome = ({navigation}) => {
    const [data, setData] = useState([])
    const [all_periods, setAll_periods] = useState([])
    const [refresh, setRefresh] = useState("Refresh") 
    const scrollY = useRef(new Animated.Value(0)).current
    const diffClampScrollY = Animated.diffClamp(scrollY, 150, HEADER_HEIGHT)
    const headerY = Animated.interpolateNode(diffClampScrollY, {
        inputRange: [150, HEADER_HEIGHT],
        outputRange: [200, HEADER_HEIGHT - 60]
    })
    useEffect(() => {
        async function check(){
            if(data.length == 0){
                let data_json = await AsyncStorage.getItem('user_data')
                console.log("user" + JSON.parse(data_json));
                setData(JSON.parse(data_json))
                try{
                    let value = await AsyncStorage.getItem('bus_id');
                    if (value != null){
                        // alert(value)
                        let formData = new FormData()
                        formData.append("bus_id", value)
                        let {data} = await api.getBusData(formData)
                        // alert(bus_data)
                        await AsyncStorage.setItem('bus_data', JSON.stringify(data))
                        navigation.navigate("BusDetails", { busData: data })
                    }
                }catch(e){
                    console.log(e)
                    navigation.reset({
                        index: 0,
                        routes: [{name: 'Login'}],
                    });
                }
            }else{
                // getPayroll()
            }
        }
        check()
    }, [])






    return (
        <View
            style={{
                flex: 1,
            }}
        >
            <MainHeader
                navigation={navigation}
                headerY={headerY}
            />
            <RefreshComponent
                headerY={headerY}
            />
            <ShowBusses
                navigation={navigation}
                scrollY={scrollY}
            />
            <FooterVersion />
            <StatusBar
                animated={true}
                backgroundColor="#3366CC"
            />
        </View>
    )
}

export default JeepHome
