
import { View, Text, StyleSheet,  TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, DataTable, IconButton, List, Searchbar, Snackbar } from 'react-native-paper'
import { useIsFocused } from '@react-navigation/native'



const SearchLsit = ({navigation}) => {
  const [query, setQuery]  = useState('')
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])

  const getData = async () => {
    const response = await fetch('http://localhost:8080/api/users')
    const data = await response.json()
    setUsers(data)
    setFilteredUsers(data)
    
  }

  useEffect(() => {
    getData()
  }, [useIsFocused()])

  const onChangeSearch = query => {
    setQuery(query)
    setFilteredUsers(users.filter(user => user.name.toLowerCase().includes(query.toLowerCase())))
  }

  const deleteUser = async (id) => {
    const data = await fetch(`http://localhost:8080/api/users/${id}`, {
                    method: 'DELETE'
                  })
    const body = await data.json()
    console.log(body)
    getData()
  }
                    

 

  return (
    <View style={styles.container}>
      <Searchbar placeholder="Search" onChangeText={onChangeSearch} value={query} />
       { filteredUsers.map(user => (
        <List.Item
          onPress={()=>console.log('pressed')}
          key={user._id}
          title={user.name}
          description={user.email}
          left={props => <List.Icon {...props} icon="account"  />}
          right={props => 
            <View {...props} style={{flexDirection: 'row'}} onPress={() => console.log('pressed')}>
              <IconButton {...props} icon="pencil" onPress={()=> navigation.navigate('UpdateUser', {
                user : user
              })} />
              <IconButton {...props} icon="delete" onPress={() => deleteUser(user._id)} />
            </View>
          } /> )) }
    </View>
  )
}


export default function Home({navigation, route}) {
    return (
    <View style={styles.container}>
      <Text style={styles.header}>User List</Text>
      <Button mode='contained-tonal' style={styles.createButton} onPress={() => navigation.navigate('AddUser')}>Create</Button>
      <SearchLsit navigation={navigation} />
      {
        route.params?.success && <Snackbar  visible={true} onDismiss={() => navigation.setParams({success: false})} duration={3000} > User Updated Successfully </Snackbar>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  header: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  createButton: {
    marginTop: 20,
    // keep right side of button at the right side of screen
    alignSelf: 'flex-end',
    marginRight: 20,
  },
    
})


