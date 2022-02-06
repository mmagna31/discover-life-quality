/*
<script>
        var exampleEl = document.getElementById('example')
        var tooltip = new bootstrap.Tooltip(exampleEl, {
          boundary: document.body // or document.querySelector('#boundary')
        });
      </script>
       */

import html from "./template.html";
import Mustache from "mustache";
import parseHtmlById from "../../utils/parseHtml";

function renderNavbarObj() {
  const rendered = Mustache.render(html, {
    // cityScoresID: cityScoresID,
    // scoresList: scoresList,
  });

  return parseHtmlById(rendered, "navbar");
}

export default renderNavbarObj;
