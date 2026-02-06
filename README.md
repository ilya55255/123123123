# Research Information Collector v1.2

Система автоматизированного сбора релевантной информации из открытых интернет-источников для анализа социальных, политических, экономических процессов.

## Возможности

- **Мультиисточники**: 5 надежных научных баз (OpenAlex, CrossRef, DOAJ, Europe PMC, BASE)
- **Мультиязычность**: 10+ языков (английский, русский, китайский, японский, арабский, иврит и др.)
- **Структурированные данные**: JSON с метаданными + текстовые чанки для RAG-пайплайнов
- **Экспорт**: JSON, CSV, NDJSON форматы
- **Локальное хранение**: Browser localStorage (без базы данных)
- **Custom URL extraction**: Загрузка контента с пользовательских ссылок
- **Этичный сбор**: Задержки между запросами, только открытые API

## Что нового в v1.2

- Удалены неработающие источники (arXiv, Semantic Scholar, PubMed, CORE)
- Добавлены проверенные альтернативы: Europe PMC и BASE
- Улучшена стабильность поиска
- Оптимизирован размер бандла

## Быстрый старт

### Установка зависимостей
```bash
npm install
```

### Запуск в режиме разработки
```bash
npm run dev
```
Приложение откроется на `http://localhost:5173`

### Сборка для продакшена
```bash
npm run build
```

## API источники

### OpenAlex
- Открытый каталог научных работ (250+ млн)
- Все научные дисциплины
- Endpoint: `https://api.openalex.org`
- Rate Limit: ~10 req/sec
- Статус: Работает отлично

### CrossRef
- Метаданные научных публикаций (140+ млн)
- Все научные издательства
- Endpoint: `https://api.crossref.org`
- Rate Limit: ~50 req/sec
- Статус: Работает отлично

### DOAJ
- 18000+ открытых журналов (7+ млн статей)
- Все дисциплины, только open access
- Endpoint: `https://doaj.org/api/v3`
- Статус: Работает отлично

### Europe PMC (НОВЫЙ)
- Биомедицинские публикации (40+ млн)
- Медицина, биология, life sciences
- Endpoint: `https://www.ebi.ac.uk/europepmc/webservices/rest`
- Статус: Работает отлично

### BASE (НОВЫЙ)
- Междисциплинарный поиск (350+ млн документов)
- Все дисциплины, мультиязычный
- Endpoint: `https://api.base-search.net`
- Статус: Работает хорошо

## Использование

### 1. Базовый поиск

1. Введите **ключевые слова**
2. Выберите **временной диапазон**
3. Выберите **языки**
4. Выберите **источники**
5. Нажмите **Start Search**

### 2. Примеры запросов

#### Медицинские исследования
```
Keywords: alzheimer disease treatment
Date From: 2023-01-01
Languages: English
Sources: EuropePMC, DOAJ
Max Results: 30
```

#### Междисциплинарный поиск
```
Keywords: artificial intelligence ethics
Date From: 2020-01-01
Languages: English, Deutsch
Sources: BASE, OpenAlex, CrossRef
Max Results: 50
```

#### Открытый доступ
```
Keywords: renewable energy
Date From: 2024-01-01
Sources: DOAJ, EuropePMC, BASE
Max Results: 40
```

## Технологический стек

- **React 18.3** - UI библиотека
- **TypeScript 5.5** - Типизация
- **Vite 5.4** - Build tool
- **Tailwind CSS 3.4** - Стилизация

## Структура проекта

```
src/
├── types/                  # TypeScript интерфейсы
├── utils/                  # Утилиты обработки текста
├── services/
│   ├── storage.ts         # localStorage управление
│   ├── searchService.ts   # Координация поиска
│   └── api/               # Интеграции с API
│       ├── openAlex.ts
│       ├── crossref.ts
│       ├── doaj.ts
│       ├── europePmc.ts   # НОВЫЙ
│       └── base.ts        # НОВЫЙ
├── components/            # React компоненты
└── App.tsx               # Главный компонент
```

## Экспорт данных

### JSON
Полная структура с метаданными и чанками текста

### CSV
Табличный формат для анализа в Excel/Google Sheets

### NDJSON
Построчный JSON для стриминга и обработки больших данных

## Ограничения

### Браузерная среда
- CORS ограничения для некоторых URL
- localStorage размер ~5-10 MB
- PDF парсинг только по ссылкам

### API
- Rate limits каждого источника
- Не все API предоставляют полный текст
- Europe PMC - фокус на биомедицину
- BASE - может быть медленнее для больших запросов

## Рекомендации для production

1. Backend proxy для обхода CORS
2. База данных вместо localStorage (PostgreSQL)
3. Queue system для фоновых задач (Bull/Redis)
4. Кэширование результатов (Redis)
5. PDF парсер на сервере (pdf.js, pdfplumber)

## Документация

- **CHANGES_v1.2.md** - Детали обновления v1.2
- **README_USAGE.md** - Руководство пользователя
- **TECHNICAL_DOCUMENTATION.md** - Техническая документация
- **TEST_SCENARIOS.md** - Тестовые сценарии

## Производительность

- Build size: 176.15 KB (gzip: 55.45 KB)
- Build time: ~4.7s
- Поиск 20 документов: 30-60 секунд

## Лицензия

Для образовательных и исследовательских целей.

**Важно:**
- Соблюдайте Terms of Service источников
- Уважайте robots.txt
- Не перегружайте серверы запросами

---

**Версия:** 1.2.0
**Дата:** 2026-02-06
**Статус:** Production Ready
