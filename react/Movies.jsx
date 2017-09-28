import React from 'react'
import {TextField, Form, FormGroup} from 'front/form2'

import {Paginate} from 'front/paginate'
import {PlainModal} from 'front/modal/PlainModal'


class MovieRow extends React.Component {

  constructor() {
    super()
    this.openMovie_ = this.openMovie_.bind(this)
  }

  openMovie_() {
    this.props.openMovie(this.props.movie)
  }

  render() {
    let {movie} = this.props
    return <tr className="movie" onClick={this.openMovie_}>
      <td>{movie.title}</td>
      <td><img src={'http://image.tmdb.org/t/p/w185' + movie.poster_path} /></td>
    </tr>
  }
}

class MovieModal extends React.Component {
  constructor() {
    super()
    this.onHide_ = this.onHide_.bind(this)
  }

  onHide_() {
    this.props.onHideModal()
  }

  render() {
    let {movie} = this.props
    return <PlainModal ref="modal" className="modal-dialog modal-lg" onHide={this.onHide_}>
      <div className="modal-header">
        <button type="button" className="close" data-dismiss="modal">&times;</button>
        <h4 className="modal-title">{movie.title}</h4>
      </div>
      <div className="modal-body">
      {movie.overview}
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </PlainModal>
  }
}

export default class Movies extends React.Component {
  constructor() {
    super()
    this.onClickNext_ = this.onClickNext_.bind(this)
    this.onClickPrev_ = this.onClickPrev_.bind(this)
    this.openMovie_ = this.openMovie_.bind(this)
    this.onHideModal_ = this.onHideModal_.bind(this)
    this.onSearch_ = this.onSearch_.bind(this)

    this.state = {
      movies: [],
      page: 0,
      total: 0,
      loading: false,
      error: null,
      modal: null,
      search: null
    }
  }

  onSearch_(e) {
    console.warn(this.refs.search.value)
    this.setState({search: this.refs.search.value})
    this.requestPage(1, this.refs.search.value)
    e.preventDefault()
  }

  onHideModal_() {
    this.setState({modal: null})
  }

  openMovie_(movie) {
    console.warn('opening movie!')
    this.setState({modal: movie})
  }

  onClickNext_() {
    this.requestPage(this.state.page + 1)
  }

  onClickPrev_() {
    this.requestPage(this.state.page - 1)
  }

  requestPage(page, search_) {
    let _this = this
    this.setState({loading: true})
    let {search} = this.state
    let url = null
    if (search_ || search)
      url = '/api/search?page=' + page + '&query=' + encodeURIComponent(search_ || search)
    else
      url = '/api/popular?page=' + page
    $.get(url, function(data) {
      let {results, total_results, page} = data
      _this.setState({movies: results, total: total_results, page, loading: false})
    })
  }

  componentDidMount() {
    this.requestPage(1)
  }

  renderResults() {
    let pageSize = 20
    let {page, movies, total} = this.state

    return <Paginate className="pull-right" page={page} pageSize={pageSize} num={movies.length} total={total}
      onClickPrev={this.onClickPrev_} onClickNext={this.onClickNext_} units="movies found">
      <table className="table">
        <thead>
          <tr>
            <th>Movie</th>
          </tr>
        </thead>
        <tbody>
        {movies.map(movie => <MovieRow key={movie.id} movie={movie} openMovie={this.openMovie_}/>)}
        </tbody>
      </table>
    </Paginate>
  }

  render() {

    let {page, loading, modal} = this.state

    return <div>
      <form className="form-horizontal" onSubmit={this.onSearch_}>
        <FormGroup label="Find a movie">
          <div className="open dropdown">
            <input type="text" ref="search" className="form-control" placeholder="Start typing a movie (example: Inception)" autoFocus />
          </div>
        </FormGroup>
        <FormGroup>
           <button className="btn btn-info btn-lg pull-right" onClick={this.onSearch_} >Search &raquo;</button>
        </FormGroup>
      </form>

      <div className="dimmed">
        {page > 0 && this.renderResults()}
        {loading && <div className="wrapper"><i className="fa fa-spin fa-spinner"></i> Loading...</div>}
      </div>

      {modal && <MovieModal movie={modal} onHideModal={this.onHideModal_}/>}
    </div>
  }
}
