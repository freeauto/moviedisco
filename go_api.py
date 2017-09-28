from back.movie import get_movie_api


movies = get_movie_api('/movie/popular', language='en-US', page=1)

import json

print json.dumps(movies, indent=2)
print len(movies['results'])

