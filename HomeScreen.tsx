import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MotiView } from 'moti';
import { Car, cars } from '../data/cars';
import { RootStackParamList } from '../types/navigationTypes';
import { StackNavigationProp } from '@react-navigation/stack';

type NavProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();

  const renderCar = ({ item, index }: { item: Car; index: number }) => (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ delay: 300 + index * 100 }}
      style={styles.card}
    >
      <Image source={item.image} style={styles.carImage} />
      <View style={styles.cardContent}>
        <Text style={styles.carName}>{item.name}</Text>
        <TouchableOpacity style={styles.detailBtn} onPress={() => navigation.navigate('CarDetails', { car: item })}>
          <Text style={styles.detailBtnText}>Detalhes</Text>
        </TouchableOpacity>
      </View>
    </MotiView>
  );

  return (
    <ScrollView style={styles.container}>
      <MotiView from={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ delay: 100 }}>
        <Image source={require('assets/banner.png')} style={styles.banner} />
      </MotiView>

      <View style={styles.quickActions}>
        {[
          { label: 'Comprar', screen: 'Home' },
          { label: 'Vender', screen: 'Usuario' },
          { label: 'Financiar', screen: 'Cadastro' }
        ].map((a, i) => (
          <MotiView key={i} from={{ opacity: 0, translateY: 20 }} animate={{ opacity: 1, translateY: 0 }} transition={{ delay: 200 + i * 100 }}>
            <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate(a.screen as any)}>
              <Text style={styles.actionText}>{a.label}</Text>
            </TouchableOpacity>
          </MotiView>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Carros</Text>
      <FlatList
        data={cars}
        keyExtractor={(item) => item.id}
        renderItem={renderCar}
        contentContainerStyle={styles.list}
        scrollEnabled={false}
      />
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  banner: { width: '100%', height: 180, marginBottom: 16, borderRadius: 12 },
  quickActions: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16 },
  actionCard: { backgroundColor: '#EDEDED', padding: 12, borderRadius: 8 },
  actionText: { fontWeight: '600', color: '#333' },
  sectionTitle: { fontSize: 20, fontWeight: '600', margin: 16 },
  list: { paddingHorizontal: 16, paddingBottom: 20 },
  card: { backgroundColor: '#FFF', borderRadius: 12, marginBottom: 16, elevation: 3, overflow: 'hidden' },
  carImage: { width: '100%', height: 140, resizeMode: 'cover' },
  cardContent: { padding: 12 },
  carName: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  detailBtn: { backgroundColor: '#6C00FF', paddingVertical: 8, borderRadius: 8, alignItems: 'center' },
  detailBtnText: { color: '#FFF', fontWeight: '600' }
});
