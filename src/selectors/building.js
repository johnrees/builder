import { createSelector } from 'reselect'
import THREE from 'three'
// import paper from 'paper'
import {outer} from '../blueprint'

const lengthSelector = state => state.building.length
const frameWidthSelector = state => state.frame.width
const frameHeightSelector = state => state.frame.height

export const frameSelector = createSelector(
  frameWidthSelector,
  frameHeightSelector,
  (width,height) => {
    return outer(width, height)
    // let re = /d="([^"]*)"/
    // return re.exec( frame(width,height) )[1]
  }
)

export const buildingAreaSelector = createSelector(
  lengthSelector,
  frameWidthSelector,
  (length, width) => {
    return length * width
  }
)

export const bayCountSelector = createSelector(
  lengthSelector,
  (length) => {
    return Math.ceil(length/1.2)
  }
)

export const frameBoxCountSelector = createSelector(
  bayCountSelector,
  (bayCount) => {
    return bayCount + 1
  }
)

const MATERIALS = {
  CLADDING: {
    'RECYCLED_PLASTIC': {
      cost: 20,
      color: '#5A554F',
      material: (new THREE.MeshLambertMaterial({ color: '#5A554F', side: THREE.DoubleSide }))
    },
    'LARCH': {
      cost: 40,
      color: '#B7A98A',
      material: (new THREE.MeshLambertMaterial({ color: '#B7A98A', side: THREE.DoubleSide }))
    },
    'WEATHERBOARD': {
      cost: 25,
      color: '#C3C5C0',
      material: (new THREE.MeshLambertMaterial({ color: '#C3C5C0', side: THREE.DoubleSide }))
    },
    'NONE': {
      cost: 0,
      color: 'red',
      material: (new THREE.MeshLambertMaterial({ color: '#000000', side: THREE.DoubleSide, transparent: true, opacity: 0 }))
    }
  },
  ROOFING: {
    'STEEL': {
      cost: 25,
      color: '#B8B7BF',
      material: (new THREE.MeshLambertMaterial({ color: '#B8B7BF', side: THREE.DoubleSide }))
    },
    'EPDM': {
      cost: 15,
      color: '#5B5D5C',
      material: (new THREE.MeshLambertMaterial({ color: '#5B5D5C', side: THREE.DoubleSide }))
    },
    'NONE': {
      cost: 0,
      color: 'red',
      material: (new THREE.MeshLambertMaterial({ color: '#000000', side: THREE.DoubleSide, transparent: true, opacity: 0 }))
    }
  }
}

const claddingTypeSelector = state => state.building.cladding
const roofingTypeSelector = state => state.building.roofing

export const claddingColorSelector = createSelector(
  claddingTypeSelector,
  (type) => MATERIALS.CLADDING[type].color
)

export const claddingMaterialSelector = createSelector(
  claddingTypeSelector,
  (type) => MATERIALS.CLADDING[type].material
)

export const claddingAreaSelector = createSelector(
  lengthSelector,
  frameWidthSelector,
  frameHeightSelector,
  (length, width, height) => ((width*height) + (length*height))*2
)

export const claddingTotalSelector = createSelector(
  claddingAreaSelector,
  claddingTypeSelector,
  (area, type) => area * MATERIALS.CLADDING[type].cost
)

export const roofingColorSelector = createSelector(
  roofingTypeSelector,
  (type) => MATERIALS.ROOFING[type].color
)

export const roofingMaterialSelector = createSelector(
  roofingTypeSelector,
  (type) => MATERIALS.ROOFING[type].material
)

export const roofingAreaSelector = createSelector(
  lengthSelector,
  frameWidthSelector,
  frameHeightSelector,
  (length, width, height) => (Math.hypot(width/2, height/2) * length) * 2
)

export const roofingTotalSelector = createSelector(
  roofingAreaSelector,
  roofingTypeSelector,
  (area, type) => area * MATERIALS.ROOFING[type].cost
)
