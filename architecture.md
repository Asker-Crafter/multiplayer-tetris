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
│   │   ├── PlayersContext.tsx
│   │   ├── GameProvider.tsx
│   │   └── PlayersProvider.tsx
│   ├── engine/
│   │   ├── tetrominos.ts
│   │   ├── collision.ts
│   │   ├── rotation.ts
│   │   ├── scoring.ts
│   │   └── tetrominos.test.ts
│   ├── multiplayer/
│   │   ├── attackSystem.ts
│   │   └── targetSelection.ts
│   ├── utils/
│   │   └── keyboard.ts
│   ├── App.tsx
│   ├── App.test.tsx
│   ├── App.css
│   ├── index.css
│   ├── main.tsx
│   └── setupTests.ts
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
├── public/
│   └── vite.svg
├── src/
│   ├── Button/
│   ├── Modal/
│   ├── PlayerCard/
│   ├── Grid/
│   ├── Scoreboard/
│   ├── Glass/
│   ├── NextTetromino/
│   ├── global.d.ts
│   ├── setupTests.ts
│   ├── types.ts
│   └── index.ts
├── package.json
├── eslint.config.js
├── jest.config.ts
├── vite.config.ts
└── tsconfig.json
```

<center><h2> === Технологический стек === </h2></center>

### runtime зависимости
- react ^19.2.1 - UI библиотека
- react-dom ^19.2.1 - Рендеринг React
- react-router-dom ^7.10.1 - Маршрутизация

### dev зависимости
- typescript ~5.9.3 - Статическая типизация
- vite ^7.2.6 - Сборщик и dev-сервер
- eslint ^9.39.1 - Линтинг кода
- jest ^30.2.0 - Тестирование


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