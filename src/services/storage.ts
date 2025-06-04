import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@KarsIV:userData';

interface UserData {
  nome?: string;
  email?: string;
  cep?: string;
  endereco?: string;
}

export const saveUserData = async (data: UserData): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
  } catch (e) {
    console.error('Erro ao salvar dados:', e);
    throw e;
  }
};

export const loadUserData = async (): Promise<UserData | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Erro ao carregar dados:', e);
    return null;
  }
};

export const clearUserData = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Erro ao limpar dados:', e);
    throw e;
  }
};