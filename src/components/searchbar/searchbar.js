import Mustache, { render } from "mustache";
import html from "./template.html";

function renderSeachbar(containerID, inputID, buttonID) {
  const rendered = Mustache.render(html, {
    containerID,
    inputID,
    buttonID,
  });

  return rendered;
}

export default renderSeachbar;
