import React, {useState, useRef, useEffect} from 'react'
import { View, Text, Animated, TouchableOpacity, Image } from 'react-native'

const SecondaryHeader = ({navigation, title, header_h}) => {
    
    return (
        <Animated.View
            style={{
                backgroundColor: "#3366CC",
                height: header_h,
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                justifyContent: 'space-around',
                paddingLeft: 30,
                paddingRight: 30,
                marginBottom: -20,
                zIndex: 2,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 8,
                },
                shadowOpacity: 0.46,
                shadowRadius: 11.14,
                elevation: 17,
                transition: '0.5s'
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <View>
                    <TouchableOpacity
                        style={{
                            borderRadius: 20,
                        }}
                        onPress={() => navigation.goBack()}
                    >
                        <Image
                            style={{
                                width: 20,
                                height: 20,
                                tintColor: "#FFFFFF"
                            }}
                            source={{uri: "https://raw.githubusercontent.com/wendale1231/Flick/master/assets/icons/left-arrow.png"}}
                        />
                    </TouchableOpacity>

                </View>
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Text
                        style={{
                            fontSize: 20,
                            color: "#FFFFFF"
                        }}
                    >{title}</Text>
                </View>

            </View>

        </Animated.View>
    )
}

export default SecondaryHeader
