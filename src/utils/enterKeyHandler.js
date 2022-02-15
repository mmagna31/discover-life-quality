/* It adds the event to handle the Enter key on searchbar */
function searchbarEnterHandler(inputElem, buttonElem) {
  inputElem.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      buttonElem.click();
    }
  });
}

export default searchbarEnterHandler;
