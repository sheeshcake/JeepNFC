import React, { useState, useEffect} from 'react'
import { View, Text, Image, SafeAreaView, PermissionsAndroid, ScrollView, TextInput, Button, StatusBar } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {images} from '../assets';
import { FooterVersion } from './components';
import api from '../api';
import { IgnorePattern } from 'react-native/Libraries/LogBox/LogBox';
import axios from 'axios'



const Login = ({navigation}) => {


useEffect(() => {

    // test()
    getData()
    console.log('hello');
}, [])

const [username, setUsername] = useState("202144")
const [password, setPassword] = useState("REMSEL202144")
const [buttonTextMarshal, setButtonTextMarshal] = useState("Login as Marshal")
const [buttonTextDriver, setButtonTextDriver] = useState("Login as Driver")
const [buttonStatus, setButtonStatus] = useState(false)


async function onLoginDriver(){
    setButtonStatus(true)
    setButtonTextDriver("Logging in....")
    let formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    let {data} = await api.loginDriver(formData);
    console.log(data)
    if(data.error){
        setButtonStatus(false);
        setButtonTextDriver("Login as Driver");
        alert(data.error);
    }else{
        saveDataDriver(data)
    }
}

async function onLoginMarshal(){
    setButtonStatus(true)
    setButtonTextMarshal("Logging in....")
    let formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    let {data} = await api.loginMarshal(formData);
    console.log(data)
    if(data.error){
        setButtonStatus(false);
        setButtonTextMarshal("Login as Marshal");
        alert(data.error);
    }else{
        saveDataMarshal(data)
    }
}

async function saveDataDriver(data){
    try {
        await AsyncStorage.setItem('user_data', JSON.stringify(data).slice(0, -1) + ',"user_type":"driver"}')
        navigation.reset({
            index: 0,
            routes: [{name: 'JeepHome'}],
        });
    } catch (e) {
        console.log(e + "\ntrying again..")
    }

}
async function saveDataMarshal(data){
    try {
        await AsyncStorage.setItem('user_data', JSON.stringify(data).slice(0, -1) + ',"user_type":"marshal"}')
        navigation.reset({
            index: 0,
            routes: [{name: 'MarshallHome'}],
        });
    } catch (e) {
        console.log(e + "\ntrying again..")
    }

}

async function getData(){
    // await AsyncStorage.clear()
    try{
        const value = await AsyncStorage.getItem('user_data')
        console.log(value)
        if(value !== null){
            console.log(JSON.parse(value)?.user_type)
            if(JSON.parse(value)?.user_type == "driver"){
                navigation.reset({
                    index: 0,
                    routes: [{name: 'JeepHome'}],
                });
            }else{
                navigation.reset({
                    index: 0,
                    routes: [{name: 'MarshallHome'}],
                });
            }

        }
    }catch(e){
        console.log(e)
    }

}

function RenderHeader(){
    return (
        <View
            style={{
                flexDirection: 'row',
                alignContent: 'center',
                justifyContent: 'center',
                backgroundColor: '#FFFFFF',
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
            }}
        >
            <Image 
                source={images.logo}
            />
        </View>
    )
}

function RenderForm(){
    return (
        <View
            style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 200,
            }}
        >
            <View
                style={{
                    marginTop: 30,
                    padding: 30,
                    borderRadius: 30,
                    backgroundColor: "#FFFFFF",
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                }}
            >
                <View
                    style={{
                        alignItems: 'center'
                    }}
                >
                    <Text
                        style={{
                            fontSize: 25,
                            marginBottom: 30
                        }}
                    >Login</Text>
                    <View
                        style={{
                            borderColor: "#dbdbdb",
                            borderWidth: 1,
                            borderRadius: 10,
                            marginBottom: 20,
                        }}
                    >
                        <TextInput
                            style={{
                                width: 300,
                                height: 40,
                                color: 'black'
                            }}
                            placeholder="Username"
                            onChangeText={setUsername}
                            value={username}
                        />
                    </View>
                </View>
                <View
                    style={{
                        alignItems: 'center',
                        marginBottom: 20,
                    }}
                >
                    <View
                        style={{
                            borderColor: "#dbdbdb",
                            borderWidth: 1,
                            borderRadius: 10,
                        }}
                    >
                        <TextInput
                            style={{
                                width: 300,
                                height: 40,
                                color: 'black'
                            }}
                            secureTextEntry={true}
                            placeholder="Password"
                            onChangeText={setPassword}
                            value={password}
                        />
                    </View>
                </View>
                <View
                    style={{
                        borderRadius: 20,
                        marginBottom: 10
                    }}
                >
                    <Button 
                        disabled={buttonStatus}
                        title={buttonTextDriver}
                        onPress={onLoginDriver}
                    />
                </View>
                <View
                    style={{
                        borderRadius: 20,   
                    }}
                >
                    <Button 
                        disabled={buttonStatus}
                        title={buttonTextMarshal}
                        onPress={onLoginMarshal}
                    />
                </View>        

            </View>
            

        </View>
    )
}



    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: "#0CB0E6"
            }}
        >
            <StatusBar
                animated={true}
                backgroundColor="#0CB0E6"
            />
            {RenderHeader()}
            <ScrollView>
                {RenderForm()}
            </ScrollView>
            <FooterVersion />
        </SafeAreaView>
    )
}

export default Login
