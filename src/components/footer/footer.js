import html from "./template.html";
import Mustache from "mustache";
import parseHtmlById from "../../utils/parseHtml";

function renderFooterObj() {
  // const rendered = Mustache.render(html, {
  //   errorMsgID: errorMsgID,
  //   textMessage: textMessage,
  // });

  return parseHtmlById(html, "footer");
}

export default renderFooterObj;
