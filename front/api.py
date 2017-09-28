from home import *

from back.movie import get_movie_api


@app.route('/api/popular')
def movies_api():
    page = request.args.get('page', '1')
    return jsonify(**get_movie_api('/movie/popular', language='en-US', page=page))


@app.route('/api/search')
def search_api():
    page = request.args.get('page', '1')
    query = request.args.get('query', '')
    return jsonify(**get_movie_api('/search/movie', query=query, language='en-US', page=page, include_adult=False))

