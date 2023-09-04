import Slide from "./Slide.js";
export default class Slider {
  #img;
  #title;
  #dots;
  #time;
  #active;
  #slides;
  #indexInterval;
  constructor(slideList, imgSelector, textSelector, dotsSelector, time = 3000, active = 0) {
    this.#img = document.querySelector(imgSelector);
    this.#title = document.querySelector(textSelector);
    this.#dots = [...document.querySelectorAll(dotsSelector)];
    this.#time = time;
    this.#active = active;
    this.#slides = [];
    this.#indexInterval = null;

    window.addEventListener("keydown", (e) => this.#keyChangeSlide(e));

    for (const slide of slideList) {
      this.#addSlide(new Slide(slide.img, slide.text));
    }
  }
  #addSlide(slide) {
    this.#slides.push(slide);
  }

  start() {
    this.#indexInterval = setInterval(() => this.#changeSlide(), this.#time);
  }

  #changeDot() {
    const activeDot = this.#dots.findIndex((dot) => dot.classList.contains("active"));
    this.#dots[activeDot].classList.remove("active");
    this.#dots[this.#active].classList.add("active");
  }
  #changeSlide() {
    this.#active++;
    if (this.#active === this.#slides.length) {
      this.#active = 0;
    }
    this.#img.src = this.#slides[this.#active].img;
    this.#title.textContent = this.#slides[this.#active].text;
    this.#changeDot();
  }

  #keyChangeSlide(e) {
    if (e.keyCode == 37 || e.keyCode == 39) {
      clearInterval(this.#indexInterval);
      e.keyCode == 37 ? this.#active-- : this.#active++;
      if (this.#active === this.#slides.length) {
        this.#active = 0;
      } else if (this.#active < 0) {
        this.#active = this.#slides.length - 1;
      }
      this.#img.src = this.#slides[this.#active].img;
      this.#title.textContent = this.#slides[this.#active].text;
      this.#changeDot();
      this.start();
    }
  }
}
