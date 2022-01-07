import parseHtmlById from "../../utils/parseHTML.js";

function searchButton(id, textButton) {
  const html = `<button id="${id}" type="submit" class="btn btn-primary mb-3">${textButton}</button>`;

  return parseHtmlById(html, id);
}

export default searchButton;
