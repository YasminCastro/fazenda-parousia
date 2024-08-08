# Projeto Next.js - Guia de Execução

Este documento fornece um guia passo a passo para configurar e rodar um projeto Next.js. Ele abrange a instalação das dependências necessárias, configuração do banco de dados, criação de variáveis de ambiente e execução do servidor de desenvolvimento.

## Pré-requisitos

1. **Node.js**: Certifique-se de que o [Node.js](https://nodejs.org/) esteja instalado em sua máquina.

2. **Backend**: Certifique-se de que sua instância do backend esteja rodando e acessível.

## Passos para Configuração

### 1. Clonar o Repositório

Clone o repositório do projeto Next.js para o seu ambiente local:

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

### 2. Instalar Dependências

Instale as dependências do projeto usando o npm (ou yarn, se preferir):

```bash
npm install
```

### 3. Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto e adicione a variável de ambiente `API_URL` com a URL da sua API. Por exemplo:

```env
API_URL=http://127.0.0.1:9000
```

### 4. Executar o Servidor de Desenvolvimento

Com todas as dependências instaladas e a configuração do ambiente realizada, você pode iniciar o servidor de desenvolvimento:

```bash
npm run dev
```

### 5. Acessar a Aplicação

Abra seu navegador e acesse `http://localhost:3000` para ver a aplicação em execução.
