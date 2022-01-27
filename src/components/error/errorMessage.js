import _ from "lodash";
import html from "./template.html";
import Mustache from "mustache";

function renderErr(errorMsgID, textMessage) {
  const rendered = Mustache.render(html, {
    errorMsgID: errorMsgID,
    textMessage: textMessage,
  });

  return rendered;
}

export default renderErr;
