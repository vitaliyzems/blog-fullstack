Области хранения данных:

-   База данных на json-server (БД)
-   BFF
-   Redux store

Сущности приложения:

-   Пользователь: БД (список пользователей), BFF (сессия текущего пользователя), Store (отображение в браузере)
-   Роль пользователя: БД (список ролей), BFF (сессия пользователя с ролью), Store (использование на клиенте)
-   Статья: БД (список стетей), Store (отображение в браузере)
-   Комментарий: БД (список комментариев), Store (отображение в браузере)

Таблицы БД:

-   Пользователи - users: id / login / password / registered_at / role_id
-   Роли - roles : id / name
-   Статьи - posts: id / title / image_url / content / published_at
-   Комментарии - comments: id / author_id / post_id / content

Схема состояния на BFF:

-   Сессия текущего пользователя: login / password / role

Схема для Redux store (на клиенте):

-   user: id / login / roleId / session
-   posts: массив post: id / title / imageUrl / publishedAt / commentsCount
-   post: id / title / imageUrl / content / publishedAt / comments: массив comment: id / author / content / publishedAt
-   users массив user: id / login / registeredAt / role
