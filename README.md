## 🌟 Projeto CRUD de Despesas (Expense Tracker)

Este é um projeto completo de gerenciamento de despesas pessoais, implementado com **React** e **TypeScript**, utilizando o **Vite** como _bundler_ e o **JSON Server** para simular uma API RESTful persistindo os dados em um arquivo local (`db.json`). A interface é estilizada de forma moderna e responsiva utilizando **Tailwind CSS**.

---

## 🚀 Tecnologias Utilizadas

| Categoria       | Tecnologia       | Uso                                                             |
| :-------------- | :--------------- | :-------------------------------------------------------------- |
| **Front-end**   | **React**        | Biblioteca para construção da interface de usuário.             |
| **Linguagem**   | **TypeScript**   | Tipagem estática para maior segurança e escalabilidade.         |
| **Build Tool**  | **Vite**         | Ambiente de desenvolvimento rápido e _bundler_.                 |
| **Estilização** | **Tailwind CSS** | _Framework_ _utility-first_ para design moderno e coeso.        |
| **API Mock**    | **JSON Server**  | API REST simulada para persistência local de dados (`db.json`). |
| **Versão**      | **Git/GitHub**   | Controle de versão e colaboração.                               |

---

## ⚙️ Funcionalidades (CRUD Completo)

O sistema permite gerenciar o ciclo de vida completo dos registros de despesas:

- **CREATE (Criação):** Adicionar novas despesas (Descrição, Valor, Categoria) via formulário.
- **READ (Leitura):** Exibir todas as despesas em lista, com cálculo do **Valor Total** gasto.
- **UPDATE (Edição):** Editar despesas existentes (Descrição, Valor, Categoria) diretamente na lista.
- **DELETE (Exclusão):** Remover permanentemente uma despesa.

---

## 🛠️ Instalação e Execução

Para rodar este projeto em sua máquina local, siga os passos abaixo.

### 1. Clonar o Repositório

Se ainda não o fez, clone o repositório do GitHub e navegue para a pasta do projeto:

\`\`\`bash
git clone SUA_URL_DO_GITHUB.git
cd nome-do-projeto
\`\`\`

### 2. Instalar Dependências

Instale todas as dependências do Node.js, tanto de produção quanto de desenvolvimento:

\`\`\`bash
npm install

# OU

yarn install
\`\`\`

### 3. Configurar Scripts de Execução

O projeto está configurado para iniciar o servidor do React e o servidor da API (JSON Server) simultaneamente usando o \`concurrently\`.

Seu \`package.json\` deve conter os seguintes _scripts_:

\`\`\`json
"scripts": {
"dev": "vite",
"start-api": "npx json-server --watch db.json --port 3001",
"start": "concurrently \"npm run start-api\" \"npm run dev\""
}
\`\`\`

### 4. Inicializar o Projeto

Execute o comando principal para iniciar ambos os servidores. Certifique-se de ter um arquivo **\`db.json\`** configurado na raiz do projeto com a chave \`"expenses"\` e dados iniciais.

\`\`\`bash
npm run start
\`\`\`

- O servidor de desenvolvimento do **React/Vite** será iniciado em **\`http://localhost:5173\`** (ou porta similar).
- O servidor da **API Mock (JSON Server)** será iniciado em **\`http://localhost:3001\`**.

---

## 📂 Estrutura de Diretórios

O projeto segue uma estrutura modular padrão do React/Vite para fácil manutenção:

\`\`\`
src/
├── components/ # Componentes de UI reutilizáveis e a lista de despesas (ExpenseList)
├── pages/ # Componentes de rota (HomePage - container principal)
├── services/ # Lógica de comunicação com a API (expenseService.ts)
├── types/ # Definições de interfaces TypeScript (Expense.ts)
├── assets/ # Arquivos estáticos
└── (Arquivos Principais)
├── db.json # Base de dados mock do JSON Server
└── tailwind.config.js # Configuração do Tailwind CSS
\`\`\`

---

## 🤝 Contribuições

Este projeto foi desenvolvido como um exercício prático de desenvolvimento web.

Se desejar contribuir, sinta-se à vontade para abrir uma _Issue_ ou enviar um _Pull Request_ para melhorias no código, performance ou _design_.

Link do video de explicação: https://drive.google.com/file/d/134BtszgJBz-9AWEElJrbNP4G_N6ag8mj/view?usp=drive_link
