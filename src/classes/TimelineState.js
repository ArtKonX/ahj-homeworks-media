export default class TimelineState {
  constructor() {
    this._state = { messages: [], coors: [] };
  }

  get state() {
    return this._state;
  }

  save() {
    localStorage.setItem("data", JSON.stringify(this.state));
  }

  load() {
    if (localStorage.getItem("data")) {
      this.state["messages"] = JSON.parse(
        localStorage.getItem("data"),
      ).messages;
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
        long: mess.coordinates.long,
      },
    });
  }

  addCoors(coordinates) {
    this.state["coors"].push({
      coordinates: {
        lat: coordinates.lat,
        long: coordinates.long,
      },
    });
  }

  delCoords() {
    this.state["coors"] = [];
  }
}
