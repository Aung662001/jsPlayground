const canvas = document.querySelector("#myCanvas"),
  ctx = canvas.getContext("2d");

const tool = document.querySelectorAll(".tool");
let prevMouseX, prevMouseY, snapShot;
selectedTool = "brush";
brushWidth = 5;
let isDrawing = false;
window.addEventListener("load", () => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
});

//when mouse start drawing
canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  prevMouseX = e.offsetX;
  prevMouseY = e.offsetY;
  ctx.beginPath(); //start with new location that start mouse click
  ctx.lineWidth = brushWidth; //default brush size
  snapShot = ctx.getImageData(0, 0, canvas.width, canvas.height);
});
canvas.addEventListener("mouseup", () => {
  isDrawing = false;
});
const drawing = (e) => {
  if (!isDrawing) return;
  ctx.putImageData(snapShot, 0, 0);
  if (selectedTool == "brush") {
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  } else if (selectedTool == "rectangle") {
    drawRect(e);
  }
};
canvas.addEventListener("mousemove", drawing);

// canvas.addEventListener("mouseenter", () => {
//   isDrawing = false;
// });

tool.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    document.querySelector(".options .active").classList.remove(".active");
    btn.classList.add("active");
    selectedTool = btn.id;
  });
});

const drawRect = (e) => {
  ctx.strokeRect(
    e.offsetX,
    e.offsetY,
    prevMouseX - e.offsetX,
    prevMouseY - e.offsetY
  );
};
