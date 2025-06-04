import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigationTypes'; 
import { useNavigation } from '@react-navigation/native';

type CadastroScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Cadastro'>;

const CadastroScreen: React.FC = () => {
  const navigation = useNavigation<CadastroScreenNavigationProp>();

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    cep: '',
    endereco: ''
  });

  const handleCadastro = () => {
    if (
      !formData.nome ||
      !formData.email ||
      !formData.senha ||
      !formData.confirmarSenha
    ) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
      return;
    }

    if (formData.senha !== formData.confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    // Aqui você integraria com backend ou Firebase
    Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
  };

  const handleLimparCampos = () => {
    setFormData({
      nome: '',
      email: '',
      senha: '',
      confirmarSenha: '',
      cep: '',
      endereco: ''
    });
  };

  const buscarEnderecoPorCEP = async (cep: string) => {
    if (cep.length !== 8) return;

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        Alert.alert('CEP inválido', 'Não encontramos esse CEP.');
        return;
      }

      const enderecoFormatado = `${data.logradouro}, ${data.bairro} - ${data.localidade}/${data.uf}`;

      setFormData((prev) => ({
        ...prev,
        endereco: enderecoFormatado
      }));
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível buscar o endereço.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>

      <TextInput
        placeholder="Nome"
        style={styles.input}
        value={formData.nome}
        onChangeText={(text) => setFormData({ ...formData, nome: text })}
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        keyboardType="email-address"
        value={formData.email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
      />
      <TextInput
        placeholder="Senha"
        style={styles.input}
        secureTextEntry
        value={formData.senha}
        onChangeText={(text) => setFormData({ ...formData, senha: text })}
      />
      <TextInput
        placeholder="Confirmar Senha"
        style={styles.input}
        secureTextEntry
        value={formData.confirmarSenha}
        onChangeText={(text) => setFormData({ ...formData, confirmarSenha: text })}
      />
      <TextInput
        placeholder="CEP"
        style={styles.input}
        keyboardType="numeric"
        value={formData.cep}
        onChangeText={(text) => {
          const cleanedCep = text.replace(/\D/g, '');
          setFormData({ ...formData, cep: cleanedCep });

          if (cleanedCep.length === 8) {
            buscarEnderecoPorCEP(cleanedCep);
          }
        }}
      />
      <TextInput
        placeholder="Endereço"
        style={styles.input}
        value={formData.endereco}
        editable={false}
      />

      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.clearButton} onPress={handleLimparCampos}>
        <Text style={styles.clearButtonText}>Limpar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>

    </ScrollView>
  );
};

export default CadastroScreen;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingTop: 60,
    backgroundColor: '#fff',
    flexGrow: 1
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 30,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 14
  },
  button: {
    backgroundColor: '#6C00FF',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10
  },
  buttonText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 16
  },
  clearButton: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    marginTop: 5,
    paddingVertical: 10,
    alignItems: 'center'
  },
  clearButtonText: {
    color: '#6C00FF',
    fontWeight: 'bold',
    fontSize: 16
  },
  backButton: {
  marginTop: 20,
  alignItems: 'center',
},

backButtonText: {
  color: '#333',
  fontSize: 16,
  textDecorationLine: 'underline'
}

});
