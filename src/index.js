import './main.scss'

const getDims = (elm, removeBorder = true, removePadding = true) => {
  const elmStyles = window.getComputedStyle(elm)
  return {
    height: elm.offsetHeight +
      (removeBorder ? -parseInt(elmStyles.borderTopWidth, 10) - parseInt(elmStyles.borderBottomWidth, 10) : 0) +
      (removePadding ? -parseInt(elmStyles.paddingTop, 10) - parseInt(elmStyles.paddingBottom, 10) : 0),
    width: elm.offsetWidth +
      (removeBorder ? -parseInt(elmStyles.borderLeftWidth, 10) - parseInt(elmStyles.borderRightWidth, 10) : 0) +
      (removePadding ? -parseInt(elmStyles.paddingLeft, 10) - parseInt(elmStyles.paddingRight, 10) : 0)
  }
}

const clockwiseRotate = (center, angle, point) => {
  const movex = point.x - center.x
  const movey = point.y - center.y

  const s = Math.sin(angle * Math.PI / 180)
  const c = Math.cos(angle * Math.PI / 180)

  const x = movex * c - movey * s
  const y = movex * s + movey * c

  return {
    x: x + center.x,
    y: y + center.y
  }
}

const getMaxDims = elms => {
  let maxW = 0
  let maxH = 0
  for (let i = 0; i < elms.length; ++i) {
    maxW = Math.max(elms[i].offsetWidth, maxW)
    maxH = Math.max(elms[i].offsetHeight, maxH)
  }
  return {maxW, maxH}
}

// const clockContainer = document.getElementById('container')
const clock = document.getElementsByClassName('clock')[0]
const {height: boxH, width: boxW} = getDims(clock, false, false)
const minv = Math.min(boxH, boxW)
clock.style.height = clock.style.width = minv

const {height, width} = getDims(clock)
let dialHours = document.getElementsByClassName('clock__dial-hour')

let refx = 0
let refy = -height / 2 + dialHours[0].offsetHeight / 2
const coords = []
const maxDims = getMaxDims(dialHours)
const origin = {x: 0, y: 0}

for (let i = 1; i <= 12; ++i) {
  let newc = clockwiseRotate(origin, 30, {x: refx, y: refy})
  refx = Math.round(newc.x)
  refy = Math.round(newc.y)
  // console.log(refx, refy)
  newc.x = Math.round(newc.x - dialHours[i - 1].offsetWidth / 2 + width / 2)
  newc.y = Math.round(newc.y - dialHours[i - 1].offsetHeight / 2 + height / 2)
  dialHours[i - 1].style.top = newc.y + 'px'
  dialHours[i - 1].style.left = newc.x + 'px'
  coords.push(newc)
  console.log(newc.x, newc.y)
}

const handPivot = document.getElementById('hand-pivot')
const pivotBoxDims = getDims(handPivot, false, false)
handPivot.style.top = height / 2 - pivotBoxDims.height / 2 + 'px'
handPivot.style.left = width / 2 - pivotBoxDims.width / 2 + 'px'
console.log(handPivot.style.top, handPivot.style.left)
