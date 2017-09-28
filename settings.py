import os
import sys
import time
from alembic.config import Config


LOCALDEV_PORT = 8080

NAME = 'MovieDisco'
ROOT_URL_PROD = 'http://moviedisco.baylaunch.com'
ROOT_URL_DEV = 'http://localhost:%d' % LOCALDEV_PORT

IS_REAL_PROD = os.environ.get('COMMIT') is not None
IS_LIKE_PROD = (IS_REAL_PROD or
                (os.environ.get('PRODUCTION') == '1') or
                (len(sys.argv) >= 2 and sys.argv[1] == 'prod'))

ALEMBIC_CONFIG_FILE = 'alembic_prod.ini' if IS_LIKE_PROD else 'alembic.ini'
ALEMBIC_CONFIG = Config(ALEMBIC_CONFIG_FILE)
DB_URL = ALEMBIC_CONFIG.get_main_option('sqlalchemy.url')

CONFIG = {
    'VERSION': os.environ.get('COMMIT') or str(int(time.time() * 1000)), # cache-buster
    'SQLALCHEMY_DATABASE_URI': DB_URL,
    'ROOT_URL_WITH_SLASH': (ROOT_URL_PROD if IS_LIKE_PROD else ROOT_URL_DEV) + '/', # for auto_context
}
