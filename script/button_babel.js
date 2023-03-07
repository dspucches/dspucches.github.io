//https://webdesign.tutsplus.com/tutorials/how-to-build-a-shifting-underline-hover-effect-with-css-and-javascript--cms-28510

(function() {

const target = document.querySelector(".target");
const links = document.querySelectorAll(".mynav a");
const colors = ["deepskyblue", "orange", "firebrick", "gold", "magenta", "black", "darkblue"];
  
for (let i = 0; i < links.length; i++) {
  links[i].addEventListener("click", (e) => e.preventDefault());
  links[i].addEventListener("mouseenter", mouseenterFunc);
}
  
function mouseenterFunc() {
  for (let i = 0; i < links.length; i++) {
    if (links[i].parentNode.classList.contains("active")) {
      links[i].parentNode.classList.remove("active");
    }
    links[i].style.opacity = "0.25";
  }
  
  this.parentNode.classList.add("active");
  this.style.opacity = "1";
  
  const width = this.getBoundingClientRect().width;
  const height = this.getBoundingClientRect().height;
  const left = this.getBoundingClientRect().left;
  const top = this.getBoundingClientRect().top;
  const color = colors[Math.floor(Math.random() * colors.length)];
  target.style.width = `${width}px`;
  target.style.height = `${height}px`;
  target.style.left = `${left}px`;
  target.style.top = `${top}px`;
  target.style.borderColor = color;
  target.style.transform = "none";
}
  

function resizeFunc() {
  const active = document.querySelector(".mynav li.active");
  
  if (active) {
    const left = active.getBoundingClientRect().left + window.pageXOffset;
    const top = active.getBoundingClientRect().top + window.pageYOffset;
    target.style.left = `${left}px`;
    target.style.top = `${top}px`;
  }
}

window.addEventListener("resize", resizeFunc);

})();
