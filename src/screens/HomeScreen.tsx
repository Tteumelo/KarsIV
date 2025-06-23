import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MotiView } from 'moti';
import { Car, cars } from '../data/cars';
import { RootStackParamList } from '../types/navigationTypes';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type NavProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();

  const renderCarGrid = ({ item, index }: { item: Car; index: number }) => (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ delay: 300 + index * 100 }}
      style={styles.gridItem}
    >
      <TouchableOpacity
        style={styles.carBox}
        onPress={() => navigation.navigate('CarDetails', { car: item })}
      >
        <Image source={item.image} style={styles.gridImage} />
        <Text style={styles.gridTitle}>{item.name}</Text>
        <Text style={styles.gridPrice}>Ver detalhes</Text>
      </TouchableOpacity>
    </MotiView>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Icon name="car-sports" size={28} color="#FFF" style={styles.headerIcon} />
        <Text style={styles.headerTitle}>KarsIV</Text>
        <Image source={require('assets/user.png')} style={styles.profileImage} />
      </View>

      <TextInput
        placeholder="Buscar carros..."
        style={styles.searchInput}
        placeholderTextColor="#888"
      />

      <View style={styles.quickActions}>
        {[
          { label: 'Cadastro', screen: 'Cadastro', icon: 'account-plus' },
          { label: 'Login', screen: 'Login', icon: 'login' },
          { label: 'Veículo', screen: 'CadastroVeiculo', icon: 'car' }
        ].map((a, i) => (
          <MotiView
            key={i}
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: 200 + i * 100 }}
          >
            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => navigation.navigate(a.screen as any)}
            >
              <Icon name={a.icon} size={24} color="#6C00FF" />
              <Text style={styles.actionText}>{a.label}</Text>
            </TouchableOpacity>
          </MotiView>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Carros disponíveis</Text>

      <FlatList
        data={cars}
        keyExtractor={(item) => item.id}
        renderItem={renderCarGrid}
        numColumns={2}
        contentContainerStyle={styles.gridList}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        scrollEnabled={false}
      />
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#6C00FF',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  headerIcon: {
    marginRight: 10
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#FFF'
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginHorizontal: 16,
    marginVertical: 8
  },
  searchInput: {
    backgroundColor: '#F0F0F0',
    marginHorizontal: 16,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    marginBottom: 16
  },
  actionCard: {
    backgroundColor: '#EEE',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    width: 90
  },
  actionText: {
    marginTop: 6,
    fontWeight: '600',
    color: '#333',
    fontSize: 12,
    textAlign: 'center'
  },
  gridList: {
    paddingHorizontal: 16,
    paddingBottom: 20
  },
  gridItem: {
    width: '48%',
    marginBottom: 16
  },
  carBox: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#DDD'
  },
  gridImage: {
    width: '100%',
    height: 100,
    resizeMode: 'cover'
  },
  gridTitle: {
    fontSize: 14,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingTop: 8
  },
  gridPrice: {
    fontSize: 12,
    color: '#6C00FF',
    fontWeight: '500',
    paddingHorizontal: 8,
    paddingBottom: 8
  }
});