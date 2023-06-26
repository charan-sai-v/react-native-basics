import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator  }  from '@react-navigation/stack'
import UpdateUser from './screens/UpdateUser';
import Home from './screens/Home';
import AddUser from './screens/AddUser';


const Stack = createStackNavigator()

export default function App() {
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='AddUser' component={AddUser} />
        <Stack.Screen name='UpdateUser' component={UpdateUser} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}