import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../config/firebase';
import AuthInput from '../components/AuthInput';
import AuthButton from '../components/AuthButton';
import { ForgotPasswordScreenProps } from '../types/navigationTypes';
import { loadUserData } from '../services/storage';

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({ navigation, route }) => {
  const [email, setEmail] = useState('');
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

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert('Erro', 'Por favor, informe seu e-mail');
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert(
        'E-mail enviado',
        'Um link para redefinição de senha foi enviado para o seu e-mail',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error: any) {
      let errorMessage = 'Erro ao enviar e-mail de redefinição';
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'E-mail não cadastrado';
      }
      Alert.alert('Erro', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Redefinir Senha</Text>
      <Text style={styles.subtitle}>
        Informe o e-mail associado à sua conta para redefinição de senha.
      </Text>
      
      <AuthInput 
        icon="email" 
        placeholder="E-mail" 
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      
      <AuthButton 
        title={loading ? 'Enviando...' : 'Enviar'} 
        onPress={handleResetPassword}
        disabled={loading}
      />
      
      <AuthButton 
        title="Voltar" 
        onPress={() => navigation.goBack()}
        style={{ backgroundColor: '#ccc' }}
      />
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
    marginBottom: 10,
    textAlign: 'center',
    color: '#6200ee',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
});

export default ForgotPasswordScreen;