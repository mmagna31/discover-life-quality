import html from "./template.html";
import Mustache from "mustache";
import parseHtmlById from "../../utils/parseHtml";

function renderErrObj(errorMsgID, textMessage) {
  const rendered = Mustache.render(html, {
    errorMsgID: errorMsgID,
    textMessage: textMessage,
  });

  return parseHtmlById(rendered, errorMsgID);
}

export default renderErrObj;
