//overaly tryout
function mapToIntOverlay2(labels){
  var num = 0;
  var mapping = {};
  for (var i = 0; i < labels.length; i++) {
    let l = labels[i]
    mapping[l]=num;
    num+=0.5;
  }
  return  mapping
}

function createSlider(viewer,id,df,value){
d3.csv(df, function(data) {
var myGroups = d3.map(data, function(d){return d.Col;}).keys();
var myVars = d3.map(data, function(d){return d.Row;}).keys();
myGroups.sort()
myVars.sort()
xOverlayMap = mapToIntOverlay2(myGroups);
yOverlayMap = mapToIntOverlay2(myVars);
var valz = []
window.yOverlay = []
window.xOverlay = []
data.map(function(d){
  valz.push(d[value])
  window.yOverlay.push(d.Row)
  window.xOverlay.push(d.Col)
})
var valz = valz.map(Number)
window.currentLength = above.length

for (var i = 0; i < window.yOverlay.length; i++) {
  window.yOverlay[i] = window.yOverlayMap[window.yOverlay[i]]
}

for (var i = 0; i < window.xOverlay.length; i++) {
  window.xOverlay[i] = window.xOverlayMap[window.xOverlay[i]]
}
console.log(window.xOverlay)

var sliderSimple = d3
.sliderBottom()
.min(d3.min(valz))
.max(d3.max(valz))
.width(300)
.tickFormat(d3.format('.2'))
.ticks(5)
.default(d3.min(valz))
.on('onchange', function(val){
  window.above = []
  for (var i = 0; i < valz.length; i++) {
    if (valz[i]>=val) {
      window.above.push(i)
    }
  }
  var newL = above.length
  if(window.currentLength!=newL){

  viewer.raiseEvent('update-viewport')
  }
window.currentLength=newL
});

var gSimple = d3
.select("#" + id)
.append('svg')
.attr('width', 500)
.attr('height', 100)
.append('g')
.attr('transform', 'translate(30,30)');

gSimple.call(sliderSimple);
});

}


