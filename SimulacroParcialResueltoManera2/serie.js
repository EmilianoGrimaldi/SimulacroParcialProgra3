export default class Serie {
  id;
  url;
  name;
  language;
  generes;
  image;

  constructor(id, url, name, language, generes, image) {
    this.id = id;
    this.url = url;
    this.name = name;
    this.language = language;
    this.generes = generes;
    this.image = image;
  }

  toJsonString() {
    return JSON.stringify(this);
  }

  static createFromJsonString(json) {
    return new Serie(
      json.id,
      json.url,
      json.name,
      json.language,
      json.genres,
      json.image.medium
    );
  }

  guardarSerie() {
    //siempre usar JSON.parse para convertir lo que traigo del localstorage a objeto
    let series = JSON.parse(localStorage.getItem("seriesGuardadas"));

    if (series === null) {
      series = [];
    }

    //devuelve la primer coincidencia me va a dar verdadero, sino devuelve "undefined" que es lo mismo que false
    let encontrado = series.find((s) => s.id === this.id);

    if (!encontrado) {
      series.push(this);
    }

    localStorage.setItem("seriesGuardadas", JSON.stringify(series));
  }

  createHtmlElement() {
    //creacion de elementos
    let contenedorSerie = document.createElement("div");
    let url = document.createElement("a");
    let name = document.createElement("p");
    let language = document.createElement("p");
    let generes = document.createElement("p");
    let image = document.createElement("img");
    let btnGuardar = document.createElement("button");
    btnGuardar.setAttribute("id", "btnGuardar");
    //asignacion
    name.innerText = this.name;
    language.innerText = this.language;
    generes.innerText = this.generes;
    image.src = this.image;
    url.href = this.url;
    url.target = "_blank";

    //estilos
    contenedorSerie.classList.add(
      "m-3",
      "d-flex",
      "flex-column",
      "justify-content-between"
    );
    language.classList.add("m-0");
    generes.classList.add("m-0");
    name.classList.add("m-0");
    btnGuardar.style.width = "90%";
    btnGuardar.style.height = "30px";
    btnGuardar.innerText = "Guardar";
    btnGuardar.classList.add("m-3");

    //construyo la serie
    url.appendChild(image);
    contenedorSerie.appendChild(url);
    contenedorSerie.appendChild(name);
    contenedorSerie.appendChild(language);
    contenedorSerie.appendChild(generes);
    contenedorSerie.appendChild(btnGuardar);

    btnGuardar.addEventListener("click", () => {
      this.guardarSerie();
    });

    return contenedorSerie;
  }
}
