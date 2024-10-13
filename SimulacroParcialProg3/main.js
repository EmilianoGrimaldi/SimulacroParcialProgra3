import Serie from "./serie.js";

const botonSig = document.getElementById("siguiente");
const botonAnt = document.getElementById("anterior");
const contSeries = document.getElementById("series");

let paginaAct = 1;

async function traerDatosApi(pagina) {
  let listaJson = [];
  const seriesMax = 6;
  let limite = pagina * seriesMax;
  let actual = limite - seriesMax;
  try {
    for (let i = actual; i < limite; i++) {
      let response = await fetch(`https://api.tvmaze.com/shows/${i + 1}`);
      if (response.ok) {
        let jsonObj = await response.json();
        listaJson.push(jsonObj);
      } else {
        limite++;
      }
    }
  } catch (err) {
    console.log(err);
  }

  return listaJson;
}

async function instanciarSeries(pagina) {
  let series = [];
  let lista = await traerDatosApi(pagina);
  for (const s of lista) {
    let serie = Serie.createFromJsonString(s);
    series.push(serie);
  }
  return series;
}

function insertarSeriesHTML(pagina) {
  instanciarSeries(pagina).then((series) => {
    series.forEach((s) => {
      let elementoAct = s.createHtmlElement();
      const btnGuardar = document.createElement("button");
      btnGuardar.style.width = "100px";
      btnGuardar.style.height = "30px";
      btnGuardar.innerText = "Guardar";
      contSeries.insertAdjacentHTML("beforeend", elementoAct);
      const parrafos = document.getElementsByClassName("p");
      const seriesCont = document.getElementsByClassName("contenedorSerie");
      for (const p of parrafos) {
        p.classList.add("m-0");
      }
      for (const sc of seriesCont) {
        sc.classList.add("m-2");
        sc.appendChild(btnGuardar);
      }
      btnGuardar.addEventListener("click", () => {
        guardarSerie(s);
      });
    });
  });
}

function paginaSiguiente(pagina) {
  pagina++;
  const idSeries = document.getElementById("series");
  idSeries.innerHTML = "";
  insertarSeriesHTML(pagina);
  paginaAct = pagina;
}

function paginaAnterior(pagina) {
  if (paginaAct > 1) {
    pagina--;
    const idSeries = document.getElementById("series");
    idSeries.innerHTML = "";
    insertarSeriesHTML(pagina);
    paginaAct = pagina;
  }
}

function guardarSerie(serie) {
  const nuevaSerie = serie;

  let series = JSON.parse(localStorage.getItem("series"));

  if (series === undefined || series === null) {
    series = [];
  }

  let verificacionSerie = series.find((s) => s.id === nuevaSerie.id);

  if (!verificacionSerie) {
    series.push(nuevaSerie);
  }

  localStorage.setItem("series", JSON.stringify(series));
}

insertarSeriesHTML(paginaAct);
botonSig.addEventListener("click", () => paginaSiguiente(paginaAct));

botonAnt.addEventListener("click", () => paginaAnterior(paginaAct));
