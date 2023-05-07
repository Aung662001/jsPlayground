const coursel = document.querySelector(".coursel");
const icons = document.querySelectorAll(".wrapper i");
const img = document.querySelectorAll("img")[2];

const width = img.clientWidth + 10;
console.log(width);
icons.forEach((i) => {
  i.addEventListener("click", () => {
    coursel.scrollLeft += i.id === "left" ? -width : width;
    showHideIcons();
  });
});

let dragging = false,
  prePageX,
  preScrollLeft,
  positionDiff;

const dragStart = (e) => {
  e.preventDefault();
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
coursel.addEventListener("mouseup", dragStop);
// coursel.addEventListener("mouseleave", dragStop);

const autoSlide = () => {
  if (coursel.scrollLeft >= coursel.scrollWidth - coursel.clientWidth - 100)
    return;
  positionDiff = Math.abs(positionDiff);
  const neededValue = width - positionDiff;
  if (coursel.scrollLeft > preScrollLeft) {
    // console.log(positionDiff, width / 3);
    return (coursel.scrollLeft +=
      positionDiff > width / 3 ? neededValue : -positionDiff);
  } else {
    return (coursel.scrollLeft -=
      positionDiff > width / 3 ? neededValue : -positionDiff);
  }
};

const showHideIcons = () => {
  let avaiableScroll = coursel.scrollWidth - coursel.clientWidth;
  icons[1].style.display =
    coursel.scrollLeft >= avaiableScroll - 100 ? "none" : "block";
  icons[0].style.display = coursel.scrollLeft == 0 ? "none" : "block";
};
