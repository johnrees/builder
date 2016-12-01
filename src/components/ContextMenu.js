import React from 'react'
import { connect } from 'react-redux'
import { setRoofing, setCladding } from '../actions'

class ContextMenu extends React.Component {
  render() {
    if (this.props.showMenu == false) return false

    let links
    if (this.props.menuType == "ROOFING") {
      links = (<ul>
        <li><h3>Roofing</h3></li>
          <li onClick={() => this.props.setRoofing('STEEL')}>Steel<i>~£25m²</i></li>
          <li onClick={() => this.props.setRoofing('EPDM')}>EPDM<i>~£15m²</i></li>
          <li onClick={() => this.props.setRoofing('NONE')}>None<i>~£0</i></li>
        </ul>)
    } else {
      links = (<ul>
        <li><h3>Cladding</h3></li>
          <li onClick={() => this.props.setCladding('RECYCLED_PLASTIC')}>Recycled Plastic<i>~£20m²</i></li>
          <li onClick={() => this.props.setCladding('LARCH')}>Larch<i>~£40m²</i></li>
          <li onClick={() => this.props.setCladding('WEATHERBOARD')}>Weatherboard<i>~£25m²</i></li>
          <li onClick={() => this.props.setCladding('NONE')}>None<i>£0</i></li>
        </ul>)
    }
    return(
      <div id="context-menu" style={{left: this.props.left + 15 + "px", top: this.props.top -35 + "px"}}>
        {links}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  roofingMaterial: state.building.roofing,
  claddingMaterial: state.building.cladding
})

const mapDispatchToProps = (dispatch) => ({
  setRoofing: (value) => { dispatch(setRoofing(value)) },
  setCladding: (value) => { dispatch(setCladding(value)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(ContextMenu)

