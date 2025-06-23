import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './src/types/navigationTypes';
import LoginScreen from './src/screens/LoginScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import CadastroScreen from './src/screens/CadastroScreen';
import CepErrorScreen from './src/screens/CepErrorScreen';
import CadastroVeiculoScreen from '@screens/CadastroVeiculoScreen';
import HomeScreen from './src/screens/HomeScreen';
import CarDetailsScreen from './src/screens/CarDetailsScreen';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'src/config/firebase';

const Stack = createStackNavigator<RootStackParamList>();

function App() {
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, () => {
      setAuthReady(true);
    });

    return unsubscribe;
  }, []);

  if (!authReady) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CarDetails" component={CarDetailsScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="CepError" component={CepErrorScreen} />
        <Stack.Screen name="CadastroVeiculo" component={CadastroVeiculoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
