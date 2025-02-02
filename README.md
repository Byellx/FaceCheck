# Projeto: Sistema de Busca de Usuários e Autenticação de Equipamentos

## 📌 Descrição
Este projeto é uma aplicação web desenvolvida com React e Node.js para interagir com equipamentos de controle de acesso, permitindo buscar usuários cadastrados e exibir suas informações, incluindo fotos. A comunicação entre frontend e backend é feita via API REST.

## 🛠️ O Problema e a Solução
A empresa onde trabalho desenvolve softwares para controle de acesso em condomínios. Um de nossos clientes relatou que as imagens dos moradores cadastradas no nosso sistema não coincidiam com as imagens armazenadas nos equipamentos de controle de acesso. No entanto, ao acessar o equipamento via web, só era possível visualizar a quantidade de usuários cadastrados, sem acesso direto às fotos.

A equipe de suporte descobriu que a API do equipamento permitia extrair as imagens em formato base64, mas exigia o uso de outro site para convertê-las em imagens visíveis. Para automatizar esse processo, desenvolvi esta solução, que permite buscar um usuário pelo nome ou ID e visualizar sua imagem diretamente, eliminando a necessidade de conversões manuais.

## 🚀 Tecnologias Utilizadas
- **Frontend:** React, TypeScript, React Toastify
- **Backend:** Node.js, Express, request
- **Outras:** CORS, Fetch API

## ⚙️ Funcionalidades
### 🔹 **Frontend (index.tsx)**
- Conectar-se a um equipamento via IP, enviando credenciais de acesso.
- Buscar usuários pelo nome ou ID.
- Exibir informações e foto do usuário.
- Exibir mensagens de status da requisição (conexão, erro, sucesso).

### 🔹 **Backend (server.js)**
- Servidor Express para processar requisições.
- Rota `/sendEquipData` para buscar lista de usuários.
- Rota `/getUserByID` para obter foto de um usuário.
- Função `extrairPhotoData` para processar imagens base64.

## 🛠️ Como Executar o Projeto
### **1️⃣ Clonar o Repositório**
```bash
git clone https://github.com/seu-repositorio.git
cd seu-repositorio
```

### **2️⃣ Instalar Dependências**
#### Backend:
```bash
cd backend
npm install
```
#### Frontend:
```bash
cd frontend
npm install
```

### **3️⃣ Configurar e Iniciar o Servidor**
```bash
node server.js
```

### **4️⃣ Iniciar o Frontend**
```bash
npm start
```

