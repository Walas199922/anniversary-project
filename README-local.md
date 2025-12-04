# 💕 Projeto de Aniversário de Namoro

Um site especial e romântico para celebrar o aniversário de namoro, com um design espacial e moderno.

## ✨ Características

- 🌌 **Fundo Espacial Animado**: Estrelas piscando e em movimento criando uma atmosfera mágica
- 🎵 **Reprodutor de Música Estilo Spotify**: Design moderno e funcional
- 📸 **Galeria de Fotos Modal**: Apresentação de fotos do casal com frases especiais
- 📱 **Totalmente Responsivo**: Funciona perfeitamente em celulares, tablets e desktops
- ⌨️ **Controles por Teclado**: Use setas para navegar e ESC para fechar
- 👆 **Suporte a Gestos**: Deslize para mudar fotos em dispositivos móveis

## 🚀 Como Usar

### 1. Instalação

```bash
# Navegue até a pasta do projeto
cd anniversary-project

# Instale as dependências
npm install
```

### 2. Adicionar Conteúdo Personalizado

#### Música
- Coloque seu arquivo de música em `public/music/song.mp3`
- Formatos suportados: MP3, WAV, OGG

#### Fotos
- Crie a pasta `public/images/` se não existir
- Adicione suas fotos com os nomes: `photo1.jpg`, `photo2.jpg`, `photo3.jpg`, etc.
- Recomendado: Imagens otimizadas (máx 1MB cada)

#### Frases Personalizadas
- Edite o arquivo `public/script.js`
- Encontre o array `photos` no início do arquivo
- Personalize as frases (caption) para cada foto

Exemplo:
```javascript
const photos = [
    {
        src: 'images/photo1.jpg',
        caption: 'Sua frase romântica aqui 💕'
    },
    // ... mais fotos
];
```

### 3. Executar o Projeto

```bash
# Modo desenvolvimento (com auto-reload)
npm run dev

# Modo produção
npm start
```

O site estará disponível em: `http://localhost:3000`

## 📁 Estrutura do Projeto

```
anniversary-project/
├── public/
│   ├── index.html          # Estrutura HTML
│   ├── styles.css          # Estilos e animações
│   ├── script.js           # Lógica e interatividade
│   ├── images/             # Suas fotos (criar esta pasta)
│   │   ├── photo1.jpg
│   │   ├── photo2.jpg
│   │   └── ...
│   └── music/              # Sua música (criar esta pasta)
│       └── song.mp3
├── server.js               # Servidor Node.js
├── package.json            # Dependências
└── README.md              # Este arquivo
```

## 🎨 Personalização

### Cores do Tema
Edite `public/styles.css` para alterar o esquema de cores:
- Fundo espacial: `.space-background`
- Player de música: `.music-player`
- Cor de destaque: `#1db954` (verde do Spotify)

### Adicionar Mais Fotos
1. Adicione mais objetos ao array `photos` em `script.js`
2. Coloque as imagens correspondentes na pasta `public/images/`

### Alterar Título
Edite o `<h1>` em `index.html`:
```html
<h1 class="title">Seu Título Personalizado 💫</h1>
```

## 📱 Recursos Responsivos

- **Desktop**: Experiência completa com hover effects
- **Tablet**: Layout adaptado com controles touch-friendly
- **Mobile**: Gestos de swipe para navegar nas fotos

## 🎯 Dicas

1. **Otimize suas imagens** antes de adicionar (use ferramentas como TinyPNG)
2. **Formato MP3** é o mais compatível para a música
3. **Teste em diferentes dispositivos** antes de compartilhar
4. **Use frases curtas e emotivas** para melhor experiência mobile

## 💝 Pronto para Usar!

Personalize com suas fotos e música favoritas e surpreenda quem você ama!

---

Desenvolvido com ❤️ para celebrar o amor
