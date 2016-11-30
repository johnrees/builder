import paper from 'paper'
import clipsy from 'clipsy'
import _ from 'lodash'

export const connectPoints = (points, strokeWidth=1, strokeColor="#000", closePath=true) => {
  let shape = new paper.Path()
  shape.moveTo(points[0])
  for (var i = 1; i < points.length; i++) {
    shape.lineTo(points[i])
  }
  if (closePath) { shape.closePath() }
  return shape
}

export const svg = (path) => {
  return path.exportSVG({ asString: false, bounds: null }).getAttribute('d')
}

export const offsetPoints = (points, delta) => {
  let clipper = new clipsy.Clipper()
  let newPoints = []
  for (let i = 0; i < points.length; i++) {
    newPoints.push({ X: points[i][0], Y: points[i][1] })
  }
  let processedPoints = clipper.OffsetPolygons([newPoints], delta, 2, 10, true)[0]
  newPoints = []
  for (let j = 0; j < processedPoints.length; j++) {
    newPoints.push([processedPoints[j].X, processedPoints[j].Y])
  }
  return newPoints
}

export const unite = (array) => {
  const arr = _.flattenDeep(array)
  let united = arr[0]
  for (let i = 1; i < arr.length; i++) {
    united = united.unite(arr[i])
  }
  return united
}

export const clone = (n) => {
  return n.clone()
}

export const compound = (array) => {
  var arr = _.flattenDeep(array)
  return new paper.CompoundPath({
    children: _.map(arr,clone)
  })
}
