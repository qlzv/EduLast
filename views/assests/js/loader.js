function fadeOutEffect() {
var fadeTarget = document.getElementById("preloader");
var fadeEffect = setInterval(function () {
if (!fadeTarget.style.opacity) {
fadeTarget.style.opacity = 1;
}
if (fadeTarget.style.opacity > 0) {
fadeTarget.style.opacity -= 0.1;
} else {
clearInterval(fadeEffect);
fadeTarget.parentNode.removeChild(fadeTarget);
}
}, 35);
}

(function () {
"use strict";

const select = (el, all = false) => {
el = el.trim()
if (all) {
return [...document.querySelectorAll(el)]
} else {
return document.querySelector(el)
}
}
const removePreloader = () => fadeOutEffect()
let preloader = select("#preloader");
if (preloader) {
window.addEventListener("load", () => setTimeout(removePreloader, 400));
}
})();
