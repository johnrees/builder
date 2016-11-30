import paper from 'paper'
import * as M from './methods'

paper.setup()

const pts = (width, height) => {
  const w = width * 100
  const h = height * 100
  return [
    [0,h],
    [w/2,h*0.6],
    [w/2,0],
    [-w/2,0],
    [-w/2,h*0.6]
  ]
}

export const outer = (width,height) => {
  const mainPoints = pts(width, height)
  const mainPath = M.connectPoints(mainPoints)
  // const innerPoints = M.offsetPoints(mainPoints, -16.5)
  // const innerPath = M.connectPoints(innerPoints)
  const outerPoints = M.offsetPoints(mainPoints, 16.5)
  const outerPath = M.connectPoints(outerPoints)

  return M.svg(outerPath)
  // return M.svg(M.compound([innerPath, outerPath]))
}


// export const framebox = (width,height) => {
//   const w = width * 100
//   const h = height * 100
//   const mainPoints = [
//     [0,h],
//     [w/2,h*0.6],
//     [w/2,0],
//     [-w/2,0],
//     [-w/2,h*0.6]
//   ]
//   const mainPath = M.connectPoints(mainPoints)
//   const innerPoints = M.offsetPoints(mainPoints, -16.5)
//   const innerPath = M.connectPoints(innerPoints)
//   const outerPoints = M.offsetPoints(mainPoints, 16.5)
//   const outerPath = M.connectPoints(outerPoints)

//   return M.svg(outerPath)
//   // return M.svg(M.unite([innerPath, outerPath]))
// }
