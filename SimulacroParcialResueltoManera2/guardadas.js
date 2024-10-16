import Serie from "./serie.js";

const contSeriesGuardadas = document.getElementById("seriesGuardadas");
const btnAscendenteID = document.getElementById("btnAscendenteID");
const btnDescendenteID = document.getElementById("btnDescendenteID");
const btnAscendenteName = document.getElementById("btnAscendenteName");
const btnDescendenteName = document.getElementById("btnDescendenteName");
let series = JSON.parse(localStorage.getItem("seriesGuardadas"));

function cargarSeries() {
  series.forEach((s) => {
    let serie = new Serie(s.id, s.url, s.name, s.language, s.generes, s.image);
    let serieElement = serie.createHtmlElement();
    contSeriesGuardadas.appendChild(serieElement);
    let btnGuardar = document.getElementById("btnGuardar");
    serieElement.removeChild(btnGuardar);
    serieElement.className = "";
  });
}

btnAscendenteID.addEventListener("click", () => {
  contSeriesGuardadas.innerText = "";
  series.sort((a, b) => a.id - b.id);
  cargarSeries();
});
btnDescendenteID.addEventListener("click", () => {
  contSeriesGuardadas.innerText = "";
  series.sort((a, b) => b.id - a.id);
  cargarSeries();
});
btnAscendenteName.addEventListener("click", () => {
  contSeriesGuardadas.innerText = "";
  series.sort((a, b) => a.name.length - b.name.length);
  cargarSeries();
});
btnDescendenteName.addEventListener("click", () => {
  contSeriesGuardadas.innerText = "";
  series.sort((a, b) => b.name.length - a.name.length);
  cargarSeries();
});
cargarSeries();
