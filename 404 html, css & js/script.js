const cursor = document.querySelector('.cursor');
    const cursorEffect = document.querySelectorAll('.cursor-effect');
const section1 = document.querySelector('.section-1');
    const seeConsole = section1.querySelector('p');
const consoleLog = document.querySelector('.console-log');
    const staticText = consoleLog.querySelector('.static-text');
    const dynamicText = consoleLog.querySelector('.dynamic-text');
    const hrefText = consoleLog.querySelector('.href-text');
        const href = hrefText.querySelector('a');


let vw = window.innerWidth;
let vh = window.innerHeight;
window.addEventListener('resize', () => { vw = window.innerWidth; vh = window.innerHeight});
window.addEventListener('load', () => { window.scrollTo(0, 0) });


// follow cursor
function followCursor(e, element, size, delay) {
    let mouseX = e.clientX;
    let mouseY = e.clientY;
    setTimeout(() => {
        element.style.left = `${mouseX-size/2}px`,
        element.style.top = `${mouseY-size/2}px`;
    }, delay);
}
    // cursor pointing
for(let i = 0; i < cursorEffect.length; i++) {
    cursorEffect[i].addEventListener('mouseenter', () => {
        cursor.style.transform = `scale(10)`,
        cursor.style.background = `transparent`,
        cursor.style.boxShadow = `0 0 1px #ff0000`;
    });
    cursorEffect[i].addEventListener('mouseleave', () => {
        cursor.style.transform = `scale(1)`,
        cursor.style.background = `#fff`,
        cursor.style.boxShadow = `0 0 10px 5px #ff0000, 0 0 1px 1px #ff0000 inset`;
    });
}
// typing effect
function typingEffect(element, speed, delay) {
    setTimeout(() => {
        if(element.hasAttribute("data-typingEffect")) { return }
            element.setAttribute("data-typingEffect", true);
        let i = 0,
            texts = element.innerText.split(""),
            container = [];
        function addText() {
            if(i < texts.length) {
                container.push(texts[i]);
                i++;
                element.innerText = container.join("");
                setTimeout(addText, speed);
            }
        }
        addText();
    }, delay);
}
// mousemove parallax translate
function mouseParallaxTranslate(e, element, range) {
    let mouseX = (e.clientX - vw/2)/50;
    let mouseY = (e.clientY - vh/2)/50;
    element.style.transform = `translate(${mouseX*range}px, ${mouseY*range}px)`;
}
// background gradient effect
function backgroundGradientFollow(e, element, delay) {
    let mouseX = e.clientX;
    let mouseY = e.clientY;
    setTimeout(() => {
    element.style.background= `radial-gradient(circle at ${mouseX}px ${mouseY}px, #343434, var(--color-black1) 40%)`;
    }, delay);
}


window.addEventListener('mousemove', function(e) {
    followCursor(e, cursor, 10, 100);
    mouseParallaxTranslate(e, hrefText, 3);
    mouseParallaxTranslate(e, href, 1);
    backgroundGradientFollow(e, section1, 0);
});

seeConsole.addEventListener('click', function() {
    consoleLog.style.top = `30vh`;
    typingEffect(staticText, 50, 500);
    typingEffect(dynamicText, 75, 1000);
});
