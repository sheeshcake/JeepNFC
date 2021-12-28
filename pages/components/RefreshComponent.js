import React, {useState} from 'react'
import { View, Text, TouchableOpacity  } from 'react-native'
import Animated from 'react-native-reanimated'


const RefreshComponent = ({headerY}) => {

    const [refresh, setRefresh] = useState("Refresh")
    const [isrefresh, setIsRefresh] = useState(false)

    async function getBusses(){
        setRefresh("Refreshing..")
        setIsRefresh(true)
        setRefresh("Refresh")
        setIsRefresh(false)
    }

    return (
        <Animated.View
            style={{
                position: 'absolute',
                zIndex: 20,
                backgroundColor: 'rgba(255,255,255,0.99)',
                width: '100%',
                padding: 20,
                marginTop: headerY,
                height: 100
            }}
        >
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center'
                }}
            >
                <View>
                    <Text
                        style={{
                            fontSize: 20
                        }}
                    >Available Bus:</Text>
                </View>

                <TouchableOpacity
                    style={{
                        backgroundColor: "#0CB0E6",
                        padding: 5,
                        borderRadius: 10,
                    }}
                    onPress={()=> getBusses()}
                >
                    <Text
                        style={{
                            fontSize: 15,
                            color: "#FFFFFF"
                        }}
                    >{refresh}</Text>
                </TouchableOpacity>
            </View>
        </Animated.View>
    )
}

export default RefreshComponent
