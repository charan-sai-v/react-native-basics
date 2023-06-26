
import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Button, TextInput } from 'react-native-paper'

export default function UpdateUser({navigation, route}) {
  const user = route.params.user
  const [email, setEmail] = React.useState(user.email)
  const [country, setCountry] = React.useState(user.country)



  const submitData = async () => {
    const data = await fetch(`http://localhost:8080/api/users/${user._id}`, {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({email: email, country: country})
                  })
    const response = await data.json()
    console.log(response)
    navigation.navigate('Home', {success: true})
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Update User {user.name}</Text>
      <View style={styles.container}>
        <TextInput mode='outlined' label='Email' value={email} onChangeText={(text) => setEmail(text)} />
        <TextInput mode='outlined' label='Country' value={country} onChangeText={(text) => setCountry(text)} />
        <Button mode='contained-tonal' style={styles.createButton} onPress={() => submitData()}>Update</Button>
      </View>
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    gap: 30
  },
  header: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  createButton: {
    marginTop: 20
  }
})