import React, {useState, useRef, useEffect} from 'react'
import { Animated, View, Text, TextInput, StatusBar, TouchableOpacity } from 'react-native'
import api from '../api'
import { SecondaryHeader } from './components'
import {
    USBPrinter,
    NetPrinter,
    BLEPrinter,
  } from "react-native-thermal-receipt-printer";


const LoadCard = ({navigation}) => {

    const [cardNumber, setCardNumber] = useState("")
    const [totalPayment, setTotalPayment] = useState("0")
    const header_h = useRef(new Animated.Value(100)).current
    const [printers, setPrinters] = useState([]);
    const [currentPrinter, setCurrentPrinter] = useState();
    let loaded = false
    useEffect(() => {
        BLEPrinter.init().then(()=> {
            BLEPrinter.getDeviceList().then(setPrinters);
            });
    }, []);
    
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

    async function Load(){
        // connectPrinter()
        let formData = new FormData()
        formData.append("card_number", cardNumber)
        formData.append("amount", totalPayment)
        let {data} = await api.loadCard(formData)
        // alert(data)
        let date = Date(Date.now()).toString();
        let print_data = "<C>Iligan City Jeep Modernizing</C>\n"
                        +"<C>" + date + "</C>\n"
                        +"<C>Load your card</C>\n"
                        +"<C>Card Number: " + removeNumber(cardNumber) + "</C>\n"
                        +"<C>Load Amount: " + totalPayment + "</C>\n"
        console.log(currentPrinter)
        currentPrinter && BLEPrinter.printBill(print_data);
        setCardNumber("")
        alert(data)
    } 

    return (
        <View>
            <StatusBar
                animated={true}
                backgroundColor="#3366CC"
            />
            <SecondaryHeader 
                title={"Payment"}
                navigation={navigation}
                header_h={header_h}
            />
            <View
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 100
                }}
            >
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
                >Amount</Text>
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
                        keyboardType='numeric'
                        placeholder="E.g: ₱20"
                        onChangeText={setTotalPayment}
                        value={totalPayment}
                    />
                </View>
                {
                    currentPrinter ? null :
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
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

                <View
                    style={{
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
                        onPress={Load}
                    >
                        <Text
                            style={{
                                fontSize: 20,
                                color: "#FFFFFF"
                            }}
                        >Load</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default LoadCard
