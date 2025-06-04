import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

type Marca = { nome: string; codigo: string };
type Modelo = { nome: string; codigo: string };
type Ano = { nome: string; codigo: string };
type VeiculoInfo = {
  Valor: string;
  Marca: string;
  Modelo: string;
  AnoModelo: number;
  Combustivel: string;
  CodigoFipe: string;
};

export default function CadastroVeiculoScreen() {
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [modelos, setModelos] = useState<Modelo[]>([]);
  const [anos, setAnos] = useState<Ano[]>([]);
  const [veiculo, setVeiculo] = useState<VeiculoInfo | null>(null);

  const [marcaSelecionada, setMarcaSelecionada] = useState('');
  const [modeloSelecionado, setModeloSelecionado] = useState('');
  const [anoSelecionado, setAnoSelecionado] = useState('');

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get('https://parallelum.com.br/fipe/api/v1/carros/marcas')
      .then((res) => setMarcas(res.data));
  }, []);

  useEffect(() => {
    if (marcaSelecionada) {
      setLoading(true);
      axios
        .get(
          `https://parallelum.com.br/fipe/api/v1/carros/marcas/${marcaSelecionada}/modelos`
        )
        .then((res) => {
          setModelos(res.data.modelos);
          setAnos([]);
          setVeiculo(null);
          setLoading(false);
        });
    }
  }, [marcaSelecionada]);

  useEffect(() => {
    if (marcaSelecionada && modeloSelecionado) {
      setLoading(true);
      axios
        .get(
          `https://parallelum.com.br/fipe/api/v1/carros/marcas/${marcaSelecionada}/modelos/${modeloSelecionado}/anos`
        )
        .then((res) => {
          setAnos(res.data);
          setVeiculo(null);
          setLoading(false);
        });
    }
  }, [modeloSelecionado]);

  useEffect(() => {
    if (marcaSelecionada && modeloSelecionado && anoSelecionado) {
      setLoading(true);
      axios
        .get(
          `https://parallelum.com.br/fipe/api/v1/carros/marcas/${marcaSelecionada}/modelos/${modeloSelecionado}/anos/${anoSelecionado}`
        )
        .then((res) => {
          setVeiculo(res.data);
          setLoading(false);
        });
    }
  }, [anoSelecionado]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Cadastro de Veículo</Text>

      <Text style={styles.label}>Marca:</Text>
      <Picker
        selectedValue={marcaSelecionada}
        onValueChange={(value) => setMarcaSelecionada(value)}
      >
        <Picker.Item label="Selecione a marca" value="" />
        {marcas.map((m) => (
          <Picker.Item key={m.codigo} label={m.nome} value={m.codigo} />
        ))}
      </Picker>

      {modelos.length > 0 && (
        <>
          <Text style={styles.label}>Modelo:</Text>
          <Picker
            selectedValue={modeloSelecionado}
            onValueChange={(value) => setModeloSelecionado(value)}
          >
            <Picker.Item label="Selecione o modelo" value="" />
            {modelos.map((m) => (
              <Picker.Item key={m.codigo} label={m.nome} value={m.codigo} />
            ))}
          </Picker>
        </>
      )}

      {anos.length > 0 && (
        <>
          <Text style={styles.label}>Ano:</Text>
          <Picker
            selectedValue={anoSelecionado}
            onValueChange={(value) => setAnoSelecionado(value)}
          >
            <Picker.Item label="Selecione o ano" value="" />
            {anos.map((a) => (
              <Picker.Item key={a.codigo} label={a.nome} value={a.codigo} />
            ))}
          </Picker>
        </>
      )}

      {loading && <ActivityIndicator size="large" color="#000" />}

      {veiculo && (
        <View style={styles.result}>
          <Text style={styles.resultText}>Marca: {veiculo.Marca}</Text>
          <Text style={styles.resultText}>Modelo: {veiculo.Modelo}</Text>
          <Text style={styles.resultText}>Ano: {veiculo.AnoModelo}</Text>
          <Text style={styles.resultText}>Combustível: {veiculo.Combustivel}</Text>
          <Text style={styles.resultText}>Valor FIPE: {veiculo.Valor}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginTop: 10,
  },
  result: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  resultText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

