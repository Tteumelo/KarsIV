import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigationTypes';
import axios from 'axios';

type CarDetailsRouteProp = RouteProp<RootStackParamList, 'CarDetails'>;

type VeiculoInfo = {
  Valor: string;
  Marca: string;
  Modelo: string;
  AnoModelo: number;
  Combustivel: string;
  CodigoFipe: string;
};

const CarDetailsScreen: React.FC = () => {
  const route = useRoute<CarDetailsRouteProp>();
  const navigation = useNavigation();
  const { car } = route.params;

  const [veiculo, setVeiculo] = useState<VeiculoInfo | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const buscarDadosFIPE = async () => {
      try {
        setLoading(true);
        const marcasRes = await axios.get('https://parallelum.com.br/fipe/api/v1/carros/marcas');
        const marca = marcasRes.data.find((m: any) =>
          car.name.toLowerCase().includes(m.nome.toLowerCase())
        );

        if (!marca) return setLoading(false);

        const modelosRes = await axios.get(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${marca.codigo}/modelos`);
        const modelo = modelosRes.data.modelos.find((mod: any) =>
          car.name.toLowerCase().includes(mod.nome.toLowerCase())
        );

        if (!modelo) return setLoading(false);

        const anosRes = await axios.get(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${marca.codigo}/modelos/${modelo.codigo}/anos`);
        const anoMaisRecente = anosRes.data[0];

        const infoRes = await axios.get(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${marca.codigo}/modelos/${modelo.codigo}/anos/${anoMaisRecente.codigo}`);
        setVeiculo(infoRes.data);
      } catch (error) {
        console.error('Erro ao buscar dados da FIPE:', error);
      } finally {
        setLoading(false);
      }
    };

    buscarDadosFIPE();
  }, [car]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={car.image} style={styles.image} resizeMode="cover" />
      <Text style={styles.name}>{car.name}</Text>

      {loading && <ActivityIndicator size="large" color="#6C00FF" style={{ marginVertical: 20 }} />}

      {veiculo ? (
        <View style={styles.detailsBox}>
          <Text style={styles.detail}>Marca: {veiculo.Marca}</Text>
          <Text style={styles.detail}>Modelo: {veiculo.Modelo}</Text>
          <Text style={styles.detail}>Ano: {veiculo.AnoModelo}</Text>
          <Text style={styles.detail}>Combustível: {veiculo.Combustivel}</Text>
          <Text style={styles.detail}>Código FIPE: {veiculo.CodigoFipe}</Text>
          <Text style={styles.detail}>Valor FIPE: {veiculo.Valor}</Text>
        </View>
      ) : !loading && (
        <Text style={styles.description}>Não foi possível encontrar os detalhes do veículo na tabela FIPE.</Text>
      )}

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CarDetailsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 40,
    backgroundColor: '#fff',
    alignItems: 'center'
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
    marginBottom: 10,
    textAlign: 'center'
  },
  description: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center'
  },
  detailsBox: {
    width: '100%',
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    padding: 16,
    marginTop: 10
  },
  detail: {
    fontSize: 16,
    marginBottom: 8
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
