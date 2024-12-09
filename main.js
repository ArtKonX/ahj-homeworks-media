/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

;// ./src/classes/TimelineState.js
class TimelineState {
  constructor() {
    this._state = {
      messages: [],
      coors: []
    };
  }
  get state() {
    return this._state;
  }
  init() {
    this.save();
  }
  save() {
    localStorage.setItem("data", JSON.stringify(this.state));
  }
  load() {
    if (localStorage.getItem("data")) {
      this.state["messages"] = JSON.parse(localStorage.getItem("data")).messages;
      this.state["coors"] = JSON.parse(localStorage.getItem("data")).coors;
      return this.state;
    }
  }
  addMess(mess) {
    this.state["messages"].push({
      dateCreated: mess.dateCreated,
      message: mess.message,
      coordinates: {
        lat: mess.coordinates.lat,
        long: mess.coordinates.long
      }
    });
  }
  addCoors(coordinates) {
    this.state["coors"].push({
      coordinates: {
        lat: coordinates.lat,
        long: coordinates.long
      }
    });
  }
  delCoords() {
    this.state["coors"] = [];
  }
}
;// ./src/components/ui/Div/Div.js

class Div {
  constructor(params) {
    this.params = params;
  }
  get element() {
    return this.createElement();
  }
  createElement() {
    const div = document.createElement("div");
    !Array.isArray(this.params.class) ? div.classList.add(this.params.class) : div.classList.add(...this.params.class);
    if (this.params.id) div.id = this.params.id;
    return div;
  }
}
;// ./src/components/ui/Input/Input.js

class Input {
  constructor(params) {
    this.params = params;
  }
  get element() {
    return this.createElement();
  }
  createElement() {
    const input = document.createElement("input");
    input.classList.add(this.params.class);
    if (this.params.id) input.id = this.params.id;
    if (this.params.name) input.name = this.params.name;
    if (this.params.placeholder) input.placeholder = this.params.placeholder;
    return input;
  }
}
;// ./src/components/ui/Li/Li.js

class Li {
  constructor(params) {
    this.params = params;
  }
  get element() {
    return this.createElement();
  }
  createElement() {
    const li = document.createElement("li");
    li.classList.add(this.params.class);
    return li;
  }
}
;// ./src/components/ui/Span/Span.js

class Span {
  constructor(params) {
    this.params = params;
  }
  get element() {
    return this.createElement();
  }
  createElement() {
    const span = document.createElement("span");
    span.classList.add(this.params.class);
    if (this.params.text) span.textContent = this.params.text;
    return span;
  }
}
;// ./src/components/ui/Time/Time.js

class Time {
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
;// ./src/components/ui/Paragraph/Paragraph.js

class Paragraph {
  constructor(params) {
    this.params = params;
  }
  get element() {
    return this.createElement();
  }
  createElement() {
    const p = document.createElement("p");
    !Array.isArray(this.params.class) ? p.classList.add(this.params.class) : p.classList.add(...this.params.class);
    if (this.params.text) p.textContent = this.params.text;
    return p;
  }
}
;// ./src/components/Message/Message.js





class Message {
  constructor(parentEl, messData) {
    this.parentEl = parentEl;
    this.messData = messData;
  }
  bindToDOM() {
    this.li = new Li({
      class: "message-elem"
    }).element;
    const messTime = new Time({
      class: "message-time",
      dateCreated: this.messData.dateCreated
    }).element;
    const message = new Paragraph({
      class: "message",
      text: this.messData.message
    }).element;
    const coordinates = new Span({
      class: "coordinates",
      text: `[${this.messData.coordinates.lat}, ${this.messData.coordinates.long}]`
    }).element;
    this.li.append(messTime, message, coordinates);
    this.parentEl.appendChild(this.li);
  }
}
;// ./src/components/MessagesList/MessagesList.js



class MessagesList {
  constructor(parentEl, messData) {
    this.parentEl = parentEl;
    this.messData = messData;
  }
  bindToDOM() {
    const messagesListContainer = new Div({
      class: "messages-list-container"
    }).element;
    this.messagesList = document.createElement("ul");
    this.messagesList.classList.add("messages-list");
    if (this.messData.data) {
      this.messData.data["messages"].forEach(message => {
        this.addMess(message);
      });
    }
    messagesListContainer.appendChild(this.messagesList);
    this.parentEl.appendChild(messagesListContainer);
  }
  addMess(data) {
    const message = new Message(this.messagesList, {
      dateCreated: data.dateCreated,
      message: data.message,
      coordinates: data.coordinates
    });
    message.bindToDOM();
  }
}
;// ./src/components/ui/Button/Button.js

class Button {
  constructor(params) {
    this.params = params;
  }
  get element() {
    return this.createElement();
  }
  createElement() {
    const btn = document.createElement("button");
    !Array.isArray(this.params.class) ? btn.classList.add(this.params.class) : btn.classList.add(...this.params.class);
    btn.innerHTML = this.params.text;
    btn.type = this.params.type;
    return btn;
  }
}
;// ./src/components/ui/Form/Form.js

class Form {
  constructor(params) {
    this.params = params;
  }
  get element() {
    return this.createElement();
  }
  createElement() {
    const form = document.createElement("form");
    !Array.isArray(this.params.class) ? form.classList.add(this.params.class) : form.classList.add(...this.params.class);
    return form;
  }
}
;// ./src/components/ui/Heading/Heading.js

class Heading {
  constructor(params) {
    this.params = params;
  }
  get element() {
    return this.createElement();
  }
  createElement() {
    const heading = document.createElement(`h${this.getLevel()}`);
    heading.classList.add(this.params.class);
    heading.textContent = this.params.text;
    return heading;
  }
  getLevel() {
    if (this.params.level in [1, 2, 3, 4, 5, 6]) return this.params.level;
    throw new Error("Вы указали не число или число не входящее в промежутке от 1 до 6");
  }
}
;// ./src/components/Modal/Modal.js







class Modal {
  constructor(parentEl) {
    this.parentEl = parentEl;
  }
  bindToDOM() {
    const modalContainer = new Div({
      class: "modal-container"
    }).element;
    const modalTitle = new Heading({
      class: "modal-title",
      level: 1,
      text: "Что-то пошло не так"
    }).element;
    const modalTextUp = new Paragraph({
      class: "modal-text-up",
      text: "К сожалению, нам не удалось определить ваше местоположение, пожалуйста, дайте разрешение на использование геолокации, либо введите координаты вручную."
    }).element;
    const modalTextDown = new Paragraph({
      class: "modal-text-down",
      text: "Широта и долгота через запятую"
    }).element;
    const modalForm = new Form({
      class: "modal-form"
    }).element;
    const modalInput = new Input({
      class: "modal-input",
      id: "modal-input",
      type: "text",
      name: "coors"
    }).element;
    const btnsContainer = new Div({
      class: "btns-container"
    }).element;
    const modalBtnSubmit = new Button({
      class: "modal-btn-submit",
      text: "Ok",
      type: "submit"
    }).element;
    const modalBtnExit = new Button({
      class: "modal-btn-close",
      text: "Отмена"
    }).element;
    btnsContainer.append(modalBtnSubmit, modalBtnExit);
    modalContainer.append(modalTitle, modalTextUp, modalTextDown, modalForm);
    modalForm.append(modalInput, btnsContainer);
    this.parentEl.appendChild(modalContainer);
  }
}
;// ./src/components/ui/Tooltip/Tooltip.js



class Tooltip {
  constructor(params) {
    this.params = params;
  }
  get element() {
    return this.createElement();
  }
  createElement() {
    const tooltipPopover = new Div({
      class: [this.params.class, this.params.class + "--top"]
    }).element;
    const tooltipArrow = new Div({
      class: "arrow"
    }).element;
    const tooltipHeading = new Heading({
      class: "tooltip-header",
      level: 3,
      text: this.params.title
    }).element;
    tooltipPopover.role = "tooltip";
    tooltipPopover.id = this.params.id;
    tooltipPopover.append(tooltipHeading, tooltipArrow);
    return {
      tooltipPopover,
      tooltipArrow
    };
  }
}
;// ./src/utils/setPositionTooltip.js
function setPositionTooltip(parent, tooltip, tooltipArrow) {
  const {
    top,
    left
  } = parent.getBoundingClientRect();
  tooltip.style.left = left + parent.offsetWidth / 2 - tooltip.offsetWidth / 2 + "px";
  tooltip.style.top = top - tooltip.offsetHeight + tooltipArrow.offsetHeight - 8 + "px";
  tooltipArrow.style.left = tooltip.offsetWidth / 2 - tooltipArrow.offsetWidth / 2 + "px";
}
;// ./src/components/widget-tooltip/WidgetTooltip.js


class WidgetTooltip {
  constructor(form) {
    this.form = form;
    this._tooltips = [];
  }
  get tooltips() {
    return this._tooltips;
  }
  getId() {
    return performance.now() + Math.random(1000);
  }
  pushTooltip(tooltip, id) {
    this.tooltips.push({
      id,
      tooltip
    });
  }
  removeTooltip(id) {
    const removeEl = this.tooltips.find(el => id === el.id);
    if (removeEl) {
      removeEl.tooltip.remove();
      this.form.removeAttribute("aria-describedby");
      this.tooltips.filter(el => id !== el.id);
    }
  }
  actionTooltip(text) {
    this.showTooltip(text);
    const tooltips = document.querySelectorAll(".tooltip");
    if (tooltips.length > 1) {
      tooltips.forEach((el, indx) => {
        if (indx != tooltips.length - 1) {
          el.remove();
        }
      });
    }
    setTimeout(() => {
      const attrForm = this.form.getAttribute("aria-describedby");
      console.log(attrForm);
      this.removeTooltip(attrForm);
    }, 5000);
  }
  showTooltip(text) {
    const id = "tooltip" + this.getId();
    this.tooltip = new Tooltip({
      class: "tooltip",
      title: text,
      id: id
    }).element;
    this.pushTooltip(this.tooltip.tooltipPopover, id);
    document.body.appendChild(this.tooltip.tooltipPopover);
    setPositionTooltip(this.form, this.tooltip.tooltipPopover, this.tooltip.tooltipArrow);
    this.form.setAttribute("aria-describedby", id);
    return id;
  }
}
;// ./src/utils/validator.js
function validator(coords) {
  const coordsList = coords.replace("[", "").replace("]", "").trim().split(",");
  const res = /^(\[)?(\d+\.?\d+)\s?,\s?(-|−)?(\d+\.?\d+)(\])?$/.test(coords);
  if (res && parseFloat(coordsList[0]) && parseFloat(coordsList[1])) {
    return {
      lat: parseFloat(coordsList[0]),
      long: parseFloat(coordsList[1])
    };
  }
  throw new Error("Неверные координаты:(");
}
;// ./src/components/Timeline/Timeline.js







class Timeline {
  constructor(parentEl, timelineState) {
    this.parentEl = parentEl;
    this.timelineState = timelineState;
    this.onEnterSendMessage = this.onEnterSendMessage.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClose = this.onClose.bind(this);
    this.delCoors = this.delCoors.bind(this);
  }
  bindToDOM() {
    this.timelineState.init();
    this.container = new Div({
      class: "container"
    }).element;
    this.inputBtnDel = new Div({
      class: "input-btn-del"
    }).element;
    this.input = new Input({
      class: "timeline-message-input",
      id: "timeline-input",
      placeholder: "Введите ваше сообщение..."
    }).element;
    this.btnDelCoors = new Button({
      class: "btn-del-coors",
      text: "Удалить координаты!",
      type: "button"
    }).element;
    this.inputBtnDel.append(this.input, this.btnDelCoors);
    this.parentEl.appendChild(this.container);
    this.messagesList = new MessagesList(this.container, {
      data: this.timelineState.load()
    });
    this.messagesList.bindToDOM();
    this.container.appendChild(this.inputBtnDel);
    if (!document.querySelector(".modal-container")) {
      this.input.addEventListener("keyup", e => {
        if (e.code === "Enter") {
          this.onEnterSendMessage(e);
        }
      });
    }
    this.btnDelCoors.addEventListener("click", this.delCoors);
  }
  delCoors(e) {
    e.preventDefault();
    this.coordinates = null;
    this.timelineState.delCoords();
    this.timelineState.save();
  }
  onEnterSendMessage(e) {
    e.preventDefault();
    this.message = e.target.value;
    if (!this.message) return;
    this.getCoordinates().then(coordinates => {
      this.coordinates = coordinates;
      if (this.coordinates) {
        this.actionsMessage({
          message: this.message,
          coordinates: {
            lat: this.coordinates.latitude,
            long: this.coordinates.longitude
          }
        });
      }
    }).catch(err => {
      err && console.error(err);
    });
    e.target.value = "";
  }
  getCoordinates() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          if (!this.timelineState.load().coors.length) {
            const {
              longitude,
              latitude
            } = position.coords;
            this.timelineState.addCoors({
              lat: latitude,
              long: longitude
            });
            this.timelineState.save();
            resolve({
              longitude,
              latitude
            });
          } else if (this.timelineState.load().coors.length > 0) {
            resolve({
              longitude: this.timelineState.load().coors[0].coordinates.long,
              latitude: this.timelineState.load().coors[0].coordinates.lat
            });
          }
        }, err => {
          if (!this.timelineState.load().coors.length) {
            const modal = new Modal(document.querySelector("body"));
            modal.bindToDOM();
            this.modalСontainer = document.querySelector(".modal-container");
            setTimeout(() => {
              this.modalСontainer.style.transform = "translateY(10vh)";
            }, 550);
            this.modalForm = document.querySelector(".modal-form");
            const modalBtnClose = this.modalСontainer.querySelector(".modal-btn-close");
            this.modalForm.addEventListener("submit", this.onSubmit);
            modalBtnClose.addEventListener("click", this.onClose);
            reject(err);
          } else if (this.timelineState.load().coors.length > 0) {
            this.actionsMessage({
              message: this.message,
              coordinates: {
                lat: this.timelineState.load().coors[0].coordinates.lat,
                long: this.timelineState.load().coors[0].coordinates.long
              }
            });
          }
        });
      }
    });
  }
  actionsMessage(data) {
    const date = new Date();
    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "2-digit",
      month: "2-digit",
      year: "2-digit"
    };
    const message = {
      dateCreated: date.toLocaleDateString([], options).replace(",", " "),
      message: data.message,
      coordinates: data.coordinates
    };
    this.messagesList.addMess(message);
    this.timelineState.addMess(message);
    this.timelineState.save();
  }
  onClose(e) {
    e.preventDefault();
    if (document.querySelector(".tooltip")) {
      document.querySelector(".tooltip").remove();
    }
    this.modalСontainer.style.transform = "translateY(-100vh)";
    setTimeout(() => {
      this.modalСontainer.remove();
    }, 500);
  }
  onSubmit(e) {
    e.preventDefault();
    if (!this.message) return;
    try {
      const {
        lat,
        long
      } = validator(e.target.coors.value);
      this.timelineState.addCoors({
        lat,
        long
      });
      this.timelineState.save();
      this.actionsMessage({
        message: this.message,
        coordinates: {
          lat,
          long
        }
      });
      if (document.querySelector(".tooltip")) {
        document.querySelector(".tooltip").remove();
      }
      this.modalСontainer.style.transform = "translateY(-100vh)";
      setTimeout(() => {
        this.modalСontainer.remove();
      }, 500);
    } catch (err) {
      console.error(err);
      const tooltip = new WidgetTooltip(e.target);
      tooltip.actionTooltip("Неверные координаты:(");
      e.target.coors.value = "";
    }
  }
}
;// ./src/js/app.js


document.addEventListener("DOMContentLoaded", () => {
  const timeline = new Timeline(document.querySelector("#app"), new TimelineState());
  timeline.bindToDOM();
});
;// ./src/index.js


/******/ })()
;