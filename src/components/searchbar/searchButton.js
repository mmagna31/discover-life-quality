import parseHtmlById from "../../utils/parseHtml.js";

function searchButton(id, textButton) {
  const html = `<button id="${id}" type="submit" class="btn btn-primary me-3" disabled>${textButton}</button>`;

  return parseHtmlById(html, id);
}

export default searchButton;
