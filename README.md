# Stranger Birthday - Invitación Interactiva

Web interactiva temática de Stranger Things creada como invitación de cumpleaños. El invitado debe superar tres pruebas inspiradas en la serie (luces, walkie-talkie, quiz del Demogorgon) para descubrir un código secreto con los detalles de la fiesta.

> Nota: Proyecto personal creativo. Incluye countdown hasta la fecha del evento, efectos de niebla, audio ambiental y animaciones con Framer Motion.

## Vista previa

[https://vnasp.github.io/birthday-landingpage/](https://vnasp.github.io/birthday-landingpage/)

## Funcionalidades

- Countdown animado hasta la fecha del evento
- Tres minijuegos interactivos:
  - Puzzle de luces (estilo letras en la pared)
  - Walkie-talkie con audio
  - Quiz del Demogorgon
- Revelación del portal con código secreto al completar
- Efectos visuales: niebla animada, glitch text, transiciones
- Audio ambiental (OST) y efectos de sonido
- Animaciones con Framer Motion

## Tecnologías

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- Framer Motion

## Estructura del Proyecto

```
birthday-landingpage/
├── public/
│   ├── audio/          # Música y efectos de sonido
│   └── *.webp          # Fondos temáticos
├── src/
│   ├── components/
│   │   ├── Countdown.tsx
│   │   ├── LightsPuzzle.tsx
│   │   ├── WalkieTalkie.tsx
│   │   ├── MonsterQuiz.tsx
│   │   ├── PortalReveal.tsx
│   │   ├── FogAnimation.tsx
│   │   ├── GlitchText.tsx
│   │   └── Logo.tsx
│   ├── App.tsx
│   └── main.tsx
├── vite.config.ts
└── package.json
```
