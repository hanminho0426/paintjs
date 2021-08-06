const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

ctx.strokeStyle = "#2c2c2c"; //선 색지정
ctx.lineWidth = 2.5; //선 두께 지정

canvas.width = document.getElementsByClassName("canvas")[0].offsetWidth; //pixel modifier 픽셀사이즈 주기
canvas.height = document.getElementsByClassName("canvas")[0].offsetHeight;

let painting = false;

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

function onMouseDown(event) {
  painting = true;
}


if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
}