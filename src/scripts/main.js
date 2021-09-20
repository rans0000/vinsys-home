import LocomotiveScroll from 'locomotive-scroll';
import Typed from 'typed.js';

let global_current_slide = 1;

function hasOverlap(rect1, rect2) {
    return !(rect1.right < rect2.left || rect1.left > rect2.right || rect1.bottom < rect2.top || rect1.top > rect2.bottom);
}
const clampNumber = (num, a, b) => Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b));
class Example {
    constructor(options) {
        this.root = options.root;
        this.depts = options.depts;
        global_current_slide = options.global_current_slide;
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
            multiplier: 2,
            lerp: 0.07,
            smartphone: {
                smooth: true,
                breakpoint: 767,
                direction: 'vertical',
            },
            tablet: {
                smooth: true,
                breakpoint: 768,
                direction: 'horizontal',
                horizontalGesture: 'horizontal',
            }
        });
        window.dispatchEvent(new Event('resize'));

        document.querySelector(".btn-prev").addEventListener("click", btn => {
            const vw = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            // let sliderOffset = vw < 900 ? 2 : 3;
            let sliderOffset = 1;
            global_current_slide = clampNumber(global_current_slide - 1, 0, this.maxSlide - sliderOffset);
            const slide = this.depts[global_current_slide];
            // console.log(global_current_slide);
            this.scroll.scrollTo(slide, { duration: 50 });
            this.depts.forEach(item => item === slide ? item.classList.add("selected") : item.classList.remove("selected"));
        });
        document.querySelector(".btn-next").addEventListener("click", btn => {
            const vw = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            // let sliderOffset = vw < 900 ? 2 : 3;
            let sliderOffset = 1;
            global_current_slide = clampNumber(global_current_slide + 1, 0, this.maxSlide - sliderOffset);
            const slide = this.depts[global_current_slide];
            // console.log(global_current_slide);
            this.scroll.scrollTo(slide, { duration: 50 });
            this.depts.forEach(item => item === slide ? item.classList.add("selected") : item.classList.remove("selected"));
        });
    }
}

function typewritterEffect() {
    const typewritterEl = document.getElementById("typewritter-wrapper");
    const delay = 1000;

    var options = {
        strings: [`Delivering skills, Driving success ^${delay}`, `25 years of Legacy of Commitment ^${delay}`, `Trusted learning &amp; tech partner of Fortune&nbsp;500 ^${delay}`],
        typeSpeed: 7,
        backDelay: 300,

        loop: false,
        onTypingResumed: (arrayPos, self) => {
            self.el.classList.remove("end");
        },
        onTypingPaused: (arrayPos, self) => {
            self.el.classList.add("end");
        },
        onComplete: () => {
            typewritterEl.classList.add("hide")
            setTimeout(() => {
                window.removeEventListener("keydown", removeEscListener)
                typewritterEl.removeEventListener("click", removeEscListener)
                typewritterEl.remove();
            }, 400)
        }
    };

    var typed = new Typed('.typewritter-inner', options);
    // set esc event listener
    window.addEventListener("keydown", removeEscListener);
    typewritterEl.addEventListener("click", removeEscListener);

    function removeEscListener(event) {
        let evt = event || window.event;
        let isEscape = false;
        if ("key" in evt) {
            isEscape = (evt.key === "Escape" || evt.key === "Esc");
        } else {
            isEscape = (evt.keyCode === 27);
        }
        if (isEscape || evt.detail >= 1) {
            typewritterEl.classList.add("hide")
        }
    }
}


window.addEventListener('DOMContentLoaded', (event) => {
    const logo = document.querySelector(".logo > img");
    const navWrapper = document.querySelector(".nav-wrapper");
    const depts = document.querySelectorAll(".dept-item");
    const btn_open = document.querySelector(".btn-main-menu-open");
    let isNavOpen = false;

    typewritterEffect();

    const example = new Example({
        root: document.querySelector('.scroll-animations-example'),
        global_current_slide,
        depts,
    });

    document.querySelectorAll(".btn-main-menu-open, .btn-main-menu-close").forEach(btn => {
        btn.addEventListener("click", event => {
            isNavOpen != isNavOpen;
            navWrapper.classList.toggle("open");
            navWrapper.classList.toggle("close");
        });
    });

    depts.forEach((dept, slideIndex) => {
        dept.addEventListener("mouseenter", event => {
            const elem = event.target;
            // depts[0].classList.remove("selected");
            btn_open.classList.remove("white-btn");
            if (elem.classList.contains("dept-item")) {
                depts.forEach(item => item === elem ? item.classList.add("selected") : item.classList.remove("selected"));

                const rect1 = logo.getBoundingClientRect();
                const rect2 = elem.getBoundingClientRect();
                const rect3 = btn_open.getBoundingClientRect();
                const isLogoOverlap = hasOverlap(rect1, rect2);
                const isBtnOverlap = hasOverlap(rect3, rect2);
                console.log(slideIndex);
                global_current_slide = slideIndex;
                isLogoOverlap ? logo.classList.add("white-logo") : logo.classList.remove("white-logo");
                if (isBtnOverlap) { btn_open.classList.add("white-btn") };
            }
        });
        dept.addEventListener("mouseout", event => {
            const elem = event.target;
            if (elem.classList.contains("dept-item")) {
                const rect1 = logo.getBoundingClientRect();
                const rect2 = elem.getBoundingClientRect();
                const rect3 = btn_open.getBoundingClientRect();
                const isLogoOverlap = hasOverlap(rect1, rect2);
                const isBtnOverlap = hasOverlap(rect3, rect2);
                global_current_slide = slideIndex;
                if (isLogoOverlap) {
                    logo.classList.remove("white-logo");
                }
            }
        });
    });
});
