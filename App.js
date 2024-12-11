import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Login from './screens/Login';
import Home from './screens/Home';
export default function App() {
  const Stack = createStackNavigator();
  return (
    <SafeAreaProvider >
    <NavigationContainer>
      <StatusBar hidden/>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login}  options={{ headerShown: false }}  />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  </NavigationContainer>
  </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});
