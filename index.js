const gui = new dat.GUI();
let canvas = document.getElementById("canvas");
canvas.style.backgroundColor = "rgba(0,0,0,1)";

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

var c = canvas.getContext("2d");

function randomInt(min,max){
    return Math.floor((Math.random() * (max-min+1)) + min); 
}
const colorArray = ["#363432","#196774","#90A19D","#F0941F","#EF6024"];
function randomColor(colorArray){
    var x = Math.floor(Math.random()*colorArray.length);
    return colorArray[x];
};
window.addEventListener('resize',function(){
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    animate();
})
$("body").on("click",function(){
    console.log("hi");
    animate();
})
function getDistance(x1,y1,x2,y2){
    var xDistance = x2-x1;
    var yDistance = y2-y1;
    return Math.sqrt(Math.pow(xDistance,2)+Math.pow(yDistance,2));
}
var mouse = {
    x:innerWidth/2,
    y:innerHeight/2
}
window.addEventListener('mousemove',function(event){
    mouse.x = event.x;
    mouse.y = event.y;
})

const properties = {
    y : canvas.height/2,
    omega : 0.01,
    amplitude : 200,
    frequency : 0.01
}
const waveFolder = gui.addFolder("Properties");
waveFolder.add(properties,'y',0,innerHeight);
waveFolder.add(properties,'omega',-0.01,0.01);
waveFolder.add(properties,'amplitude',-200,200);
waveFolder.add(properties,'frequency',-0.02,0.02);
waveFolder.open();

// const strokeColor = {
//     r : 255,
//     g : 0,
//     b : 0,
//     a : 1
// }
// const colorFolder = gui.addFolder("Color");
// colorFolder.add(strokeColor,'r',0,255);
// colorFolder.add(strokeColor,'g',0,255);
// colorFolder.add(strokeColor,'b',0,255);
// colorFolder.add(strokeColor,'a',0,1);
// colorFolder.open();
const strokeColor = {
    h : 100,
    s : 75,
    l : 50,
}
const colorFolder = gui.addFolder("Color");
colorFolder.add(strokeColor,'h',0,255);
colorFolder.add(strokeColor,'s',0,100);
colorFolder.add(strokeColor,'l',0,100);
colorFolder.open();

const backgroundColor = {
    r : 0,
    g : 0,
    b : 0,
    a : 0.01
}
const bgColorFolder = gui.addFolder("bgColor");
bgColorFolder.add(backgroundColor,'r',0,255);
bgColorFolder.add(backgroundColor,'g',0,255);
bgColorFolder.add(backgroundColor,'b',0,255);
bgColorFolder.add(backgroundColor,'a',0,0.05);

let increment = properties.frequency;
function animate(){
    c.fillStyle = `rgba(${backgroundColor.r},${backgroundColor.g},${backgroundColor.b},${backgroundColor.a})`;
    c.fillRect(0,0,innerWidth,innerHeight);
    c.beginPath();
    for(let i=0;i<innerWidth;i++){
        c.lineTo(i,properties.y+Math.sin(i*properties.omega+increment)*properties.amplitude*Math.sin(increment));
    }
    increment += properties.frequency;
    //Color in rgb
    // c.strokeStyle = `rgba(${strokeColor.r*Math.abs(Math.sin(increment))},${strokeColor.g},${strokeColor.b},${strokeColor.a})`;
    //color in hsl
    c.strokeStyle = `hsl(${strokeColor.h*Math.abs(Math.sin(increment))},${strokeColor.s}%,${strokeColor.l}%)`;
    c.stroke();
    requestAnimationFrame(animate);
}
animate();


