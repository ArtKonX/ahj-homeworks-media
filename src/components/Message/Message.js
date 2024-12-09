import "./message.css";
import Li from "../ui/Li/Li";
import Span from "../ui/Span/Span";
import Time from "../ui/Time/Time";
import Paragraph from "../ui/Paragraph/Paragraph";

export default class Message {
  constructor(parentEl, messData) {
    this.parentEl = parentEl;
    this.messData = messData;
  }

  bindToDOM() {
    this.li = new Li({ class: "message-elem" }).element;
    const messTime = new Time({
      class: "message-time",
      dateCreated: this.messData.dateCreated,
    }).element;
    const message = new Paragraph({
      class: "message",
      text: this.messData.message,
    }).element;
    const coordinates = new Span({
      class: "coordinates",
      text: `[${this.messData.coordinates.lat}, ${this.messData.coordinates.long}]`,
    }).element;

    this.li.append(messTime, message, coordinates);
    this.parentEl.appendChild(this.li);
  }
}
