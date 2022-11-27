import os
from pathlib import Path
import environ


BASE_DIR=Path(__file__).resolve().parent.parent

environment=environ.Env(
    SECRET_KEY=(str, 'key'),
    ENVIRONMENT=(str, 'localhost'),
    DB_HOST=(str, 'postgres-api.nedii.svc.cluster.local'),
    DB_NAME=(str, 'nedii'),
    DB_USER=(str, 'nedii'),
    DB_PASSWORD=(str, 'nedii'),
    EMAIL_HOST_USER=(str, 'john@doe.com'),
    EMAIL_HOST_PASSWORD=(str, 'password'),
    OP_API_KEY=(str, 'my-key'),
    OP_MERCHANT_ID=(str, 'my-id'),
)

environ.Env.read_env()


SECRET_KEY=environment('SECRET_KEY')
ENVIRONMENT=environment('ENVIRONMENT')
DB_HOST=environment('DB_HOST')
DB_NAME=environment('DB_NAME')
DB_USER=environment('DB_USER')
DB_PASSWORD=environment('DB_PASSWORD')
EMAIL_HOST_USER=environment('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD=environment('EMAIL_HOST_PASSWORD')
OP_API_KEY=environment('OP_API_KEY')
OP_MERCHANT_ID=environment('OP_MERCHANT_ID')


class Common:
    SECRET_KEY=SECRET_KEY
    SITE_HEADER='Nedii CMS'
    INDEX_TITLE='CMS'
    SITE_TITLE='CMS'
    EMAIL_HOST='smtp.gmail.com'
    EMAIL_USE_TLS=True
    EMAIL_PORT=587
    DEBUG=True
    ALLOWED_HOSTS=['*']
    JWT_ACCESS_EXPIRATION_DAYS=360
    JWT_REFRESH_EXPIRATION_DAYS=360
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql_psycopg2',
            'NAME': DB_NAME,
            'USER': DB_USER,
            'PASSWORD': DB_PASSWORD,
            'HOST': DB_HOST,
            'PORT': '5432'
        }
    }
    EMAIL_HOST_USER=EMAIL_HOST_USER
    EMAIL_HOST_PASSWORD=EMAIL_HOST_PASSWORD
    ENVIRONMENT=ENVIRONMENT
    MEDIA_ROOT='/media'
    STATIC_ROOT='/static'
    SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
    OP_API_KEY=OP_API_KEY
    OP_MERCHANT_ID=OP_MERCHANT_ID
    OP_VERIFY_SSL_CERTS=False
    OP_PRODUCTION=False


class LOCAL(Common):
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': os.path.join(BASE_DIR, 'db.sqlite3')
        }
    }
    WEB_APP_URL='http://127.0.0.1:3000/'
    API_URL='http://127.0.0.1:8000/'
    MEDIA_ROOT=os.path.join(BASE_DIR, 'media')
    STATIC_ROOT = os.path.join(BASE_DIR, "static")
    SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'http')


class STAGING(Common):
    WEB_APP_URL='https://nedii.vaggustudios.com.mx/'
    API_URL='https://api.nedii.vaggustudios.com.mx/'


class MASTER(Common):
    DEBUG=False
    JWT_ACCESS_EXPIRATION_DAYS=30
    JWT_REFRESH_EXPIRATION_DAYS=360
    OP_VERIFY_SSL_CERTS=True
    OP_PRODUCTION=True
    WEB_APP_URL='https://www.nedii.com.mx/'
    API_URL='https://api.nedii.com.mx/'


if ENVIRONMENT == 'staging':
    env=STAGING
elif ENVIRONMENT == 'master':
    env=MASTER
else:
    env=LOCAL
