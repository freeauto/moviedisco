export DOMAINS="moviedisco.baylaunch.com"
export AWS_HOST=13
export HEROKU_APP="moviedisco"
export DEV_DB="moviedisco_dev"
export PROD_DB="moviedisco_prod"

PROD_DB_USER="meerkat"
PROD_DB_PARAMS="user=$PROD_DB_USER dbname=$PROD_DB host=localhost"
#PROD_DB_PARAMS="user=$PROD_DB_USER dbname=$PROD_DB host=your_rds_url_here password=your_password_here port=5432 sslmode=require"

source ../mvp/lib/_include.sh || echo "no include"
