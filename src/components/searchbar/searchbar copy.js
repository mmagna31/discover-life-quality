import Mustache, { render } from "mustache";
import template from "./template.html";
import "./style.css";

function renderSeachbar(containerID, inputID, buttonID) {
  const rendered = Mustache.render(template, {
    containerID,
    inputID,
    buttonID,
  });

  const parser = new DOMParser();
  const html = parser.parseFromString(rendered, "text/html");

  html.getElementById(containerID).classList.add("mtop150");
  // html.querySelector("h1").classList.add("mtop150");

  return html.body.children[0];
}

export default renderSeachbar;
