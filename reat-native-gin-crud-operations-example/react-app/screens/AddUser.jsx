

import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Button, RadioButton, TextInput } from 'react-native-paper'

export default function AddUser({navigation}) {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [gender, setGender] = useState('')
    const [country, setCountry] = useState('')

    const submitData = async () => {
        const response = await fetch('http://localhost:8080/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, email, gender, country})
        })
        const data = await response.json()
        console.log(data)
        navigation.navigate('Home', {data})
    }

    
    return (
    <View style={{flex: 1, margin: 30}}>
        <Text style={styles.header}>Add User</Text>
        <TextInput mode='outlined' label='Name' value={name} onChangeText={(text) => setName(text)} style={styles.textInput} />
        <TextInput mode='outlined' label='Email' value={email} onChangeText={(text) => setEmail(text)} style={styles.textInput} />
        <TextInput mode='outlined' label='Country' value={country} onChangeText={(text) => setCountry(text)} style={styles.textInput} />
        <Text style={{fontSize: 17, fontWeight: '600'}}>Gender</Text>
        <View style={styles.radioView}>
            <RadioButton.Group onValueChange={value => setGender(value)} value={gender}>
                <View>
                    <Text>Female</Text>
                    <RadioButton  value='female' />
                </View>
                <View>
                    <Text>Male</Text>
                    <RadioButton value='male' />
                </View>
                <View >
                    <Text>Others</Text>
                    <RadioButton value='others' />
                </View>
            </RadioButton.Group>
        </View>
        
        <Button mode='contained-tonal' style={styles.createButton} onPress={() => submitData()}>Create</Button>
        
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 20
    },
    textInput: {
        marginBottom: 10,
    },
    radioView: {
       marginTop: 10,
       marginLeft: 30,
       marginBottom: 10,
    }
})