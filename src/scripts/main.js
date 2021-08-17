import LocomotiveScroll from 'locomotive-scroll';
import Typed from 'typed.js';

function hasOverlap(rect1, rect2) {
    return !(rect1.right < rect2.left || rect1.left > rect2.right || rect1.bottom < rect2.top || rect1.top > rect2.bottom);
}
const clampNumber = (num, a, b) => Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b));
class Example {
    constructor(options) {
        this.root = options.root;
        this.depts = options.depts;
        this.currentSlide = 0;
        this.maxSlide = 6;
        this.init();
    }

    init() {
        this.scroll = new LocomotiveScroll({
            el: this.root,
            direction: 'horizontal',
            smooth: true,
            repeat: true,
            reloadOnContextChange: true,
            scrollFromAnywhere: true,
            touchMultiplier: 2,
            multiplier: 5,
            lerp: 0.05,
            smartphone: {
                smooth: false,
                breakpoint: 767,
            },
            tablet: {
                smooth: true,
                breakpoint: 1024,
            }
        });

        document.querySelector(".btn-prev").addEventListener("click", btn => {
            this.currentSlide = clampNumber(this.currentSlide - 1, 0, this.maxSlide - 3);
            const slide = this.depts[this.currentSlide];
            console.log(this.currentSlide);
            this.scroll.scrollTo(slide, { duration: 100 });
        });
        document.querySelector(".btn-next").addEventListener("click", btn => {
            this.currentSlide = clampNumber(this.currentSlide + 1, 0, this.maxSlide - 3);
            const slide = this.depts[this.currentSlide];
            console.log(this.currentSlide);
            this.scroll.scrollTo(slide, { duration: 100 });
        });
    }
}

function typewritterEffect() {
    var options = {
        strings: ['Over 400 Certification programs', 'Over 500 Million words translated', 'IT Service Partner for Vietnam ^1000'],
        typeSpeed: 30,
        onComplete: () => {
            const typewritterEl = document.getElementById("typewritter-wrapper");
            typewritterEl.classList.add("hide")
            setTimeout(() => {
                typewritterEl.remove();
            }, 400)
        }
    };

    var typed = new Typed('.typewritter-inner', options);
}


window.addEventListener('DOMContentLoaded', (event) => {
    const logo = document.querySelector(".logo > img");
    const navWrapper = document.querySelector(".nav-wrapper");
    let isNavOpen = false;
    const depts = document.querySelectorAll(".dept-item");

    typewritterEffect();

    const example = new Example({
        root: document.querySelector('.scroll-animations-example'),
        depts,
    });

    document.querySelectorAll(".btn-main-menu-open, .btn-main-menu-close").forEach(btn => {
        btn.addEventListener("click", event => {
            isNavOpen != isNavOpen;
            navWrapper.classList.toggle("open");
            navWrapper.classList.toggle("close");
        });
    });

    depts.forEach(dept => {
        dept.addEventListener("mouseenter", (event) => {
            const elem = event.target;
            depts[0].classList.remove("selected");
            if (elem.classList.contains("dept-item")) {
                const rect1 = logo.getBoundingClientRect();
                const rect2 = elem.getBoundingClientRect();
                const isOverlap = hasOverlap(rect1, rect2);
                if (isOverlap) {
                    logo.classList.add("white-logo");
                }
                else {
                    logo.classList.remove("white-logo");
                }
            }
        });
        dept.addEventListener("mouseout", (event) => {
            const elem = event.target;
            if (elem.classList.contains("dept-item")) {
                const rect1 = logo.getBoundingClientRect();
                const rect2 = elem.getBoundingClientRect();
                const isOverlap = hasOverlap(rect1, rect2);
                if (isOverlap) {
                    logo.classList.remove("white-logo");
                }
            }
        });
    });



});
