import Mustache, { render } from "mustache";
import parseHtmlById from "../../utils/parseHtml";
import template from "./template.html";

function renderSeachbar(containerID, inputID, buttonID) {
  const rendered = Mustache.render(template, {
    containerID,
    inputID,
    buttonID,
  });

  return parseHtmlById(containerID, rendered);
}

export default renderSeachbar;
