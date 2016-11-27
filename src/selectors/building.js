import { createSelector } from 'reselect'

const lengthSelector = state => state.building.length
const frameWidthSelector = state => state.frame.width
const frameHeightSelector = state => state.frame.height

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
    return Math.ceil(length/2)
  }
)

const MATERIALS = {
  CLADDING: {
    'RECYCLED_PLASTIC': {
      cost: 20,
      color: '#5A554F'
    },
    'LARCH': {
      cost: 40,
      color: '#B7A98A'
    },
    'WEATHERBOARD': {
      cost: 25,
      color: '#C3C5C0'
    },
    'NONE': {
      cost: 0,
      color: 'red'
    }
  },
  ROOFING: {
    'STEEL': {
      cost: 25,
      color: '#B8B7BF'
    },
    'EPDM': {
      cost: 15,
      color: '#5B5D5C'
    },
    'NONE': {
      cost: 0,
      color: 'red'
    }
  }
}

const claddingMaterialSelector = state => state.building.cladding
const roofingMaterialSelector = state => state.building.roofing

export const claddingColorSelector = createSelector(
  claddingMaterialSelector,
  (material) => MATERIALS.CLADDING[material].color
)

export const claddingAreaSelector = createSelector(
  lengthSelector,
  frameWidthSelector,
  frameHeightSelector,
  (length, width, height) => ((width*height) + (length*height))*2
)

export const claddingTotalSelector = createSelector(
  claddingAreaSelector,
  claddingMaterialSelector,
  (area, material) => area * MATERIALS.CLADDING[material].cost
)

export const roofingColorSelector = createSelector(
  roofingMaterialSelector,
  (material) => MATERIALS.ROOFING[material].color
)

export const roofingAreaSelector = createSelector(
  lengthSelector,
  frameWidthSelector,
  frameHeightSelector,
  (length, width, height) => (Math.hypot(width/2, height/2) * length) * 2
)

export const roofingTotalSelector = createSelector(
  roofingAreaSelector,
  roofingMaterialSelector,
  (area, material) => area * MATERIALS.ROOFING[material].cost
)
