import "./modal.css";

import Button from "../ui/Button/Button";
import Div from "../ui/Div/Div";
import Form from "../ui/Form/Form";
import Heading from "../ui/Heading/Heading";
import Input from "../ui/Input/Input";
import Paragraph from "../ui/Paragraph/Paragraph";

export default class Modal {
  constructor(parentEl) {
    this.parentEl = parentEl;
  }

  bindToDOM() {
    const modalContainer = new Div({ class: "modal-container" }).element;
    const modalTitle = new Heading({
      class: "modal-title",
      level: 1,
      text: "Что-то пошло не так",
    }).element;
    const modalTextUp = new Paragraph({
      class: "modal-text-up",
      text: "К сожалению, нам не удалось определить ваше местоположение, пожалуйста, дайте разрешение на использование геолокации, либо введите координаты вручную.",
    }).element;
    const modalTextDown = new Paragraph({
      class: "modal-text-down",
      text: "Широта и долгота через запятую",
    }).element;
    const modalForm = new Form({ class: "modal-form" }).element;
    const modalInput = new Input({
      class: "modal-input",
      id: "modal-input",
      type: "text",
      name: "coors",
    }).element;
    const btnsContainer = new Div({ class: "btns-container" }).element;
    const modalBtnSubmit = new Button({
      class: "modal-btn-submit",
      text: "Ok",
      type: "submit",
    }).element;
    const modalBtnExit = new Button({
      class: "modal-btn-close",
      text: "Отмена",
    }).element;

    btnsContainer.append(modalBtnSubmit, modalBtnExit);

    modalContainer.append(modalTitle, modalTextUp, modalTextDown, modalForm);

    modalForm.append(modalInput, btnsContainer);
    this.parentEl.appendChild(modalContainer);
  }
}
