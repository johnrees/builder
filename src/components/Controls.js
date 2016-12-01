import React from 'react'
import { connect } from 'react-redux'
import { setLength, setFrameWidth, setFrameHeight, setRoofing, setCladding, setHasRoom, setRoomPosition, getTotalsAsync, makeFramesAsync } from '../actions'
import { bayCountSelector } from '../selectors/building'
import dat from 'dat-gui'

class Controls extends React.Component {

  constructor(props, context) {
    super(props, context)
    if (window.location.hash.match('locked')) return false

    let gui = new dat.GUI()
    gui.closed = true
    // dat.GUI.toggleHide()

    let editables = {
      clippingHeight: this.props.clippingHeight,
      length: this.props.length,
      width: this.props.width,
      height: this.props.height,
      roofing: this.props.roofingMaterial,
      cladding: this.props.claddingMaterial,
      hasRoom: this.props.hasRoom,
      roomPosition: this.props.roomPosition
    }

    let vals = {
      length: this.props.length,
      width: this.props.width,
      height: this.props.height
    }

    this.props.getTotalsAsync(vals)
    this.props.makeFramesAsync(vals)

    let clippingHeight = gui.add(editables, 'clippingHeight', 0.1, 2.5).step(0.1)
    clippingHeight.onChange(this.props.setClippingHeight)

    gui.add(window, 'showFrames')

    let dimensions = gui.addFolder("Dimensions")
    let length = dimensions.add(editables, 'length', 2, 10).step(0.3)
    // length.onChange(this.props.setLength)
    length.onChange( (v) => {
      this.props.setLength(v)
      this.props.getTotalsAsync(vals)
    })
    let width = dimensions.add(editables, 'width', 2, 4).step(0.1)
    // width.onChange(this.props.setWidth)
    width.onChange( (v) => {
      this.props.setWidth(v)
      this.props.getTotalsAsync(vals)
    })
    let height = dimensions.add(editables, 'height', 2, 4).step(0.1)
    // height.onChange(this.props.setHeight)
    height.onChange( (v) => {
      this.props.setHeight(v)
      this.props.getTotalsAsync(vals)
    })



    let materials = gui.addFolder("Materials")
    let roofing = materials.add(editables, 'roofing', { "STEEL (£25m²)": 'STEEL', "EPDM (£15m²)": 'EPDM', "NONE (£0)": 'NONE' })
    roofing.onChange(this.props.setRoofing)
    let cladding = materials.add(editables, 'cladding',
      { "RECYCLED PLASTIC (£20m²)": 'RECYCLED_PLASTIC', "LARCH (£40m²)": 'LARCH', "WEATHERBOARD (£25m²)": 'WEATHERBOARD', "NONE (£0)": 'NONE' })
    cladding.onChange(this.props.setCladding)

    let room = gui.addFolder('Room')
    let hasRoom = room.add(editables, 'hasRoom')
    hasRoom.onChange(this.props.setHasRoom)
    let roomPosition = room.add(editables, 'roomPosition', 2, 6).step(1)
    roomPosition.onChange((value) => {
      if (value > this.props.bayCount-4) { return false }
      this.props.setRoomPosition(value)
    })
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
  claddingMaterial: state.building.cladding,
  hasRoom: state.building.hasRoom,
  roomPosition: state.building.roomPosition,
  bayCount: bayCountSelector(state)
})

const mapDispatchToProps = (dispatch) => ({
  setLength: (value) => { dispatch(setLength(value)) },
  getTotalsAsync: (value) => { dispatch(getTotalsAsync(value)) },
  setWidth: (value) => { dispatch(setFrameWidth(value)) },
  setHeight: (value) => { dispatch(setFrameHeight(value)) },
  setRoofing: (value) => { dispatch(setRoofing(value)) },
  setCladding: (value) => { dispatch(setCladding(value)) },
  setHasRoom: (value) => { dispatch(setHasRoom(value)) },
  setRoomPosition: (value) => { dispatch(setRoomPosition(value)) },
  makeFramesAsync: (value) => { dispatch(makeFramesAsync(value)) },
})

export default connect(mapStateToProps, mapDispatchToProps)(Controls)
