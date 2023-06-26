

import React, { useState } from 'react'
import {View, StyleSheet} from 'react-native'
import { TextInput, Button, Text } from 'react-native-paper'

export default function SignupScreen({navigation}) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const onSubmit = () => {
        console.log(name, email, password, passwordConfirm)
        // navigation.navigate('Login')
    }
    return (
        <View>
             <Text style={{textAlign: 'center', fontSize: 20, marginTop: 60}}>Please SignUp</Text>
            <View style={styles.container}>
                <TextInput style={styles.input} mode='flat'  placeholder='Name' value={name} onChangeText={(name) => setName(name)} />
                <TextInput style={styles.input} mode='flat'  placeholder='Email' value={email} onChangeText={(email)=> setEmail(email)} />
                <TextInput style={styles.input} mode='flat'  placeholder='Password' value={password} onChangeText={(password)=> setPassword(password)} />
                <TextInput style={styles.input} mode='flat'  placeholder='Confirm Password' value={passwordConfirm} onChangeText={(passwordConfirm)=> setPasswordConfirm(passwordConfirm)} />
                
                <Button  onPress={onSubmit} style={{marginTop: 30}} mode='contained'>Submit</Button>
            </View>
            <Text style={{textAlign: 'center', fontSize: 20, marginTop: 20}}>Already have an account?</Text>
            <Button  onPress={()=> navigation.navigate('Login')} style={{marginTop: 10}} mode='contained'>Login</Button>
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
    
});