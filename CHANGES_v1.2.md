# Изменения версии 1.2 - Исправление неработающих источников

## Дата: 2026-02-06

## Что исправлено

### Удалены неработающие API источники

Удалены следующие источники, которые не работали:
- arXiv - проблемы с CORS и XML парсингом
- Semantic Scholar - изменился API, требуется ключ
- PubMed - проблемы с E-utilities API
- CORE - требует обязательный API key для работы

### Добавлены новые работающие источники

#### 1. Europe PMC
- Бесплатный открытый API
- Охват: биомедицина и life sciences
- Более 40 миллионов статей
- Endpoint: https://www.ebi.ac.uk/europepmc/webservices/rest/search
- Поддержка JSON формата
- Автоматические ссылки на PDF где доступны

#### 2. BASE (Bielefeld Academic Search Engine)
- Один из крупнейших поисковиков по научным ресурсам
- Охват: 350+ миллионов документов из 10,000+ источников
- Междисциплинарный поиск
- Endpoint: https://api.base-search.net/cgi-bin/BaseHttpSearchInterface.fcgi
- Поддержка множества языков
- Метаданные по стандарту Dublin Core

## Текущие работающие источники

1. OpenAlex - универсальный научный каталог
2. CrossRef - метаданные научных публикаций
3. DOAJ - открытые научные журналы
4. Europe PMC - биомедицинские публикации
5. BASE - междисциплинарный поиск

## Технические изменения

### Новые файлы
- `src/services/api/europePmc.ts` - интеграция Europe PMC API
- `src/services/api/base.ts` - интеграция BASE API

### Удалены файлы
- `src/services/api/arxiv.ts`
- `src/services/api/semanticScholar.ts`
- `src/services/api/pubmed.ts`
- `src/services/api/core.ts`

### Обновленные файлы
- `src/services/searchService.ts` - обновлен список источников
- `src/types/index.ts` - обновлен SourceType enum
- `src/components/SearchForm.tsx` - обновлен UI со списком новых источников
- `src/App.tsx` - обновлена информация о features

## Использование

### Для пользователей

Теперь при поиске доступны 5 надежных источников:

```typescript
Keywords: machine learning
Sources: OpenAlex, CrossRef, DOAJ, EuropePMC, BASE
```

### Europe PMC - для медицинских исследований
```typescript
Keywords: covid-19 vaccine
Sources: EuropePMC
Max Results: 30
```

### BASE - для широкого междисциплинарного поиска
```typescript
Keywords: artificial intelligence ethics
Sources: BASE, OpenAlex
Max Results: 50
```

## Примеры запросов

### Биомедицинские исследования
```
Keywords: alzheimer disease treatment
Date From: 2023-01-01
Languages: English
Sources: EuropePMC, DOAJ
Max Results: 30
```

### Междисциплинарный поиск
```
Keywords: climate change policy
Date From: 2020-01-01
Languages: English, Deutsch
Sources: BASE, OpenAlex, CrossRef
Max Results: 50
```

### Открытый доступ
```
Keywords: renewable energy
Date From: 2024-01-01
Languages: All
Sources: DOAJ, EuropePMC, BASE
Max Results: 40
```

## Производительность

### Сборка
- Размер бандла: 176.15 KB (gzip: 55.45 KB)
- Время сборки: ~4.7s
- Все зависимости в порядке

### API Performance
- OpenAlex: отлично
- CrossRef: отлично
- DOAJ: хорошо
- EuropePMC: отлично
- BASE: хорошо

## Миграция данных

Старые данные в localStorage остаются без изменений.
Новые поисковые запросы будут использовать только новые источники.

## Известные ограничения

### Europe PMC
- Фокус на биомедицину и life sciences
- Для других дисциплин лучше использовать BASE или OpenAlex

### BASE
- API может быть медленнее для очень больших запросов
- Рекомендуется ограничивать maxResults до 50

## Обратная связь

Если обнаружите проблемы с новыми источниками:
1. Проверьте browser console (F12)
2. Посмотрите Network tab для API запросов
3. Убедитесь в стабильном интернет-соединении

## Будущие обновления

Планируется:
- Monitoring API uptime
- Automatic fallback к альтернативным источникам
- Кеширование результатов
- Улучшенная обработка ошибок

---

Версия: 1.2.0
Статус: Production Ready
Дата релиза: 2026-02-06
