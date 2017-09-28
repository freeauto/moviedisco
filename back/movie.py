from com.scrape import get_json
import urllib


API_KEY = '5b19221d20b929615d236692cea743e4'
API_ROOT = 'https://api.themoviedb.org/3'


def get_movie_api(path, **params):
    params['api_key'] = API_KEY
    return get_json(API_ROOT + path + '?' + urllib.urlencode(params))
