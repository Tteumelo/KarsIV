import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigationTypes'; // ajuste o caminho se necessário

type Veiculo = {
  id: string;
  nome: string;
  preco: string;
  km: string;
  cambio: string;
  cor: string;
  ano: number;
  descricao: string;
  imagem: string;
};

type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'Welcome'>;

const vehicles: Veiculo[] = [
  {
    id: '1',
    nome: 'VW Gol',
    preco: 'R$ 36.423',
    km: '23.345km',
    cambio: 'Manual',
    cor: 'Prata Escuro',
    ano: 2015,
    descricao: 'Gol semi-novo, único dono, flex 4 portas completo',
    imagem: 'https://via.placeholder.com/150',
  },
];

const WelcomeScreen = () => {
  const navigation = useNavigation<NavigationProps>();

  const renderItem = ({ item }: { item: Veiculo }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.imagem }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.nome}>{item.nome}</Text>
        <Text style={styles.preco}>{item.preco}</Text>
        <Text style={styles.detalhes}>
          {item.km} | {item.cambio} | {item.cor} | {item.ano}
        </Text>
        <Text style={styles.descricao}>{item.descricao}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.loginIcon}
        onPress={() => navigation.navigate('Login')}
      >
        <Icon name="person" size={30} color="#000" />
      </TouchableOpacity>

      <FlatList
        data={vehicles}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />

      <TouchableOpacity
        style={styles.cadastrarButton}
        onPress={() => navigation.navigate('CadastroVeiculo')}
      >
        <Text style={styles.cadastrarText}>Cadastrar Veículo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  loginIcon: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  list: {
    paddingTop: 80,
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  image: {
    width: '100%',
    height: 150,
  },
  infoContainer: {
    padding: 10,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  preco: {
    fontSize: 16,
    color: '#4caf50',
    marginVertical: 5,
  },
  detalhes: {
    fontSize: 14,
    color: '#757575',
  },
  descricao: {
    fontSize: 14,
    color: '#424242',
    marginTop: 5,
  },
  cadastrarButton: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: '#2196f3',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  cadastrarText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
