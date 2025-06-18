import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigationTypes';

type CarDetailsRouteProp = RouteProp<RootStackParamList, 'CarDetails'>;

const CarDetailsScreen: React.FC = () => {
  const route = useRoute<CarDetailsRouteProp>();
  const navigation = useNavigation();
  const { car } = route.params;

  return (
    <View style={styles.container}>
      <Image source={car.image} style={styles.image} resizeMode="cover" />
      <Text style={styles.name}>{car.name}</Text>

      {/* Aqui você pode adicionar mais detalhes futuramente */}
      <Text style={styles.description}>Este é um carro de luxo esportivo de alta performance.</Text>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CarDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 40,
    backgroundColor: '#fff'
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    marginBottom: 20
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  },
  description: {
    fontSize: 16,
    color: '#555'
  },
  backButton: {
    marginTop: 30,
    alignItems: 'center'
  },
  backButtonText: {
    color: '#6C00FF',
    fontSize: 16,
    fontWeight: 'bold'
  }
});
