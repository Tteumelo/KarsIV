import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert
} from 'react-native';
import axios from 'axios';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  CadastroVeiculo: undefined;
};

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'CadastroVeiculo'>;
};

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

export default function CadastroVeiculoScreen({ navigation }: Props) {
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [modelos, setModelos] = useState<Modelo[]>([]);
  const [anos, setAnos] = useState<Ano[]>([]);
  const [veiculo, setVeiculo] = useState<VeiculoInfo | null>(null);

  const [marcaInput, setMarcaInput] = useState('');
  const [modeloInput, setModeloInput] = useState('');
  const [anoInput, setAnoInput] = useState('');

  const [marcaSelecionada, setMarcaSelecionada] = useState('');
  const [modeloSelecionado, setModeloSelecionado] = useState('');
  const [anoSelecionado, setAnoSelecionado] = useState('');

  const [sugestoesMarca, setSugestoesMarca] = useState<Marca[]>([]);
  const [sugestoesModelo, setSugestoesModelo] = useState<Modelo[]>([]);
  const [sugestoesAno, setSugestoesAno] = useState<Ano[]>([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get('https://parallelum.com.br/fipe/api/v1/carros/marcas')
      .then(res => setMarcas(res.data));
  }, []);

  useEffect(() => {
    if (marcaSelecionada) {
      setLoading(true);
      axios
        .get(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${marcaSelecionada}/modelos`)
        .then((res) => {
          const lista = res.data.modelos.sort((a: Modelo, b: Modelo) => a.nome.localeCompare(b.nome));
          setModelos(lista);
          setSugestoesModelo([]);
          setModeloInput('');
          setModeloSelecionado('');
          setAnos([]);
          setAnoSelecionado('');
          setVeiculo(null);
          setLoading(false);
        });
    }
  }, [marcaSelecionada]);

  useEffect(() => {
    if (modeloSelecionado) {
      setLoading(true);
      axios
        .get(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${marcaSelecionada}/modelos/${modeloSelecionado}/anos`)
        .then((res) => {
          setAnos(res.data);
          setSugestoesAno([]);
          setAnoInput('');
          setAnoSelecionado('');
          setVeiculo(null);
          setLoading(false);
        });
    }
  }, [modeloSelecionado]);

  useEffect(() => {
    if (anoSelecionado) {
      setLoading(true);
      axios
        .get(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${marcaSelecionada}/modelos/${modeloSelecionado}/anos/${anoSelecionado}`)
        .then((res) => {
          setVeiculo(res.data);
          setLoading(false);
        });
    }
  }, [anoSelecionado]);

  const handleCadastro = () => {
    if (!marcaSelecionada || !modeloSelecionado || !anoSelecionado || !veiculo) {
      Alert.alert("Erro", "Por favor, selecione marca, modelo e ano corretamente.");
      return;
    }

    Alert.alert("Sucesso", `Veículo ${veiculo.Modelo} cadastrado com sucesso!`);
    console.log("Veículo cadastrado:", veiculo);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>← Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Cadastro de Veículo</Text>

      <Text style={styles.label}>Marca:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a marca"
        value={marcaInput}
        onChangeText={(text) => {
          setMarcaInput(text);
          setSugestoesMarca(marcas.filter(m => m.nome.toLowerCase().includes(text.toLowerCase())));
        }}
      />
      {sugestoesMarca.length > 0 && !marcaSelecionada && (
        <FlatList
          data={sugestoesMarca}
          keyExtractor={(item) => item.codigo}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.suggestionItem}
              onPress={() => {
                setMarcaInput(item.nome);
                setMarcaSelecionada(item.codigo);
                setSugestoesMarca([]);
              }}
            >
              <Text>{item.nome}</Text>
            </TouchableOpacity>
          )}
          style={styles.suggestionList}
        />
      )}

      {marcaSelecionada && (
        <>
          <Text style={styles.label}>Modelo:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o modelo"
            value={modeloInput}
            onChangeText={(text) => {
              setModeloInput(text);
              setSugestoesModelo(modelos.filter(m => m.nome.toLowerCase().includes(text.toLowerCase())));
            }}
          />
          {sugestoesModelo.length > 0 && !modeloSelecionado && (
            <FlatList
              data={sugestoesModelo}
              keyExtractor={(item) => item.codigo}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.suggestionItem}
                  onPress={() => {
                    setModeloInput(item.nome);
                    setModeloSelecionado(item.codigo);
                    setSugestoesModelo([]);
                  }}
                >
                  <Text>{item.nome}</Text>
                </TouchableOpacity>
              )}
              style={styles.suggestionList}
            />
          )}
        </>
      )}

      {modeloSelecionado && (
        <>
          <Text style={styles.label}>Ano:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o ano"
            value={anoInput}
            onChangeText={(text) => {
              setAnoInput(text);
              setSugestoesAno(anos.filter(a => a.nome.toLowerCase().includes(text.toLowerCase())));
            }}
          />
          {sugestoesAno.length > 0 && !anoSelecionado && (
            <FlatList
              data={sugestoesAno}
              keyExtractor={(item) => item.codigo}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.suggestionItem}
                  onPress={() => {
                    setAnoInput(item.nome);
                    setAnoSelecionado(item.codigo);
                    setSugestoesAno([]);
                  }}
                >
                  <Text>{item.nome}</Text>
                </TouchableOpacity>
              )}
              style={styles.suggestionList}
            />
          )}
        </>
      )}

      {loading && <ActivityIndicator size="large" color="#6C00FF" style={{ marginTop: 20 }} />}

      {veiculo && (
        <View style={styles.result}>
          <Text style={styles.resultTitle}>Informações do Veículo:</Text>
          <Text style={styles.resultText}>Marca: {veiculo.Marca}</Text>
          <Text style={styles.resultText}>Modelo: {veiculo.Modelo}</Text>
          <Text style={styles.resultText}>Ano: {veiculo.AnoModelo}</Text>
          <Text style={styles.resultText}>Combustível: {veiculo.Combustivel}</Text>
          <Text style={styles.resultText}>Valor FIPE: {veiculo.Valor}</Text>
        </View>
      )}

      {veiculo && (
        <TouchableOpacity style={styles.cadastrarBtn} onPress={handleCadastro}>
          <Text style={styles.cadastrarText}>Cadastrar Veículo</Text>
        </TouchableOpacity>
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
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 10,
    marginBottom: 5,
  },
  suggestionList: {
    maxHeight: 150,
    borderWidth: 1,
    borderColor: '#EEE',
    borderRadius: 8,
    marginBottom: 10,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#EEE',
    backgroundColor: '#F9F9F9',
  },
  result: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  resultText: {
    fontSize: 16,
    marginBottom: 5,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 10,
    padding: 5,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  cadastrarBtn: {
    marginTop: 20,
    backgroundColor: '#6C00FF',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center'
  },
  cadastrarText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold'
  }
});
