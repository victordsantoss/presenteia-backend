# Seeds do Banco de Dados

Este diretório contém os scripts de seed para popular o banco de dados com dados iniciais.

## Ordem de Execução

Os seeds devem ser executados na seguinte ordem, pois há dependências entre eles:

1. **Roles** - Cria as roles de usuários (SADMIN, ADMIN, USER, etc.)
2. **Categorias** - Cria as categorias de presentes
3. **Usuários** - Cria usuários de exemplo
4. **Eventos** - Cria eventos de exemplo (casamento, chá de bebê, etc.)
5. **Presentes** - Cria presentes vinculados aos eventos

## Como Executar

### Executar todos os seeds de uma vez (recomendado)

```bash
npm run seed:all
```

Este comando executará todos os seeds na ordem correta.

### Executar seeds individuais

```bash
# Seed de roles
npm run seed:roles

# Seed de categorias
npm run seed:categories

# Seed de usuários
npm run seed:users

# Seed de eventos
npm run seed:events

# Seed de presentes
npm run seed:gifts
```

## Descrição dos Seeds

### 1. seed-roles.ts
Cria as seguintes roles:
- SADMIN - Super Administrador
- ADMIN - Administrador
- MANAGER - Gerente
- USER - Usuário comum
- GUEST - Convidado

### 2. seed-categories.ts
Cria 17 categorias de presentes:
- Cozinha 🍳
- Casa e Decoração 🏠
- Quarto 🛏️
- Banheiro 🚿
- Eletrônicos 📱
- Eletrodomésticos 🔌
- Mesa e Jantar 🍽️
- Lavanderia 🧺
- Bebê 👶
- Jardim e Área Externa 🌱
- Ferramentas 🔧
- Livros e Entretenimento 📚
- Fitness e Esportes 🏋️
- Pet 🐾
- Viagem ✈️
- Vaquinha / Dinheiro 💰
- Outros 🎁

### 3. seed-users.ts
Cria 3 usuários de exemplo:
- João Silva (joao.silva@example.com)
- Maria Santos (maria.santos@example.com)
- Pedro Oliveira (pedro.oliveira@example.com)

**Senha padrão para todos:** `senha123`

### 4. seed-events.ts
Cria 3 eventos de exemplo:
- **Casamento João e Maria** (Público)
  - Data: 15/06/2025
  - Local: Igreja São Francisco - São Paulo, SP
  
- **Chá de Bebê - Laura** (Público)
  - Data: 20/04/2025
  - Local: Salão de Festas Happy Kids - Rio de Janeiro, RJ
  
- **Chá de Casa Nova - Pedro e Ana** (Privado)
  - Data: 10/05/2025
  - Local: Nosso novo lar - Belo Horizonte, MG

### 5. seed-gifts.ts
Cria diversos presentes para cada evento:

**Para o Casamento:**
- Jogo de Panelas Tramontina
- Jogo de Cama Queen
- Micro-ondas Electrolux
- Jogo de Taças de Vinho
- Contribuição para Lua de Mel (vaquinha)

**Para o Chá de Bebê:**
- Carrinho de Bebê
- Kit Berço
- Banheira de Bebê
- Roupinhas para Bebê

**Para o Chá de Casa Nova:**
- Smart TV 50 Polegadas
- Sofá Retrátil (vaquinha)
- Aspirador de Pó Robô
- Kit Quadros Decorativos
- Cafeteira Elétrica

Cada presente inclui:
- Nome, descrição e preço
- Categoria associada
- Prioridade (HIGH, MEDIUM, LOW)
- Links de sugestão (alguns)
- Opção de múltiplas contribuições (para vaquinhas)

## Observações

- Os seeds verificam se os dados já existem antes de criar, evitando duplicações
- Todos os dados criados são de exemplo e podem ser modificados ou removidos
- As senhas dos usuários são hasheadas usando bcrypt
- Os eventos têm slugs únicos para fácil acesso via URL

## Resetar o Banco de Dados

Para limpar o banco e executar os seeds novamente:

```bash
# Reseta o banco (cuidado: apaga todos os dados!)
npm run db:push

# Executa os seeds
npm run seed:all
```

