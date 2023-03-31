# Backend

## Requirements

1. PHP (== 8.2)
2. Composer (>= 2.6)
3. MySQL (>= 8.0.32)

## Setup

1. Install all php packages with composer.

```
composer install
```

2. Make a copy of the `env.sample` and rename it to `.env`. Change details as necessary (e.g. MySQL credentials).

3. Perform migration on the database.

```
php artisan migrate
```

4. Seed the database.

```
php artisan db:seed --class=TodosSeeder
```

5. Start the server.

```
php artisan serve
```
