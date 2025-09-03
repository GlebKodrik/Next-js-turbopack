## Next 15
Используем только "App route"
## GitFlow
🌿 [GitFlow в WB DevOps](https://docs-devops.wb.ru/cicd/manual.html#gitflow)
#### Ветка
[feature | fix]-номер задачи
<br>
**Пример:** feature-PROWB-32

#### Комментарий
[номер задачи] - описание
<br>
**Пример:** [PROWB-32]: Поправил авторизацию


## Getting Started

First, run the development server:

```bash
npm run dev
```

## RTK Query

Для реализации запроса используй - **rtkQueryApi.injectEndpoints**
<br>
Пример:
```
const userIpApi = rtkQueryApi.injectEndpoints({
    endpoints: (builder) => ({
        getIpInfo: builder.query<NetworkInfo, null>({
            query: () => 'https://pro.wildberries.ru/info/ip',
           }),
        }),
    });
```

## Используется концепция Feature-Sliced Design
https://feature-sliced.design/docs/get-started/overview

### Категории кода

- **shared** — многоразовый функционал, оторванный от специфики проекта/бизнеса. Например, `UIKit`, библиотеки, `API`.
- **entities** — хозяйствующие субъекты. Например, `Пользователь`, `Продукт`, `Заказ`.
- **features** — взаимодействия с пользователем, действия, которые приносят пользователю бизнес-ценность. Например, `SendComment`, `AddToCart`, `UsersSearch`.
- **widgets** — композиционный слой для объединения сущностей и признаков в значимые блоки. Например, `список проблем`, `профиль пользователя`.
- **pages** — композиционный слой для создания полноценных страниц из объектов, функций и виджетов.
- **app** — настройки, стили и поставщики всего приложения.
- 
### Создание Changelog

Установка conventional-changelog глобально:

``npm install -g conventional-changelog-cli``

В папке с проектом на нужной ветке запустить:

``conventional-changelog -i CHANGELOG.md -s -r 0``

