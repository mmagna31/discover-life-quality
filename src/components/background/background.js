import img from "./img.jpg";

function renderBackground() {
  const bgrimg = new Image();
  bgrimg.src = img;
  return bgrimg;
}

export default renderBackground;
