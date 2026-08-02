const ribbon = document.getElementById("ribbon");
const surprise = document.getElementById("surprise");
const music = document.getElementById("music");

let dragging = false;
let startY = 0;
let opened = false;

// ===============================
// OPEN SCROLL
// ===============================

function openScroll() {

    if (opened) return;

    opened = true;

gsap.to([".title", ".instruction", ".message"], {
    opacity: 0,
    duration: 0.5,
    y: -30,
    stagger: 0.1,
    onComplete: () => {
        document.querySelector(".title").style.display = "none";
        document.querySelector(".instruction").style.display = "none";
        document.querySelector(".message").style.display = "none";
    }
});
    // Ribbon moves down
    gsap.to(ribbon, {
        y: 120,
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => {

            ribbon.style.display = "none";

        }
    });

  
   gsap.to("#surprise", {
    top: "50%",
    left: "50%",
    xPercent: -50,
    yPercent: -50,
    scale: 1,
    opacity: 1,
    duration: 1,
    delay: 0.5,
    ease: "power2.out"
});

    // Confetti
    setTimeout(() => {

        confetti({

            particleCount: 250,
            spread: 180,
            origin: { y: 0.55 }

        });

    }, 1000);

    // Music
    if (music) {
        music.play().catch(() => {});
    }

}

// ===============================
// DESKTOP DRAG
// ===============================

ribbon.addEventListener("mousedown", (e) => {

    if (opened) return;

    dragging = true;

    startY = e.clientY;

});

document.addEventListener("mousemove", (e) => {

    if (!dragging || opened) return;

    let distance = e.clientY - startY;

    if (distance < 0) distance = 0;

    if (distance > 130) distance = 130;

    ribbon.style.transform =
        `translate(-50%, ${distance}px)`;

    if (distance >= 100) {

        dragging = false;

        openScroll();

    }

});

document.addEventListener("mouseup", () => {

    if (!dragging || opened) return;

    dragging = false;

    gsap.to(ribbon, {

        xPercent: -50,
        y: 0,
        duration: 0.3

    });

});

// ===============================
// MOBILE DRAG
// ===============================

ribbon.addEventListener("touchstart", (e) => {

    if (opened) return;

    dragging = true;

    startY = e.touches[0].clientY;

});

document.addEventListener("touchmove", (e) => {

    if (!dragging || opened) return;

    let distance = e.touches[0].clientY - startY;

    if (distance < 0) distance = 0;

    if (distance > 130) distance = 130;

    ribbon.style.transform =
        `translate(-50%, ${distance}px)`;

    if (distance >= 100) {

        dragging = false;

        openScroll();

    }

});

document.addEventListener("touchend", () => {

    if (!dragging || opened) return;

    dragging = false;

    gsap.to(ribbon, {

        xPercent: -50,
        y: 0,
        duration: 0.3

    });

});

// ===============================
// FLOATING HEARTS
// ===============================

function createHeart() {

    if (!opened) return;

    const heart = document.createElement("div");

    heart.innerHTML = "❤️";

    heart.style.position = "fixed";

    heart.style.left = Math.random() * 100 + "vw";

    heart.style.bottom = "-30px";

    heart.style.fontSize =
        (20 + Math.random() * 20) + "px";

    heart.style.pointerEvents = "none";

    heart.style.zIndex = "999";

    document.body.appendChild(heart);

    gsap.to(heart, {

        y: -window.innerHeight,

        x: (Math.random() - 0.5) * 200,

        rotation: Math.random() * 360,

        opacity: 0,

        duration: 5,

        ease: "none",

        onComplete: () => {

            heart.remove();

        }

    });

}

setInterval(createHeart, 350);