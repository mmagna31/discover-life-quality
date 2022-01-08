import parseHtmlById from "../../utils/parseHtml.js";

function searchInput(id, inputId, datalistId) {
  const html = `
    <div id="${id}" class="form-floating">
      <input id="${inputId}" class="form-control me-2" type="search" list="${datalistId}" aria-label="Search" placeholder="Search">
      <label for="${inputId}" class="form-label">City</label>
      <datalist id="${datalistId}"></datalist>
    </div>
  `;

  return parseHtmlById(html, id);
}

export default searchInput;
