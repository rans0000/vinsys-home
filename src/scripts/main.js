import LocomotiveScroll from 'locomotive-scroll';

function hasOverlap(rect1, rect2) {
    return !(rect1.right < rect2.left || rect1.left > rect2.right || rect1.bottom < rect2.top || rect1.top > rect2.bottom);
}
const clampNumber = (num, a, b) => Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b));
class Example {
    constructor(options) {
        this.root = options.root;
        this.depts = options.depts;
        this.currentSlide = 0;
        this.maxSlide = 5;
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
                smooth: true,
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
            this.scroll.scrollTo(slide);
        });
        document.querySelector(".btn-next").addEventListener("click", btn => {
            this.currentSlide = clampNumber(this.currentSlide + 1, 0, this.maxSlide - 3);
            const slide = this.depts[this.currentSlide];
            console.log(this.currentSlide);
            this.scroll.scrollTo(slide);
        });


    }

}


window.addEventListener('DOMContentLoaded', (event) => {
    const logo = document.querySelector(".logo > img");
    const navWrapper = document.querySelector(".nav-wrapper");
    let isNavOpen = false;
    const depts = document.querySelectorAll(".dept-item");

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
            if (event.target.classList.contains("dept-item")) {
                const rect1 = logo.getBoundingClientRect();
                const rect2 = event.target.getBoundingClientRect();
                const isOverlap = hasOverlap(rect1, rect2);
                if (isOverlap) {
                    logo.classList.add("white-logo");
                }
            }
        });
        dept.addEventListener("mouseout", (event) => {
            if (event.target.classList.contains("dept-item")) {
                const rect1 = logo.getBoundingClientRect();
                const rect2 = event.target.getBoundingClientRect();
                const isOverlap = hasOverlap(rect1, rect2);
                if (isOverlap) {
                    logo.classList.remove("white-logo");
                }
            }
        });
    });



});
