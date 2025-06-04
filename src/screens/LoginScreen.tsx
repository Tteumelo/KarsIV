import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import AuthInput from '../components/AuthInput';
import AuthButton from '../components/AuthButton';
import { LoginScreenProps } from '../types/navigationTypes';
import { loadUserData } from '../services/storage';

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation, route }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const loadSavedEmail = async () => {
      const savedData = await loadUserData();
      if (savedData?.email) {
        setEmail(savedData.email);
      }
    };
    
    loadSavedEmail();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      let errorMessage = 'Erro ao fazer login';
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'Usuário não encontrado';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Senha incorreta';
      }
      Alert.alert('Erro', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>KarsIV</Text>
      
      <AuthInput 
        icon="email" 
        placeholder="E-mail" 
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      
      <AuthInput 
        icon="lock" 
        placeholder="Senha" 
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <AuthButton 
        title="Criar Conta" 
        onPress={() => navigation.navigate('Cadastro')}
      />
      <AuthButton 
        title={loading ? 'Carregando...' : 'Entrar'} 
        onPress={handleLogin}
        disabled={loading}
      />
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.forgotPassword}>Esqueceu a senha?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#6200ee',
  },
  backButton: {
  marginTop: 20,
  alignItems: 'center',
},
backButtonText: {
  color: '#333',
  fontSize: 16,
  textDecorationLine: 'underline'
},
forgotPassword: {
    color: '#666',
    textAlign: 'right',
    marginBottom: 20,
  }
});

export default LoginScreen;