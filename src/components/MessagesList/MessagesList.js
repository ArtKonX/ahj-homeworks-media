import "./messagesList.css";

import Message from "../Message/Message";
import Div from "../ui/Div/Div";

export default class MessagesList {
  constructor(parentEl, messData) {
    this.parentEl = parentEl;
    this.messData = messData;
  }

  bindToDOM() {
    const messagesListContainer = new Div({ class: "messages-list-container" })
      .element;
    this.messagesList = document.createElement("ul");
    this.messagesList.classList.add("messages-list");

    if (this.messData.data) {
      this.messData.data["messages"].forEach((message) => {
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
      coordinates: data.coordinates,
    });
    message.bindToDOM();
  }
}
