import React,{useEffect, useState, useRef} from 'react'
import { View, Text, TextInput } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { black } from 'react-native-paper/lib/typescript/styles/colors'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { MainHeaderMarshal, FooterVersion, RefreshComponent, ShowBussesMarshal } from './components'
import Animated from 'react-native-reanimated'
import api from '../api'

const HEADER_HEIGHT = 200;

const MarshallHome = ({navigation}) => {

    const [data, setData] = useState([])
    const [busNumber, setBusNumber] = useState("")
    const scrollY = useRef(new Animated.Value(0)).current
    const diffClampScrollY = Animated.diffClamp(scrollY, 150, HEADER_HEIGHT)
    const headerY = Animated.interpolateNode(diffClampScrollY, {
        inputRange: [150, HEADER_HEIGHT],
        outputRange: [200, HEADER_HEIGHT - 60]
    })

    useEffect(async () => {
        if(data.length == 0){
            try{
                let data_json = await AsyncStorage.getItem('user_data')
                // alert(data_json);
                setData(JSON.parse(data_json))
                let value = await AsyncStorage.getItem('bus_id');
                if (value != null){
                    // alert(value)
                    let formData = new FormData()
                    formData.append("bus_id", value)
                    let {data} = await api.getBusData(formData)
                    // alert(bus_data)
                    await AsyncStorage.setItem('bus_data', JSON.stringify(data))
                    navigation.navigate("Pay", { busData: data })
                }
            }catch(e){
                console.log(e)
                // navigation.reset({
                //     index: 0,
                //     routes: [{name: 'Login'}],
                // });
            }
        }else{
            // getPayroll()
        }

    }, [])

    return (
        <View
            style={{
                flex: 1
            }}
        >
            <MainHeaderMarshal
                navigation={navigation}
                headerY={headerY}
            />
            <RefreshComponent
                headerY={headerY}
            />
            <ShowBussesMarshal
                navigation={navigation}
                scrollY={scrollY}
            />
        </View>
    )
}

export default MarshallHome
