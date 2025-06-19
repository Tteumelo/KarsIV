# KarsIV - App de Compra e Venda de Veículos

Aplicativo mobile desenvolvido em React Native com TypeScript, voltado para compra, venda e consulta de veículos, inspirado no estilo do app da Webmotors.

## Tecnologias Utilizadas

- React Native
- TypeScript
- React Navigation
- Firebase (Auth e Firestore)
- API ViaCEP
- API FIPE
- Moti (animações)

## Funcionalidades

- Tela inicial com:
  - Banner animado
  - Acesso rápido para comprar, vender e financiar
  - Lista de veículos com imagem, nome e botão de detalhes
- Tela de login
- Tela de cadastro com integração ao ViaCEP
- Tela de detalhes do carro
- Botão limpar formulário
- Animações suaves com Framer Motion (Moti)
- Estrutura pronta para integração com Firebase e Firestore

## Telas

- `HomeScreen.tsx`: tela inicial com banner, menu e lista de veículos
- `LoginScreen.tsx`: autenticação do usuário
- `CadastroScreen.tsx`: registro com auto-preenchimento via CEP
- `CarDetailsScreen.tsx`: detalhes de cada carro clicado
- `UsuarioScreen.tsx`: perfil do usuário (em desenvolvimento)

## Estrutura de Pastas

```
src/
├── assets/         # Imagens
├── data/           # Dados mockados (ex: carros.ts)
├── screens/        # Telas da aplicação
├── types/          # Tipos de navegação
```

## Como rodar o projeto

1. Clone o repositório:
```bash
git clone https://github.com/Tteumelo/KarsIV.git
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o app:
```bash
npx expo start
```

Caso use imagens locais e Moti, instale as dependências:
```bash
npm install moti react-native-reanimated
```

## Status

- Funcionalidades principais implementadas
- Integração com Firebase e Firestore em progresso
- Filtros por marca, tipo e valor planejados
- Melhorias de UI/UX em andamento

## Contato

Desenvolvido por Matheus Melo e Gabriel Tolentino  
Email: matheusmelo@gmail.com  
GitHub: https://github.com/Tteumelo