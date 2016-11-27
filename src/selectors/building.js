import { createSelector } from 'reselect'

const lengthSelector = state => state.building.length
const frameWidthSelector = state => state.frame.width
// const frameHeightSelector = state => state.frame.height

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
