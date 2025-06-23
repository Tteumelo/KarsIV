# KarsIV

**KarsIV** é um aplicativo mobile desenvolvido em **React Native com TypeScript** para compra e venda de veículos. Ele permite aos usuários realizar autenticação, cadastrar e visualizar veículos, além de integrar com serviços de consulta de preços e localização.

## Instruções de Instalação e Execução

1. Clone o repositório:

```bash
git clone https://github.com/Tteumelo/KarsIV
cd KarsIV
```

2. Instale as dependências:

```bash
npm install
# ou
yarn install
```

3. Execute o aplicativo:

```bash
npx expo start
```

> É necessário ter o [Node.js](https://nodejs.org/), o [Expo CLI](https://docs.expo.dev/workflow/expo-cli/) e um emulador Android ou o aplicativo Expo Go.

## Funcionalidades Implementadas

- Tela de login com autenticação via Firebase
- Tela de cadastro de usuário
- Tela de recuperação de senha
- Tela de cadastro de veículos com dados e imagens
- Listagem de veículos na tela inicial
- Detalhamento de veículo ao clicar no item
- Integração com a API ViaCEP para busca de endereço por CEP
- Integração com a API FIPE para consulta de preços de veículos
- Interface baseada no estilo do WebMotors

## Dependências e Bibliotecas Utilizadas

- React Native
- TypeScript
- Expo
- React Navigation
- Firebase Authentication
- Axios
- React Native Vector Icons
- API ViaCEP
- API FIPE

## Arquitetura da Aplicação e Organização do Código

A arquitetura é baseada em organização por funcionalidades. O código está dividido em:

```
src/
├── assets/              # Imagens e recursos estáticos
├── components/          # Componentes reutilizáveis
├── screens/             # Telas principais (Login, Cadastro, Home, etc.)
├── services/            # Serviços como Firebase, APIs externas
├── types/               # Tipagens globais e interfaces
├── navigation/          # Configuração das rotas
└── utils/               # Funções auxiliares
```

O arquivo `App.tsx` é o ponto de entrada da aplicação. As rotas são configuradas usando `React Navigation`.

## Manual de Uso Básico

1. **Login:** Informe seu e-mail e senha para acessar a aplicação.
2. **Cadastro:** Acesse a opção de cadastro e preencha os dados do usuário.
3. **Cadastro de Veículo:** Registre veículos com nome, descrição, valor, CEP, e imagem.
4. **Listagem:** A tela inicial mostra os veículos cadastrados com opção de visualização detalhada.
5. **Detalhes:** Clique em um veículo para visualizar informações detalhadas, incluindo o valor da Tabela FIPE.
6. **API de CEP:** O endereço é preenchido automaticamente ao digitar o CEP no formulário.
7. **Recuperar senha:** Permite redefinir a senha via Firebase.

## Observações

- O projeto está em fase de desenvolvimento. Novas funcionalidades e ajustes podem ser incluídos.
- As APIs utilizadas são públicas e gratuitas.
- O projeto utiliza o Expo SDK para facilitar testes em dispositivos físicos.