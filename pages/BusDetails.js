import React, {useState, useRef, useEffect} from 'react'
import { Animated, View, Text, ScrollView, StatusBar, Image, TouchableOpacity } from 'react-native'
import { DataTable } from 'react-native-paper';
import { SecondaryHeader, FooterVersion } from './components';
import api from "../api";
import AsyncStorage from '@react-native-async-storage/async-storage'

const BusDetails = ({navigation, route}) => {
    const [busData, setBusData] = useState([])
    const [isAquired, setIsAquired] = useState(false)
    const [driverData, setDriverData] = useState([]);
    const header_h = useRef(new Animated.Value(100)).current
    useEffect(() => {
        async function get_data(){
            // await AsyncStorage.clear()
            let busData = await AsyncStorage.getItem("bus_data")
            if(busData != null){
                setIsAquired(true)
                console.log(busData)
                setBusData(JSON.parse(busData).data[0])
            }else{
                let { busData } = route.params
                setBusData(busData)
            }
        }
        get_data()
        getUserData()
    }, [])

    async function getUserData(){
        let data_json = await AsyncStorage.getItem('user_data')
        console.log(JSON.parse(data_json));
        setDriverData(JSON.parse(data_json).data)
    }


    async function AquireBus(){
        let formData = new FormData();
        formData.append("bus_id", busData.m_b_id);
        formData.append("driver_id", driverData.driver_id);
        let {data} = await api.aquireBus(formData);
        console.log(data)
        alert(data)
        await AsyncStorage.setItem('bus_id', busData.m_b_id)
        setIsAquired(true)
    }

    async function LeaveBus(){
        let formData = new FormData();
        formData.append("bus_id", busData.m_b_id);
        let {data} = await api.leaveBus(formData);
        console.log(data)
        alert(data)
        await AsyncStorage.removeItem('bus_id')
        await AsyncStorage.removeItem("bus_data")
        setIsAquired(false)
        navigation.reset({
            index: 0,
            routes: [{name: 'JeepHome'}],
        });
    }
    
    
    
    return (
        <View
            style={{
                flex: 1
            }}
        >
            <StatusBar
                animated={true}
                backgroundColor="#3366CC"
            />
            <SecondaryHeader 
                title={"Bus Details"}
                navigation={navigation}
                header_h={header_h}
            />
            <ScrollView
                style={{
                    paddingTop: 20,
                    paddingBottom: 20
                }}
                onScroll={(event) => {
                    const scrolling = event.nativeEvent.contentOffset.y;
                    if(scrolling > 70){
                        Animated.timing(
                            header_h,
                                {
                                    toValue: 70,
                                    duration: 120,
                                    useNativeDriver: false
                                }
                        ).start();
                    }else{
                        Animated.timing(
                            header_h,
                                {
                                    toValue: 100,
                                    duration: 120,
                                    useNativeDriver: false
                                }
                        ).start();
                    }
                }}
            >
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 20,
                    height: 300,
                    backgroundColor: "#FFFFF",
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 8,
                    },
                    shadowOpacity: 0.46,
                    shadowRadius: 11.14,
                    elevation: 17,
                }}
            >
                <Text
                    style={{
                        fontSize: 30,
                        paddingBottom: 20
                    }}
                >
                    Bus Number: {busData.minibus_number}
                </Text>
                {isAquired ? 
                    <TouchableOpacity
                        style={{
                            backgroundColor: "#3366CC",
                            padding: 20,
                            borderRadius: 20
                        }}
                        onPress={LeaveBus}
                    >
                        <Text
                            style={{
                                fontSize: 20,
                                color: "#FFFFFF"
                            }}
                        >Leave Bus</Text>
                    </TouchableOpacity>
                :
                    <TouchableOpacity
                        style={{
                            backgroundColor: "#3366CC",
                            padding: 20,
                            borderRadius: 20
                        }}
                        onPress={AquireBus}
                    >
                        <Text
                            style={{
                                fontSize: 20,
                                color: "#FFFFFF"
                            }}
                        >Aquire Bus</Text>
                    </TouchableOpacity>
                }

            </View>


            
            </ScrollView>
            <FooterVersion />
        </View>
    )
}

export default BusDetails
