<div align="center">

# 🌌 **Alcyone**
### _A modular Discord bot core forged in order, silence, and a whisper of chaos._

<br>

[![License](https://img.shields.io/badge/License-Apache_2.0-6f42c1?style=flat-square)](LICENSE)
[![TypeScript](https://img.shields.io/badge/Written_in-TypeScript-3178c6?style=flat-square)]()
[![Bun](https://img.shields.io/badge/Powered_by-Bun-000000?style=flat-square&logo=bun)]()
[![Status](https://img.shields.io/badge/Status-Active-44cc11?style=flat-square)]()

> “In every system, there must be structure.  
> In every structure, a pulse.”  
> — *Alcyone Core Protocol*

</div>

## ✨ **Overview**

**Alcyone** is not just another Discord bot —  
it is a **framework**, a **foundation**, and a **core system** built for developers who want clarity and power without sacrificing elegance.

Designed with:

- 🔧 **True Modularity** — commands, events, loaders and interfaces fully isolated  
- ⚡ **High Performance** — Bun runtime + optimized loading  
- 🧩 **Extensibility First** — structure ready for scaling, theming and customization  
- 🔐 **Secure Integrations** — powered by Infisical and strict environment validation  
- 🖤 **Aesthetic + Order** — code that looks clean, feels clean, and _stays_ clean

Use Alcyone as:
- a complete bot,
- a boilerplate for new bots,
- or the baseline for your own SDK.

## 🌒 **Why Alcyone Exists**


Discord bots often fall into two extremes:

- total chaos,
- or unnecessary complexity.

Alcyone is born in the perfect middle ground:
A solid core, simple to understand, hard to crack — and elegant enough for you to be proud to keep.

## 🧱 **Project Structure**

```bash
src/
│
├── core/               # Client, gateway, initialization
├── commands/           # Slash, context and utilities
│   ├── slash/
│   ├── context/
│   └── ...
│
├── events/             # Bot events (ready, interactions)
├── loaders/            # Automatic loaders (commands, events)
├── config/             # Constants, emojis, API keys, env validators
├── interfaces/         # Base classes & TypeScript contracts
├── utils/              # Helpers and safe utilities
└── main.ts             # Entry point
````

**No manual wiring.**
Every command and event is detected and registered automatically.

## ⚙️ **Tech Stack**

| Component       | Technology        |
| --------------- | ----------------- |
| Runtime         | Bun               |
| API Layer       | Discord.js v14    |
| Language        | TypeScript        |
| Formatting      | ESLint + Prettier |
| HTTP Client     | Axios             |
| Date Utils      | Moment.js         |
| Secrets Manager | Infisical         |

## 🚀 **Running the Project**

### ✅ Install dependencies

```bash
bun install
```

### ✅ Login to Infisical

```bash
infisical login
```

### ✅ Development mode

```bash
bun run dev
```

### ✅ Production build

```bash
bun run build
```

## 🧩 **Command Design**

All Slash Commands extend the unified base class:

```ts
class Ping extends BaseSlashCommand {
  constructor() {
    super();
    this
      .setName('ping')
      .setDescription('Shows bot and server latency with style');
  }

  async execute(interaction) {
    await interaction.reply('Pong');
  }
}

export default Ping;
```

This ensures:

* predictable behavior,
* automatic loading,
* shared metadata,
* easier maintenance.

Events follow the same architecture.

## 🧠 **Core Philosophy**

> *“Simplicity is not the absence of complexity,
> but the mastery of it.”*

Every piece of Alcyone is built with:

* low coupling,
* clear responsibilities,
* and minimal side-effects.

It is the exact opposite de um bot “gigante e bagunçado”.

## 📜 License

Distributed under the **Apache 2.0 License**.
See [`LICENSE`](LICENSE) for details.

<div align="center">

### 🖤 Alcyone

**Built by [HarukaYamamoto0](https://github.com/HarukaYamamoto0)**
with elegance, caffeine, and the gentle fear of breaking production.

</div>
