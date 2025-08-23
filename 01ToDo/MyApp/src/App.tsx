import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import Details from './screens/Details';
import EditTodo from './screens/EditTodo';
import AddTodo from './screens/AddTodo';
const Stack = createNativeStackNavigator();
const App = () => {



  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen name="Home" component={HomeScreen} options={{title:"ToDo App"}}/>
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="AddTodo" component={AddTodo} />
      <Stack.Screen name="EditTodo" component={EditTodo} />
    </Stack.Navigator>
    </NavigationContainer>
  )
}



export default App