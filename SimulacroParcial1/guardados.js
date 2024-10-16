import Serie from "./serie.js";

const contSeriesGuardadas = document.getElementById("seriesGuardadas");
const btnAscendenteId = document.getElementById("ascendenteId");
const btnDescendenteId = document.getElementById("descendenteId");
const btnAscendenteName = document.getElementById("ascendenteName");
const btnDescendenteName = document.getElementById("descendenteName");
let series = JSON.parse(localStorage.getItem("series")) || [];
const idSeries = document.getElementById("seriesGuardadas");

function insertarSeriesHTML() {
  series.forEach((s) => {
    let serie = new Serie(s.id, s.url, s.name, s.language, s.generes, s.image);
    let elementoAct = serie.createHtmlElement();
    contSeriesGuardadas.insertAdjacentHTML("beforeend", elementoAct);

    const contenedorSeries = document.getElementsByClassName("contenedorSerie");
    const parrafos = document.getElementsByClassName("p");
    for (const p of parrafos) {
      p.classList.add("m-0");
    }
     for (const sc of contenedorSeries) {
       sc.classList.add("m-2");
     }
  });
}

insertarSeriesHTML();

btnAscendenteId.addEventListener("click", () => {
  idSeries.innerHTML = "";
  series = series.sort((a, b) => a.id - b.id);
  insertarSeriesHTML();
});

btnDescendenteId.addEventListener("click", () => {
  idSeries.innerHTML = "";
  series = series.sort((a, b) => b.id - a.id);
  insertarSeriesHTML();
});

btnAscendenteName.addEventListener("click", () => {
  idSeries.innerHTML = "";
  series = series.sort((a, b) => a.name.localeCompare(b.name));
  insertarSeriesHTML();
});

btnDescendenteName.addEventListener("click", () => {
  idSeries.innerHTML = "";
  series = series.sort((a, b) => b.name.localeCompare(a.name));
  insertarSeriesHTML();
});
