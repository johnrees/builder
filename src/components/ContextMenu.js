import React from 'react'

class ContextMenu extends React.Component {
  render() {
    return false;
    return(
      <div id="context-menu" style={{left: this.props.left + "px", right: this.props.right + "px"}}>CONTEXT-MENU</div>
    )
  }
}

export default ContextMenu
