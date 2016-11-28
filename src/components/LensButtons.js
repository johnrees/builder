import React from 'react'

export default class LensButtons extends React.Component {

  render() {
    return(
      <div id="lens-buttons">
        <ul>
          <li><a onClick={() => this.props.setLens('GROUND') }>Ground</a></li>
          <li><a onClick={() => this.props.setLens('CROSS') }>Cross-Section</a></li>
          <li><a onClick={() => this.props.setLens('BASIC') }>Basic</a></li>
        </ul>
      </div>
    )
  }

}
