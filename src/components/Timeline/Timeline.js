import Div from "../ui/Div/Div";
import Input from "../ui/Input/Input";
import MessagesList from "../MessagesList/MessagesList";
import Modal from "../Modal/Modal";
import WidgetTooltip from "../widget-tooltip/WidgetTooltip";
import validator from "../../utils/validator";
import Button from "../ui/Button/Button";

export default class Timeline {
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

    this.container = new Div({ class: "container" }).element;
    this.inputBtnDel = new Div({ class: "input-btn-del" }).element;

    this.input = new Input({
      class: "timeline-message-input",
      id: "timeline-input",
      placeholder: "Введите ваше сообщение...",
    }).element;

    this.btnDelCoors = new Button({
      class: "btn-del-coors",
      text: "Удалить координаты!",
      type: "button",
    }).element;

    this.inputBtnDel.append(this.input, this.btnDelCoors);

    this.parentEl.appendChild(this.container);

    this.messagesList = new MessagesList(this.container, {
      data: this.timelineState.load(),
    });
    this.messagesList.bindToDOM();

    this.container.appendChild(this.inputBtnDel);

    if (!document.querySelector(".modal-container")) {
      this.input.addEventListener("keyup", (e) => {
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

    this.getCoordinates()
      .then((coordinates) => {
        this.coordinates = coordinates;

        if (this.coordinates) {
          this.actionsMessage({
            message: this.message,
            coordinates: {
              lat: this.coordinates.latitude,
              long: this.coordinates.longitude,
            },
          });
        }
      })
      .catch((err) => {
        err && console.error(err);
      });

    e.target.value = "";
  }

  getCoordinates() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            if (!this.timelineState.load().coors.length) {
              const { longitude, latitude } = position.coords;
              this.timelineState.addCoors({ lat: latitude, long: longitude });
              this.timelineState.save();
              resolve({ longitude, latitude });
            } else if (this.timelineState.load().coors.length > 0) {
              resolve({
                longitude: this.timelineState.load().coors[0].coordinates.long,
                latitude: this.timelineState.load().coors[0].coordinates.lat,
              });
            }
          },
          (err) => {
            if (!this.timelineState.load().coors.length) {
              const modal = new Modal(document.querySelector("body"));
              modal.bindToDOM();
              this.modalСontainer = document.querySelector(".modal-container");
              setTimeout(() => {
                this.modalСontainer.style.transform = "translateY(10vh)";
              }, 550);
              this.modalForm = document.querySelector(".modal-form");
              const modalBtnClose =
                this.modalСontainer.querySelector(".modal-btn-close");
              this.modalForm.addEventListener("submit", this.onSubmit);
              modalBtnClose.addEventListener("click", this.onClose);
              reject(err);
            } else if (this.timelineState.load().coors.length > 0) {
              this.actionsMessage({
                message: this.message,
                coordinates: {
                  lat: this.timelineState.load().coors[0].coordinates.lat,
                  long: this.timelineState.load().coors[0].coordinates.long,
                },
              });
            }
          },
        );
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
      year: "2-digit",
    };
    const message = {
      dateCreated: date.toLocaleDateString([], options).replace(",", " "),
      message: data.message,
      coordinates: data.coordinates,
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
      const { lat, long } = validator(e.target.coors.value);

      this.timelineState.addCoors({ lat, long });
      this.timelineState.save();

      this.actionsMessage({
        message: this.message,
        coordinates: {
          lat,
          long,
        },
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
