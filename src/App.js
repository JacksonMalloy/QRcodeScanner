import React from "react";
import Scanner from "zbar.wasm";
import "./App.css";

const loadImage = async src => {
  //Load image
  const imgBlob = await fetch(src).then(resp => resp.blob());
  const img = await createImageBitmap(imgBlob);

  //Make canvas same size as image
  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;

  //Draw image on to Canvas
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);

  return {
    imageData: ctx.getImageData(0, 0, img.width, img.height),
    width: img.width,
    height: img.height
  };
};

const main = async () => {
  //Create a Scanner Object

  // Add version tag if in production
  const wasm_file_path = "https://cdn.jsdelivr.net/npm/zbar.wasm/data/";
  const scanner = await Scanner({
    locateFile: file => wasm_file_path + file
  });

  const { imageData, width, height } = await loadImage("URL_TO_IMAGE");
  const scanRes = scanner.scanQrcode(imageData, width, height);

  if (scanRes.length > 0) {
    console.log("Find Qrcode: " + scanRes);
  }
};

function App() {
  return (
    <div className="App">
      <button onClick={() => main()}>Click Me</button>
    </div>
  );
}

export default App;
