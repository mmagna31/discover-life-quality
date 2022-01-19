import parseHtmlById1 from "../../utils/parseHtml.js";

function scoreDiv(id, title, text, color) {
  const html = `
  <div id=${id} class="rounded border-primary border m-2" style="background:${color}">
    <p>${title}</p>
    <p>${text}</p>
  </div>
  `;

  return parseHtmlById1(html, id);
}

export default scoreDiv;
