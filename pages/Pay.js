import React, {useState, useRef, useEffect} from 'react'
import { Animated, View, Text, ScrollView, StatusBar, TextInput, TouchableOpacity } from 'react-native'
import {Picker} from '@react-native-picker/picker';
import { DataTable } from 'react-native-paper';
import { SecondaryHeader, FooterVersion } from './components';
import api from "../api";
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
    USBPrinter,
    NetPrinter,
    BLEPrinter,
  } from "react-native-thermal-receipt-printer";

const Pay = ({navigation, route}) => {
    const [busData, setBusData] = useState([])
    const [isAquired, setIsAquired] = useState(false)
    const [aquiredBus, setAquiredBus] = useState("")
    const [cardNumber, setCardNumber] = useState("")
    const [selectedRoute, setSelectedRoute] = useState("0")
    const [routeName, setRouteName] = useState([])
    const [totalPayment, setTotalPayment] = useState("0")
    const [bus_routes, setRoutes] = useState([])
    const [driverData, setDriverData] = useState([])
    const header_h = useRef(new Animated.Value(100)).current
    const [printers, setPrinters] = useState([]);
    const [currentPrinter, setCurrentPrinter] = useState();
    useEffect(() => {
        BLEPrinter.init().then(()=> {
            BLEPrinter.getDeviceList().then(setPrinters);
            });
        let { busData } = route.params
        setBusData(busData)
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
            }
        }
        get_data()
        getUserData()
    }, [])

    const _connectPrinter = (printer) => {
        //connect printer
        BLEPrinter.connectPrinter(printer.inner_mac_address).then(
          setCurrentPrinter,
          error => console.warn(error))
    }
    function removeNumber(number){
        let num = number.length
        let hashnum = ""
        for(i = num; i >= (num - 3); i--){
            hashnum = number.charAt(i) + hashnum
        }
        return "*****" + hashnum;
    }

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
        formData.append('driver_id', busData.d_id)
        // formData.append('amount', totalPayment)
        formData.append('route_id', selectedRoute)
        formData.append('card_number', cardNumber)
        formData.append('marshal_id', driverData.m_id)
        let {data} = await api.pay(formData)
        console.log(data)
        alert(data["message"]);
        let date = Date(Date.now()).toString();
        let print_data = "<C>Iligan City Jeep Modernizing</C>\n"
                        +"<C>" + date + "</C>\n"
                        +"<C>Bus Number: " + busData.minibus_number + "</C>\n"
                        +"<C>Driver ID: " + busData.d_id + "</C>\n"
                        +"<C>Marshal ID: " + driverData.m_id + "</C>\n"
                        +"<C>Route: " + routeName.route_start + "," + routeName.route_end + "(vice versa)</C>\n"
                        +"<C>Card Number: " + removeNumber(cardNumber) + "</C>\n"
                        +"<C>Fair Amount: " + routeName.route_amount + "</C>\n"
                        +"<C>Card Balance: " + data.data.card_amount + "</C>\n"
        console.log(currentPrinter)
        currentPrinter && BLEPrinter.printBill(print_data);
        setCardNumber("")
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
                        paddingBottom: 20,
                        color: 'black'
                    }}
                >
                    Bus Number: {busData.minibus_number}
                </Text>
                {
                    currentPrinter ? null :
                    <View style={{ marginTop: 120, justifyContent: 'center', alignItems: 'center'}}>
                        <Text>Please Select a Bluetooth device</Text>
                    {
                        printers.map(printer => (
                        <TouchableOpacity
                            style={{
                                backgroundColor: "#3366CC",
                                padding: 10,
                                marginBottom: 5,
                                borderRadius: 20
                            }}
                            key={printer.inner_mac_address} onPress={() => _connectPrinter(printer)}>
                            <Text style={{color: 'white'}}>{printer.device_name}</Text>
                        </TouchableOpacity>
                        ))
                    }
                    </View>
                }
                {console.log(aquiredBus + " == " + busData.m_b_id)}
                {isAquired && aquiredBus == busData.m_b_id ? 
                    <View>
                        <Text
                            style={{
                                color: 'black'
                            }}
                        >Card Number</Text>
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
                                placeholderTextColor="#000" 
                                secureTextEntry={true}
                                placeholder="E.g: 1234567890"
                                onChangeText={setCardNumber}
                                value={cardNumber}
                            />
                        </View>
                        <Text
                            style={{
                                color: 'black'
                            }}
                        >Select Route</Text>
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
                                onValueChange={(itemValue, itemIndex) =>{
                                    setSelectedRoute(itemValue)
                                    setRouteName(bus_routes[itemIndex])
                                    console.log(bus_routes[itemIndex])
                                }
                                }
                                itemStyle={{color: "black"}}
                            >
                                {bus_routes?.map((d) => { return (
                                    <Picker.Item color="black"  label={`${d.route_end} to ${d.route_start}`} value={d.route_id}/>
                                )
                                })}
                            </Picker>
                        </View>
                        <Text
                            style={{
                                color: 'black'
                            }}
                        >Fair: {routeName?.route_amount ? routeName?.route_amount : 'Please Select a Route'}</Text>
                        {/* <View
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
                                placeholderTextColor="#000" 
                                keyboardType='numeric'
                                placeholder="E.g: ₱20"
                                onChangeText={setTotalPayment}
                                value={totalPayment}
                            />
                        </View> */}
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
                            <Text style={{color: 'black'}}>Scroll To Leave Bus</Text>
                        </View>
                        <View
                            style={{
                                flex: 1,
                                marginTop: 150,
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
                                onPress={(e) => navigation.navigate("LoadCard") }
                            >
                                <Text
                                    style={{
                                        fontSize: 20,
                                        color: "#FFFFFF"
                                    }}
                                >Load A Card</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: "#3366CC",
                                    padding: 20,
                                    borderRadius: 20,
                                    marginBottom: 100
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
                : aquiredBus !== busData.m_b_id && isAquired == true ?
                    <Text
                        style={{
                            color: 'black'
                        }}
                    >You Already Aquired a Bus!</Text>
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

export default Pay
