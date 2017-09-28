import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Movies from './Movies.jsx'

function render() {
    ReactDOM.render(
        <AppContainer><Movies /></AppContainer>,
        document.getElementById('movies')
    )
}

render()

if (module.hot)
    module.hot.accept('./Movies.jsx', render)
