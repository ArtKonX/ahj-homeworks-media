import TimelineState from "../classes/TimelineState";
import Timeline from "../components/Timeline/Timeline";

document.addEventListener("DOMContentLoaded", () => {
  const timeline = new Timeline(
    document.querySelector("#app"),
    new TimelineState(),
  );
  timeline.bindToDOM();
});
