function parseHtmlById(htmlString, idElement) {
  const parser = new DOMParser();
  const html = parser.parseFromString(htmlString, "text/html");
  console.log(html);
  return html.getElementById(idElement);
}

export default parseHtmlById;
