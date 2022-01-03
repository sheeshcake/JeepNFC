import React, {useState, useRef} from 'react'
import { Animated, View, Text, TextInput, StatusBar, TouchableOpacity } from 'react-native'
import api from '../api'
import { SecondaryHeader } from './components'

const LoadCard = ({navigation}) => {

    const [cardNumber, setCardNumber] = useState("")
    const [totalPayment, setTotalPayment] = useState("0")
    const header_h = useRef(new Animated.Value(100)).current


    async function Load(){
        let formData = new FormData()
        formData.append("card_number", cardNumber)
        formData.append("amount", totalPayment)
        let {data} = await api.loadCard(formData)
        alert(data)
        setCardNumber("")
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
