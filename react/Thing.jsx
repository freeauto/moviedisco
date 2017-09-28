import React from 'react'

export default class Thing extends React.Component {
    render() {
        let {test} = this.props
        return <button className="btn btn-primary">I'm a Thing: {test}</button>
    }
}
