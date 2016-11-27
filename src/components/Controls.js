import React from 'react'
import { connect } from 'react-redux'
import { setLength, setFrameWidth, setFrameHeight, setRoofing, setCladding } from '../actions'
import dat from 'dat-gui'

class Controls extends React.Component {

  constructor(props, context) {
    super(props, context)
    let gui = new dat.GUI()

    let editables = {
      length: this.props.length,
      width: this.props.width,
      height: this.props.height,
      roofing: this.props.roofingMaterial,
      cladding: this.props.claddingMaterial
    }

    let length = gui.add(editables, 'length', 2, 10).step(0.3)
    length.onChange(this.props.setLength)

    let width = gui.add(editables, 'width', 2, 4).step(0.1)
    width.onChange(this.props.setWidth)

    let height = gui.add(editables, 'height', 2, 4).step(0.1)
    height.onChange(this.props.setHeight)

    let roofing = gui.add(editables, 'roofing', { "STEEL (£25m²)": 'STEEL', "EPDM (£15m²)": 'EPDM', "NONE (£0)": 'NONE' })
    roofing.onChange(this.props.setRoofing)

    let cladding = gui.add(editables, 'cladding',
      { "RECYCLED PLASTIC (£20m²)": 'RECYCLED_PLASTIC', "LARCH (£40m²)": 'LARCH', "WEATHERBOARD (£25m²)": 'WEATHERBOARD', "NONE (£0)": 'NONE' })
    cladding.onChange(this.props.setCladding)
  }

  render() {
    return false
  }

}

const mapStateToProps = (state) => ({
  length: state.building.length,
  width: state.frame.width,
  height: state.frame.height,
  roofingMaterial: state.building.roofing,
  claddingMaterial: state.building.cladding
})

const mapDispatchToProps = (dispatch) => ({
  setLength: (value) => { dispatch(setLength(value)) },
  setWidth: (value) => { dispatch(setFrameWidth(value)) },
  setHeight: (value) => { dispatch(setFrameHeight(value)) },
  setRoofing: (value) => { dispatch(setRoofing(value)) },
  setCladding: (value) => { dispatch(setCladding(value)) },
})

export default connect(mapStateToProps, mapDispatchToProps)(Controls)
