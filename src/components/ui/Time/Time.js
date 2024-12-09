import "./time.css";

export default class Time {
  constructor(params) {
    this.params = params;
  }

  get element() {
    return this.createElement();
  }

  createElement() {
    const time = document.createElement("time");

    time.classList.add(this.params.class);
    time.textContent = this.params.dateCreated;

    return time;
  }
}
