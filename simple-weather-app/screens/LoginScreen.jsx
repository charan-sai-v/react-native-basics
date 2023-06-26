

import { View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'

import React, { useState } from 'react'
import { StyleSheet } from 'react-native'

export default function LoginScreen({navigation}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const onSubmit = () => {
        console.log(email+" "+password)
    }
    

    return (
    <View>
        <Text style={{textAlign: 'center', fontSize: 20, marginTop: 60}}>Please login</Text>
        <View style={styles.container}>
            <TextInput style={styles.input} mode='flat'  placeholder='Email' value={email} onChangeText={(email)=> setEmail(email)} />
            <TextInput secureTextEntry={true} style={styles.input} mode='flat'  placeholder='Password' value={password} onChangeText={(password)=> setPassword(password)} />
            <Button  onPress={onSubmit} style={{marginTop: 30}} mode='contained'>Submit</Button>
        </View>
        <Text style={{}}  onPress={()=>navigation.navigate('SignUp')}>Don't have an account! Please click to Signup</Text>
    </View>
    )
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
        margin: 5,
        padding: 3
    },
    input: {
        marginBottom: 30
    },
    text: {
        color: ''
    }
})