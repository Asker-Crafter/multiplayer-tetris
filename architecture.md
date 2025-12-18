##### Архитектурные требования для реализации курсовой работы на тему "Разработка мультиплеерной игры "Тетрис" с использованием JavaScript (React)"

<center><h2> === Система состоит из двух независимых проектов в репозитории === </h2></center>

### первый - game-app - основное игровое приложение
```
game-app/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── TetrisBoard/
│   │   ├── NextPiecePreview/
│   │   ├── ScorePanel/
│   │   ├── GameOverModal/
│   │   └── AttackQueue/
│   ├── pages/
│   │   ├── Lobby/
│   │   ├── GameRoom/
│   │   └── Results/
│   ├── context/
│   │   ├── GameContext.tsx
│   │   └── PlayersContext.tsx
│   ├── engine/
│   │   ├── tetrominos.ts
│   │   ├── collision.ts
│   │   ├── rotation.ts
│   │   └── scoring.ts
│   ├── multiplayer/
│   │   ├── attackSystem.ts
│   │   └── targetSelection.ts
│   ├── utils/
│   │   └── keyboard.ts
│   ├── App.tsx
│   ├── App.test.tsx
│   ├── App.css
│   ├── index.css
│   └── main.tsx
├── .gitignore
├── eslint.config.js
├── index.html
├── jest.config.ts
├── package.json
├── vite.config.ts
└── tsconfig.json
```
### второй - ui-kit - библиотека UI-компонентов
```
ui-kit/
├── src/
│   ├── Button/
│   ├── Modal/
│   ├── PlayerCard/
│   ├── Grid/
│   ├── Scoreboard/
│   └── index.ts
├── package.json
├── .gitignore
├── eslint.config.js
├── jest.config.ts
├── vite.config.ts
└── tsconfig.json
```

<center><h2> === Технологический стек === </h2></center>

### runtime зависимости
- react ^19.0.0 - UI библиотека
- react-dom ^19.0.0 - рендеринг React
- react-router-dom ^7.1.1 - маршрутизация

### dev зависимости
- typescript ~5.6.2 - статическая типизация
- vite ^6.0.5 - сборщик и dev-сервер
- eslint ^9.17.0 - линтинг кода
- jest ^29.7.0 - тестирование


<center><h2> === Компоненты === </h2></center>

- TetrisBoard - игровое поле с отрисовкой фигур и мусорных линий
- NextPiecePreview - превью следующей фигуры
- ScorePanel - панель очков, уровня и количества очищенных линий
- GameOverModal - модальное окно с результатами игры
- AttackQueue - отображение очереди входящих атак
- Button - универсальная кнопка
- Modal - модальное окно
- PlayerCard - карточка игрока с информацией о статусе
- Scoreboard - таблица результатов


<center><h2> === Структура роутинга === </h2></center>

### Игровое приложение
```
Главная страница
├── /lobby - лобби для выбора количества игроков
├── /game - игровая комната
└── /results - результаты игры
```

<center><h2> === Хранение данных === </h2></center>

Все игроки находятся в одной вкладке браузера. Данные хранятся в памяти приложения через React Context:
- **GameContext** - состояние игры (поля всех игроков, их фигуры, счет, уровень)
- **PlayersContext** - информация об игроках (имена, статусы, очереди атак)

Каждый игрок управляется с клавиатуры своим набором клавиш (например, WASD для первого, стрелки для второго).