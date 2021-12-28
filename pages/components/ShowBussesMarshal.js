import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View, Image } from 'react-native'
import Animated from 'react-native-reanimated'
import api from '../../api'
import {images} from '../../assets'

const ShowBussesMarshal = ({navigation, scrollY}) => {
    const [busses, setBusses] = useState([]);
    useEffect(() => {
        getBussesData();
    }, [])
    async function getBussesData(){
        let {data} = await api.getBusses();
        console.log(data)
        if(data.error){
            alert(data.error);
        }else{
            console.log(data);
            setBusses(data.data);
        }
    }
    return (
        
        <View
            style={{
                flex: 1,
                width: '100%',
                height: '100%',
                backgroundColor: 'white',
            }}
        >
            <Animated.ScrollView
                style={{
                    flex: 1,
                    padding: 20,
                    paddingTop: 300
                }}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                bounces={false}
                scrollEventThrottle={16}
                onScroll={Animated.event([
                    {
                        nativeEvent: {contentOffset: {y: scrollY}}
                    }
                ])}
            >
                {
                    busses.length > 0 ? busses.map((d, index) => {
                        console.log(d)
                        return(
                            <TouchableOpacity
                                key={index}
                                style={{
                                    backgroundColor: "#0CB0E6",
                                    borderRadius: 20,
                                    marginBottom: 20,
                                    borderColor: "#000000",
                                    borderWidth: 1,
                                    padding: 30,
                                    justifyContent: 'space-evenly',
                                    alignItems: 'center',
                                    flex: 1,
                                }}
                                activeOpacity={d["is_available"] == "0" ? 1 : 0.7}
                                onPress={() => {
                                    d["is_available"] == "0" ? navigation.navigate("Pay", { busData: d }) : null
                                }}
                            >
                                <Text>
                                    {d["minibus_number"]}
                                </Text>
                                <Text>
                                    {
                                        d["is_available"] == "0" ? "Status: Driver is Present" : "Status: No Driver Aquired"
                                    }
                                </Text>
                            </TouchableOpacity>
                        )
                    }) :
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            flex: 1
                        }}
                    >
                        <Image
                            source={images.loading}
                            style={{
                                height:  200,
                                width: 200,
                                resizeMode: 'stretch'
                            }}
                        />
                    </View> 
                }
            </Animated.ScrollView>
        </View>
    )
}

export default ShowBussesMarshal
