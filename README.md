# Copa do Mundo 2026 — Simulador

Simule os grupos e o mata-mata da Copa do Mundo FIFA 2026 com 48 seleções.

## Funcionalidades

- 🏆 12 grupos com 4 seleções cada (48 times no total)
- 📊 Tabela de classificação em tempo real
- 🗺️ Bracket interativo do mata-mata
- 🌙 Modo claro/escuro
- 🔗 Compartilhar simulação via link (requer MongoDB)

## Tecnologias

- **Next.js 14** (App Router + TypeScript)
- **Tailwind CSS** + `next-themes` (dark/light mode)
- **MongoDB** via Mongoose (para salvar simulações)
- **lucide-react** para ícones

## Configuração

### 1. Instalar dependências

```bash
npm install
```

### 2. Variáveis de ambiente (opcional — para compartilhar simulações)

Copie `.env.example` para `.env.local` e preencha sua URI do MongoDB:

```bash
cp .env.example .env.local
```

```env
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/worldcup2026
```

> Sem o MongoDB, a funcionalidade de compartilhar ficará desativada — o restante do simulador funciona normalmente.

### 3. Rodar localmente

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

### 4. Build de produção

```bash
npm run build
npm start
```

## Estrutura

```
src/
  lib/
    teams.ts        # 48 seleções
    groups.ts       # sorteio dos grupos
    mongodb.ts      # conexão MongoDB
    simulation.ts   # lógica de standings e avanço
  types/index.ts    # interfaces TypeScript
  models/
    Simulation.ts   # modelo Mongoose
  components/       # componentes React
  app/
    page.tsx        # página inicial
    simulation/     # simulador principal
    share/[code]/   # visualização de simulações compartilhadas
    api/simulations # API de salvar/carregar simulações
```

