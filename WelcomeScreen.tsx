import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import AuthButton from 'src/components/AuthButton'; 
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'src/types/navigationTypes'; 

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <Image source={require('assets/logo.png')} style={styles.logo} />  
      <Text style={styles.title}>Bem-vindo ao KarsIV</Text>
      <AuthButton title="Entrar" onPress={() => navigation.navigate('Login')} />
      <AuthButton title="Cadastrar" onPress={() => navigation.navigate('Cadastro')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20
  },
  title: {
    fontSize: 24,
    marginBottom: 40
  }
});

export default WelcomeScreen;
