const coursel = document.querySelector(".coursel");
const icons = document.querySelectorAll(".wrapper i");
const img = document.querySelectorAll("img")[0];

const width = img.clientWidth + 10;
icons.forEach((i) => {
  i.addEventListener("click", () => {
    console.log(width);
    coursel.scrollLeft += i.id === "left" ? -width : width;
  });
});

let dragging = false,
  prePageX,
  preScrollLeft,
  positionDiff;

const dragStart = (e) => {
  prePageX = e.pageX;
  preScrollLeft = coursel.scrollLeft;
  dragging = true;
};
const dragStop = () => {
  coursel.classList.remove("dragged");
  autoSlide();

  dragging = false;
};
coursel.addEventListener("mousemove", drag);
function drag(e) {
  e.preventDefault();
  if (!dragging) return;
  coursel.classList.add("dragged");
  positionDiff = e.pageX - prePageX;
  coursel.scrollLeft = preScrollLeft - positionDiff;
}
coursel.addEventListener("mousedown", dragStart);
document.addEventListener("mouseup", dragStop);
// coursel.addEventListener("mouseleave", dragStop);

const autoSlide = () => {
  positionDiff = Math.abs(positionDiff);
  const neededValue = width - positionDiff;
  if (coursel.scrollLeft > preScrollLeft) {
    console.log("right");
    // console.log(positionDiff, width / 3);
    return (coursel.scrollLeft +=
      positionDiff > width / 3 ? neededValue : -positionDiff);
  } else {
    console.log("left");
    return (coursel.scrollLeft -=
      positionDiff > width / 3 ? neededValue : -positionDiff);
  }
};
