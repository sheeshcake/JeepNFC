import React, {useRef} from 'react'
import { View, Text, Animated, AsyncStorage } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { SecondaryHeader } from './components'

const Account = ({navigation}) => {

    const header_h = useRef(new Animated.Value(100)).current
    async function logout(){
        try{
            let value = await AsyncStorage.getItem('bus_id');
            if (value != null){
                alert("Please Leave The bus before log out!")
                // alert(value)
                // let formData = new FormData()
                // formData.append("bus_id", value)
                // let {data} = await api.leaveBus(formData)
                // alert(bus_data)
            }else{
                await AsyncStorage.clear();
                navigation.reset({
                    index: 0,
                    routes: [{name: 'Login'}],
                });
                alert("Logged out!")
            }
        }catch(e){
            console.log(e)
            navigation.reset({
                index: 0,
                routes: [{name: 'Login'}],
            });
        }
    }

    return (
        <View>
            <SecondaryHeader 
                navigation={navigation}
                title={"Account"}
                header_h={header_h}
            />
            <View
                style={{
                    marginTop: 120,
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
                    onPress={() => logout()}
                >
                    <Text
                        style={{
                            fontSize: 20,
                            color: "#FFFFFF"
                        }}
                    >Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Account
