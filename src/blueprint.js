import paper from 'paper'

paper.setup()

const connectPoints = (points, strokeWidth=1, strokeColor="#000", closePath=true) => {
  let shape = new paper.Path()
  shape.moveTo(points[0])
  for (var i = 1; i < points.length; i++) {
    shape.lineTo(points[i])
  }
  if (closePath) { shape.closePath() }
  return shape;
}

export const frame = (width,height) => {
  const w = width * 100
  const h = height * 100
  const mainPoints = [
    [0,h],
    [w/2,h/2],
    [w/2,0],
    [-w/2,0],
    [-w/2,h/2]
  ]
  var mainPath = connectPoints(mainPoints)
  return mainPath.exportSVG({ asString: false, bounds: null }).getAttribute('d')
}
