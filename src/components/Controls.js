import React from 'react'
import { connect } from 'react-redux'
import { setLength, setFrameWidth, setFrameHeight } from '../actions'
import dat from 'dat-gui'

class Controls extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.gui = new dat.GUI()

    let editables = {
      length: this.props.length,
      width: this.props.width,
      height: this.props.height
    }

    let length = this.gui.add(editables, 'length', 2, 10).step(0.3)
    length.onChange(this.props.setLength)

    let width = this.gui.add(editables, 'width', 2, 4).step(0.1)
    width.onChange(this.props.setWidth)

    let height = this.gui.add(editables, 'height', 2, 4).step(0.1)
    height.onChange(this.props.setHeight)
  }

  render() {
    return false
  }

}

const mapStateToProps = (state) => ({
  length: state.building.length,
  width: state.frame.width,
  height: state.frame.height
})

const mapDispatchToProps = (dispatch) => ({
  setLength: (value) => { dispatch(setLength(value)) },
  setWidth: (value) => { dispatch(setFrameWidth(value)) },
  setHeight: (value) => { dispatch(setFrameHeight(value)) },
})

export default connect(mapStateToProps, mapDispatchToProps)(Controls)
