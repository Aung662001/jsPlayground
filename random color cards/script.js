const refreshBtn = document.querySelector(".refresh-btn");
const container = document.querySelector(".container");
const time = document.querySelector(".time");
const generatePlates = () => {
  container.innerHTML = "";
  for (let index = 0; index < 21; index++) {
    //generate random color
    let color = Math.floor(Math.random() * 0xffffff).toString(16);
    let hexColor = `#${color.padStart(6, "0")}`;
    //create element and appent to screen
    const colorDiv = document.createElement("li");
    colorDiv.classList.add("color");
    colorDiv.innerHTML = ` <div class="react-box" style="background-color:${hexColor} ;"></div>
    <span class="hex-value">${hexColor}</span>`;
    colorDiv.addEventListener("click", () => {
      copyColor(colorDiv, hexColor);
    });
    container.append(colorDiv);
  }
};
generatePlates();
setInterval(() => {
  generatePlates();
}, 1000 * 10);
const copyColor = (element, color) => {
  const colorElem = element.querySelector(".hex-value");
  navigator.clipboard.writeText(color).then(() => {
    colorElem.innerText = "Copied";
    colorElem.style.textTransform = "none";
    setTimeout(() => {
      colorElem.style.textTransform = "uppercase";
      colorElem.innerText = color;
    }, 1000);
  });
};
let timeText = 10;
setInterval(() => {
  timeText = timeText - 1;
  time.innerText = timeText;
  if (timeText <= 0) {
    timeText = 10;
  }
}, 1000);
refreshBtn.addEventListener("click", generatePlates);
