import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import axios from 'axios';
import { CadastroScreenProps } from '../types/navigationTypes';
import { auth } from '../config/firebase';
import AuthInput from '../components/AuthInput';
import AuthButton from '../components/AuthButton';
import AsyncStorage from '@react-native-async-storage/async-storage';


const STORAGE_KEY = '@KarsIV:userData';

const CadastroScreen: React.FC<CadastroScreenProps> = ({ navigation }) => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    cep: '',
    endereco: ''
  });
  const [loading, setLoading] = useState(false);
  const [cepErrorVisible, setCepErrorVisible] = useState(false);
  const [enderecoCarregado, setEnderecoCarregado] = useState(false);

  // Carrega dados salvos ao iniciar
  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
        if (jsonValue !== null) {
          const savedData = JSON.parse(jsonValue);
          setFormData(prev => ({
            ...prev,
            ...savedData,
            senha: '', // Não carregamos a senha por segurança
            confirmarSenha: ''
          }));
          if (savedData.endereco) {
            setEnderecoCarregado(true);
          }
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };
    loadSavedData();
  }, []);

  // Navega para tela de erro de CEP quando necessário
  useEffect(() => {
    if (cepErrorVisible) {
      navigation.navigate('CepError', {
        onRetry: () => {
          setCepErrorVisible(false);
          setFormData(prev => ({ ...prev, cep: '' }));
        }
      });
    }
  }, [cepErrorVisible, navigation]);

  // Salva dados no AsyncStorage sempre que houver mudanças
  useEffect(() => {
    const saveData = async () => {
      try {
        const dataToSave = {
          nome: formData.nome,
          email: formData.email,
          cep: formData.cep,
          endereco: formData.endereco
        };
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
      } catch (error) {
        console.error('Erro ao salvar dados:', error);
      }
    };

    if (formData.nome || formData.email || formData.cep || formData.endereco) {
      saveData();
    }
  }, [formData]);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const buscarEndereco = async () => {
    if (!formData.cep) {
      Alert.alert('Erro', 'Por favor, informe o CEP');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${formData.cep}/json/`);
      if (response.data.erro) {
        setCepErrorVisible(true);
      } else {
        const enderecoCompleto = `${response.data.logradouro}, ${response.data.bairro}, ${response.data.localidade} - ${response.data.uf}`;
        handleChange('endereco', enderecoCompleto);
        setEnderecoCarregado(true);
      }
    } catch (error) {
      setCepErrorVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCadastro = async () => {
    if (!formData.nome || !formData.email || !formData.senha || !formData.confirmarSenha || !formData.cep || !formData.endereco) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    if (formData.senha !== formData.confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }

    if (formData.senha.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres');
      return;
    }

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, formData.email, formData.senha);
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      navigation.navigate('Login');
    } catch (error: any) {
      let errorMessage = 'Erro ao cadastrar';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'E-mail já está em uso';
      }
      Alert.alert('Erro', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView 
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Criar Conta</Text>

      <AuthInput
        icon="account"
        placeholder="Nome completo"
        value={formData.nome}
        onChangeText={(text) => handleChange('nome', text)}
      />

      <AuthInput
        icon="email"
        placeholder="E-mail"
        value={formData.email}
        onChangeText={(text) => handleChange('email', text)}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <AuthInput
        icon="lock"
        placeholder="Senha (mínimo 6 caracteres)"
        value={formData.senha}
        onChangeText={(text) => handleChange('senha', text)}
        secureTextEntry
      />

      <AuthInput
        icon="lock"
        placeholder="Confirmar senha"
        value={formData.confirmarSenha}
        onChangeText={(text) => handleChange('confirmarSenha', text)}
        secureTextEntry
      />

      <View style={styles.inputContainer}>
        <AuthInput
          icon="map-marker"
          placeholder="CEP"
          value={formData.cep}
          onChangeText={(text) => handleChange('cep', text)}
          keyboardType="numeric"
          style={{ flex: 1 }}
        />
        <TouchableOpacity
          style={styles.salvarButton}
          onPress={buscarEndereco}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.salvarButtonText}>Buscar</Text>
          )}
        </TouchableOpacity>
      </View>

      {enderecoCarregado && (
        <View style={styles.enderecoContainer}>
          <View style={styles.enderecoHeader}>
            <Text style={styles.enderecoLabel}>Endereço encontrado:</Text>
          </View>
          <Text style={styles.endereco}>{formData.endereco}</Text>
        </View>
      )}

      <AuthButton
        title={loading ? 'Carregando...' : 'Cadastrar'}
        onPress={handleCadastro}
        disabled={loading}
      />

      <AuthButton
        title="Voltar"
        onPress={() => navigation.goBack()}
        style={styles.voltarButton}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#6200ee',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  enderecoContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  enderecoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  enderecoLabel: {
    fontWeight: 'bold',
    color: '#333',
    fontSize: 16,
  },
  endereco: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  salvarButton: {
    backgroundColor: '#6200ee',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginLeft: 10,
    minWidth: 80,
  },
  salvarButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  voltarButton: {
    backgroundColor: '#ccc',
    marginTop: 10,
  },
});

export default CadastroScreen;