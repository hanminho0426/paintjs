const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");


const INIIAL_COLOR = "#2c2c2c"
const CANVAS_SIZE = "700"

canvas.width = CANVAS_SIZE //pixel modifier 픽셀사이즈 주기
canvas.height = CANVAS_SIZE

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INIIAL_COLOR; //선 색지정 기본색상 지정
ctx.fillStyle = INIIAL_COLOR;
ctx.lineWidth = 2.5; //선 두께 지정

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if(!painting) { //!false (true)를 의미하면서 아래 실행문 실행
    ctx.beginPath(); //경로생성
    ctx.moveTo(x, y); //선 시작좌표
  } else {
    ctx.lineTo(x, y);  //선 끝좌표
    ctx.stroke(); //선 그리기
  }
}

function handleColorClick(event){
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event){
  const size = event.target.value;
  ctx.lineWidth = size; 
}

function handleModeClick(){
 if(filling === true){
   filling = false;
   mode.innerText = "Fill"
 }else {
   filling = true;
   mode.innerText = "paint";
   ctx.fillStyle = ctx.strokeStyle;
 }
}

function handleCanvasClick(){
  if(filling){
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleCM(event){
  event.preventDefault
}

function handleSaveClick() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS";
  link.click();
}


if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color => //배열을 대표하는 이름일뿐 다른 이름명을 사용하여도 상관없다.
  color.addEventListener("click", handleColorClick)
  );

if(range) {
  range.addEventListener("input", handleRangeChange);
}

if(mode){
  mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}