import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Cadastro: undefined;
  ForgotPassword: undefined;
  CadastroVeiculo: undefined;
  CepError: { onRetry: () => void };
};

export type LoginScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Login'>;
  route: RouteProp<RootStackParamList, 'Login'>;
};

export type CadastroScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Cadastro'>;
  route: RouteProp<RootStackParamList, 'Cadastro'>;
};

export type ForgotPasswordScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'ForgotPassword'>;
  route: RouteProp<RootStackParamList, 'ForgotPassword'>;
};

export type CepErrorScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'CepError'>;
  route: RouteProp<RootStackParamList, 'CepError'>;
};