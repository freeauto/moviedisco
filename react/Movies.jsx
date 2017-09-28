import React from 'react'
import {TextField, Form, FormGroup} from 'front/form2'


export default class Movies extends React.Component {
  render() {
    let {test} = this.props
    return <div>
      <div className="form-horizontal">
        <FormGroup label="Find a movie">
          <div className="open dropdown">
            <input type="text" className="form-control" placeholder="Start typing a movie (example: Inception)" autoFocus />
          </div>
        </FormGroup>
      </div>
    </div>
  }
}
