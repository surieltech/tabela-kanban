# 📋 Kanban Board

Um quadro Kanban interativo e funcional desenvolvido com HTML, CSS e JavaScript puro.

![Kanban Board](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![HTML](https://img.shields.io/badge/HTML-5-orange)
![CSS](https://img.shields.io/badge/CSS-3-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)

## ✨ Funcionalidades

- ✅ **Adicionar tarefas** - Crie novas tarefas em qualquer coluna
- ✅ **Excluir tarefas** - Remova tarefas indesejadas com um clique
- ✅ **Arrastar e soltar** - Mova tarefas entre colunas facilmente
- ✅ **Prioridades** - Classifique tarefas como Alta, Média ou Baixa prioridade
- ✅ **Persistência** - Dados salvos automaticamente no localStorage
- ✅ **Design moderno** - Interface limpa com efeito glassmorphism

## 🎨 Cores das Prioridades

| Prioridade | Cor | Badge |
|------------|-----|-------|
| Alta | 🔴 Vermelho | `badge-high` |
| Média | 🟡 Laranja | `badge-medium` |
| Baixa | 🟢 Verde | `badge-low` |

## 🗂️ Estrutura das Colunas

| Coluna | Descrição |
|--------|-----------|
| **To Do** | Tarefas a serem iniciadas |
| **In Progress** | Tarefas em andamento |
| **Testing** | Tarefas em fase de teste |
| **Fixing** | Tarefas com problemas para corrigir |
| **Approved/Done** | Tarefas concluídas e aprovadas |

## 🛠️ Tecnologias Utilizadas

- HTML5 - Estrutura semântica
- CSS3 - Estilização com glassmorphism
- JavaScript ES6 - Lógica e interatividade
- Font Awesome - Ícones
- LocalStorage - Persistência de dados

## 🎯 Funcionalidades em Detalhe

### Adicionar Tarefa
1. Clique no botão **"Add Task"** em qualquer coluna
2. Digite o título da tarefa
3. Selecione a prioridade (alta/média/baixa)
4. A tarefa aparecerá na coluna escolhida

### Mover Tarefa
1. Clique e segure qualquer card
2. Arraste para outra coluna
3. Solte para mover a tarefa

### Excluir Tarefa
1. Passe o mouse sobre qualquer card
2. Clique no ícone de lixeira 🗑️
3. Confirme a exclusão

## 💾 Persistência de Dados

Os dados são salvos automaticamente no **localStorage** do navegador. Isso significa que:

- ✅ Suas tarefas permanecem mesmo após fechar o navegador
- ✅ Não é necessário back-end ou banco de dados
- ✅ Os dados são privados e ficam apenas no seu computador

## 📱 Responsividade

O layout se adapta automaticamente para diferentes tamanhos de tela:

- 💻 **Desktop** - 5 colunas lado a lado
- 📱 **Mobile** - Colunas empilhadas verticalmente
