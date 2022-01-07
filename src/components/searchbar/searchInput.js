import parseHtmlById from "../../utils/parseHTML.js";

function searchInput(id, datalistId) {
  const html = `
    <div class="form-floating">
      <input id="${id}" class="form-control me-2" type="search" list="${datalistId}" aria-label="Search" placeholder="Search">
      <label for="${id}" class="form-label">City</label>
      <datalist id="${datalistId}"></datalist>
    </div>
  `;

  return parseHtmlById(html, id);
}

export default searchInput;
