import React from 'react'
import paper from 'paper'
import * as M from './methods'
import {frameBox} from './index'

export default class Canvas extends React.Component {
	// constructor(props, state) {
	// 	super(props, state)
	// }
	componentDidMount() {
		paper.setup(document.getElementById('paper'))

    const matrix = new paper.Matrix(1,0,0,-1, paper.view.center.x, paper.view.center.y)
    paper.settings.applyMatrix = false
    paper.project.activeLayer.transform(matrix)

		// M.fill(M.rectangle(30,30,10,10), 'red')
		frameBox(3.9,3.9)
	}

	render() {
		return(
      <canvas ref="paper" id="paper" width={window.innerWidth} height={window.innerHeight} data-paper-resize />
		)
	}

}
