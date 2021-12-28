import React, {useEffect, useState, useRef} from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import Animated from 'react-native-reanimated'
import AsyncStorage from '@react-native-async-storage/async-storage'


const MainHeaderMarshal = ({navigation, headerY}) => {
    const [data, setData] = useState([])
    useEffect(async () => {
        if(!data.data){
            try{
                let data_json = await AsyncStorage.getItem('user_data')
                console.log(JSON.parse(data_json));
                setData(JSON.parse(data_json).data)
            }catch(e){
                navigation.reset({
                    index: 0,
                    routes: [{name: 'Login'}],
                });
            }
        }
    }, [])


    return (
        <Animated.View
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                backgroundColor: "#3366CC",
                height: headerY,
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                justifyContent: 'space-around',
                zIndex: 2,
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
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                }}
            >
                <View>
                    <Text
                        style={{
                            color: "#FFFFFF",
                            marginBottom: 10,
                            fontWeight: 'bold'
                        }}
                    >WELCOME BACK!</Text>
                    <Text
                        style={{
                            color: "#FFFFFF",
                            fontSize: 35,
                            marginBottom: 5,
                        }}
                    >{data.marshall_name}</Text>
                    <Text
                        style={{
                            color: "#FFFFFF"
                        }}
                    >Marshal</Text>
                </View>
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <TouchableOpacity
                        onPress={() =>navigation.navigate("Account")}
                    >
                        <Image
                            style={{
                                height: 120,
                                width: 100,
                                resizeMode: 'contain',
                                borderRadius: 50
                            }}
                            source={{uri: "https://images.unsplash.com/photo-1509460913899-515f1df34fea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"}}
                        />  
                    </TouchableOpacity>
                </View>

            </View>

        </Animated.View>
    )
}

export default MainHeaderMarshal
