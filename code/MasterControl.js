// #VERSION=0.0.0
// #INLINE_START
EntityUtils.js
// #INLINE_END

let buildings = []

let touchedBuilding = null

function touchBegan(pt) {
  touchedBuilding = entityUtils.getTouched(buildings, pt)
}
function touchMove(pt) {
  const curTouched = entityUtils.getTouched(buildings, pt)
  if (curTouched !== touchedBuilding) {
    touchedBuilding = null
  }
}
function touchEnded(pt) {
  const curTouched = entityUtils.getTouched(buildings, pt)
  if (curTouched !== touchedBuilding) {
    touchedBuilding = null
  }
  if (touchedBuilding !== null) {
    log ('touched', touchedBuilding.name())
  }
  touchedBuilding = null
}

function init(){
  this.enableTouch()

  component.touchBegan = touchBegan
  component.touchMove = touchMove
  component.touchEnded = touchEnded

  buildings = entityUtils.filterChildren(this.entity(), 'building')
}

function start(){
}

function update(dt){

}

function signal(name, value){

}
