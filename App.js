import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/Home';
import Details from './components/Details';

export default function App() {

  const Stack = createNativeStackNavigator() //Forgot this, maybe I shall remember this forever from now on. or not..
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
        name='Home'
        component={Home}
        options={{
          title: 'Home',
          headerTitle: 'Home'
        }}
        />
        <Stack.Screen
        name='Todo'
        component={Details}
        options={{
          title: 'Todo',
          headerTitle: 'Todo'
        }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


