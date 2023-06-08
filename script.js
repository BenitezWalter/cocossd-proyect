const inputImagen = document.getElementById("input-imagen");
const imagen = document.getElementById("img");

//fUNCION PARA REMOVER HIGLIGHTER
const removeElements = () => {
  const highlighter = document.getElementsByClassName("highlighter");

  const title = document.getElementsByClassName("title");

  for (let i = highlighter.length - 1; i >= 0; i--) {
    highlighter[i].remove();
    title[i].remove();
  }
};

//Funcion que pinta la imagen en el HTML
inputImagen.addEventListener("change", (event) => {
  if (imagen.src == "./xd.webp") {
    const archivo = event.target.files[0];
    // Crear un objeto URL con la imagen seleccionada
    const urlImagen = URL.createObjectURL(archivo);
    imagen.src = urlImagen;
  } else {
    const archivo = event.target.files[0];

    // Crear un objeto URL con la imagen seleccionada
    const urlImagen = URL.createObjectURL(archivo);

    imagen.src = urlImagen;
    removeElements();
  }
});

//Cargamos el modelo cocossd
cocoSsd.load().then((loadedModel) => {
  model = loadedModel;
});

//Captura el contenedor de la imagen
const imageContainers = document.getElementsByClassName("classifyOnClick");

console.log(imageContainers);
imageContainers[0].children[0].addEventListener("click", handleClick);

//Funcion que hace uso del modelo

function handleClick(event) {
  if (!model) {
    console.log("El modelo esta cargando...");
    return;
  }

  model
    .detect(event.target)

    .then((predictions) => {
      console.log(predictions);

      for (let n = 0; n < predictions.length; n++) {
        //Texto de que es el objeto
        const p = document.createElement("p");
        p.setAttribute("class", "title");
        p.innerText =
          predictions[n].class +
          " - con un " +
          Math.round(parseFloat(predictions[n].score) * 100) +
          "% de confianza.";

        p.style =
          "left: " +
          predictions[n].bbox[0] +
          "px;" +
          "top: " +
          predictions[n].bbox[1] +
          "px; " +
          "width: " +
          (predictions[n].bbox[2] - 10) +
          "px;";

        const highlighter = document.createElement("div");
        highlighter.setAttribute("class", "highlighter");
        highlighter.style =
          "left: " +
          predictions[n].bbox[0] +
          "px;" +
          "top: " +
          predictions[n].bbox[1] +
          "px;" +
          "width: " +
          predictions[n].bbox[2] +
          "px;" +
          "height: " +
          predictions[n].bbox[3] +
          "px;";

        event.target.parentNode.appendChild(highlighter);
        event.target.parentNode.appendChild(p);
      }
    });

  //DEMO 2
}
