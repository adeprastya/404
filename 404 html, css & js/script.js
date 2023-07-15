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
function followCursor(e, element, size, duration, timingFunctions) {
    const mouseX = e.clientX - size / 2;
    const mouseY = e.clientY - size / 2;
    element.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    element.style.transition = `transform ${duration}ms ${timingFunctions}`;
}
    // cursor pointing
cursorEffect.forEach(e => { 
    e.addEventListener('mouseenter', () => cursor.style.animation = `blink .3s both` );
    e.addEventListener('mouseleave', () => cursor.style.animation = `blink-reverse .3s both` );
});
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
    followCursor(e, cursor, 10, 100, "cubic-bezier(.67,.41,.89,1.64)");
    mouseParallaxTranslate(e, hrefText, 3);
    mouseParallaxTranslate(e, href, 1);
    backgroundGradientFollow(e, section1, 0);
});

seeConsole.addEventListener('click', function() {
    consoleLog.style.top = `30vh`;
    typingEffect(staticText, 50, 500);
    typingEffect(dynamicText, 75, 1000);
});
