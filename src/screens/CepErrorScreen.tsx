import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CepErrorScreenProps } from '../types/navigationTypes';

const CepErrorScreen: React.FC<CepErrorScreenProps> = ({ navigation, route }) => {
  const { onRetry } = route.params;

  return (
    <View style={styles.container}>
      <Icon name="alert-circle" size={80} color="#FF3B30" style={styles.icon} />
      <Text style={styles.title}>CEP Inválido</Text>
      <Text style={styles.message}>
        O CEP digitado não foi encontrado ou está incorreto.
        Por favor, verifique e tente novamente.
      </Text>
      
      <TouchableOpacity style={styles.button} onPress={onRetry}>
        <Text style={styles.buttonText}>Tentar Novamente</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.goBack()}>
        <Text style={styles.secondaryButtonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF3B30',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  secondaryButton: {
    padding: 15,
    width: '100%',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#6200ee',
    fontSize: 16,
  },
});

export default CepErrorScreen;