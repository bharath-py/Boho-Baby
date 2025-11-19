# This file can be kept empty or with the pymysql install if using PyMySQL instead of mysqlclient

import pymysql
pymysql.install_as_MySQLdb()
import sys
from pathlib import Path

# Add apps directory to Python path
BASE_DIR = Path(__file__).resolve().parent.parent
apps_path = BASE_DIR / 'apps'

if apps_path.exists() and str(apps_path) not in sys.path:
    sys.path.insert(0, str(apps_path))
