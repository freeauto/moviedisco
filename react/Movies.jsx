import React from 'react'
import {TextField, Form, FormGroup} from 'front/form2'

import {Paginate} from 'front/paginate'


class MovieRow extends React.Component {
  render() {
    let {movie} = this.props
    return <tr>
      <td>{movie.title}</td>
      <td><img src={'http://image.tmdb.org/t/p/w185' + movie.poster_path} /></td>
    </tr>
  }
}

export default class Movies extends React.Component {
  constructor() {
    super()
    this.state = {
      movies: [],
      page: 0,
      total: 0,
      loading: false,
      error: null
    }
  }

  componentDidMount() {
    let _this = this
    $.get('/api/popular?page=1', function(data) {
      let {results, total_results, page} = data
      _this.setState({movies: results, total: total_results, page})
    })
  }

  renderResults() {
    let pageSize = 20
    let {page, movies, total} = this.state

    return <Paginate className="pull-right" page={page} pageSize={pageSize} num={movies.length} total={total}
      onClickPrev={null} onClickNext={null} units="movies found">
      <table className="table">
        <thead>
          <tr>
            <th>Movie</th>
          </tr>
        </thead>
        <tbody>
        {movies.map(movie => <MovieRow key={movie.id} movie={movie}/>)}
        </tbody>
      </table>
    </Paginate>
  }

  render() {

    let {page} = this.state

    return <div>
      <div className="form-horizontal">
        <FormGroup label="Find a movie">
          <div className="open dropdown">
            <input type="text" className="form-control" placeholder="Start typing a movie (example: Inception)" autoFocus />
          </div>
        </FormGroup>
        {page > 0 && this.renderResults()}
      </div>
    </div>
  }
}
