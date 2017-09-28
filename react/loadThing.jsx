import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Thing from './Thing.jsx'

function render() {
    ReactDOM.render(
        <AppContainer><Thing test={global.SERVER_DATA.test} /></AppContainer>,
        document.getElementById('thing')
    )
}

render()

if (module.hot)
    module.hot.accept('./Thing.jsx', render)
