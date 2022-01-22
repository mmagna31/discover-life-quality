import Mustache, { render } from "mustache";
import html from "./template.html";

function renderCityBtn(btnID, cityName) {
  const rendered = Mustache.render(html, { btnID, cityName });

  return rendered;
}

export default renderCityBtn;
