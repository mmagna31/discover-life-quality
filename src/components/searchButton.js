function searchButton() {
  // <button type="submit" class="btn btn-primary mb-3">Confirm identity</button>
  const submitBnt = document.createElement("button");
  submitBnt.setAttribute("type", "submit");
  submitBnt.classList.add("btn", "btn-primary", "mb-3");
  submitBnt.textContent = "Search";

  return submitBnt;
}

export default searchButton;
