import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './src/types/navigationTypes';
import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import CadastroScreen from './src/screens/CadastroScreen';
import CepErrorScreen from './src/screens/CepErrorScreen';
import CadastroVeiculoScreen from '@screens/CadastroVeiculoScreen';

const Stack = createStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
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