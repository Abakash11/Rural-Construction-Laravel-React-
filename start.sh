#!/usr/bin/env bash
set -e

# move to app root
cd "$( dirname "$0" )"

# install composer deps
composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader

# ensure app key exists (if not provided by Render env vars)
if [ -z "$APP_KEY" ]; then
  php artisan key:generate --force
fi

# create storage symlink if needed
php artisan storage:link || true

# cache config & routes
php artisan config:cache || true
php artisan route:cache || true

# run migrations (only if you want auto migrate on start)
# php artisan migrate --force

# start the PHP built-in server (Render provides $PORT)
exec php -S 0.0.0.0:${PORT:-10000} -t public
