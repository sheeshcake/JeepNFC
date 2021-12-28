import React, {useState, useRef, useEffect} from 'react'
import { Animated, View, Text, ScrollView, StatusBar, TextInput, TouchableOpacity } from 'react-native'
import {Picker} from '@react-native-picker/picker';
import { DataTable } from 'react-native-paper';
import { SecondaryHeader, FooterVersion } from './components';
import api from "../api";
import AsyncStorage from '@react-native-async-storage/async-storage'

const Pay = ({navigation, route}) => {
    const [busData, setBusData] = useState([])
    const [isAquired, setIsAquired] = useState(false)
    const [aquiredBus, setAquiredBus] = useState("")
    const [cardNumber, setCardNumber] = useState("")
    const [selectedRoute, setSelectedRoute] = useState("0")
    const [totalPayment, setTotalPayment] = useState("0")
    const [bus_routes, setRoutes] = useState([])
    const [driverData, setDriverData] = useState([])
    const header_h = useRef(new Animated.Value(100)).current
    useEffect(() => {

        async function get_data(){
            // await AsyncStorage.clear()
            let {data} = await api.getRoutes()
            console.log(data);
            setRoutes(data.data);
            if(await AsyncStorage.getItem('bus_id') === JSON.parse(await AsyncStorage.getItem("bus_data")).data[0].m_b_id){
                setIsAquired(true)
            }
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
        let busNumber = await AsyncStorage.getItem('bus_id')
        setAquiredBus(busNumber)
    }

    async function Pay(){
        let formData = new FormData()
        formData.append('bus_id', busData.m_b_id)
        formData.append('driver_id', busData.driver_id)
        formData.append('amount', totalPayment)
        formData.append('route_id', selectedRoute)
        formData.append('card_number', cardNumber)
        formData.append('marshal_id', driverData.m_id)
        let {data} = await api.pay(formData)
        alert(data);
    }

    async function AquireBus(){
        alert("Bus Aquired!")
        await AsyncStorage.setItem('bus_id', busData.m_b_id)
        setAquiredBus(busData.m_b_id)
        setIsAquired(true)
    }

    async function LeaveBus(){
        alert("Success!")
        await AsyncStorage.removeItem('bus_id')
        await AsyncStorage.removeItem("bus_data")
        setIsAquired(false)
        navigation.reset({
            index: 0,
            routes: [{name: 'MarshallHome'}],
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
                title={"Payment"}
                navigation={navigation}
                header_h={header_h}
            />
            <ScrollView
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
                    marginTop: 100
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
                {console.log(aquiredBus + " == " + busData.m_b_id)}
                {isAquired && aquiredBus == busData.m_b_id ? 
                    <View>
                        <Text>Card Number</Text>
                        <View
                            style={{
                                borderColor: "#dbdbdb",
                                borderWidth: 1,
                                borderRadius: 10,
                                marginBottom: 10
                            }}
                        >
                            <TextInput
                                style={{
                                    width: 300,
                                    height: 40,
                                    color: 'black'
                                }}
                                secureTextEntry={true}
                                placeholder="E.g: 1234567890"
                                onChangeText={setCardNumber}
                                value={cardNumber}
                            />
                        </View>
                        <Text>Select Route</Text>
                        <View
                            style={{
                                borderColor: "#dbdbdb",
                                borderWidth: 1,
                                borderRadius: 10,
                                marginBottom: 10
                            }}
                        >
                            <Picker
                                selectedValue={selectedRoute}
                                onValueChange={(itemValue, itemIndex) =>
                                setSelectedRoute(itemValue)
                                }
                            >
                                {bus_routes?.map((d) => { return (
                                    <Picker.Item label={`${d.route_end} to ${d.route_start}`} value={d.route_id}/>
                                )
                                })}
                            </Picker>
                        </View>
                        <Text>Amount</Text>
                        <View
                            style={{
                                borderColor: "#dbdbdb",
                                borderWidth: 1,
                                borderRadius: 10,
                                marginBottom: 10
                            }}
                        >
                            <TextInput
                                style={{
                                    width: 300,
                                    height: 40,
                                    color: 'black'
                                }}
                                keyboardType='numeric'
                                placeholder="E.g: ₱20"
                                onChangeText={setTotalPayment}
                                value={totalPayment}
                            />
                        </View>
                        <View
                            style={{
                                flex: 1,
                                marginBottom: 100,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    backgroundColor: "#3366CC",
                                    padding: 20,
                                    borderRadius: 20
                                }}
                                onPress={Pay}
                            >
                                <Text
                                    style={{
                                        fontSize: 20,
                                        color: "#FFFFFF"
                                    }}
                                >Pay</Text>
                            </TouchableOpacity>
                            <Text>Scroll To Leave Bus</Text>
                        </View>
                        <View
                            style={{
                                flex: 1,
                                marginTop: 100,
                                marginBottom: 50,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
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
                        </View>
                        
                    </View>
                : aquiredBus !== busData.m_b_id && !isAquired ?
                    <Text>You Already Aquired a Bus!</Text>
                : isAquired ? 
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
                : null

                }
                

            </View>


            
            </ScrollView>
            <FooterVersion />
        </View>
    )
}

export default Pay