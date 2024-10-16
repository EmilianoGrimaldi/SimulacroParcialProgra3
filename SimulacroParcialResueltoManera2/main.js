import Serie from "./serie.js";

let paginaAct = 1;
const seriesPorPag = 6;

const contSeries = document.getElementById("series");
const btnSiguiente = document.getElementById("siguiente");
const btnAnterior = document.getElementById("anterior");

async function traerSeries(pagina) {
  let promesas;
  let seriesJSON = [];
  let limite = pagina * seriesPorPag;
  let actual = limite - seriesPorPag;

  for (let i = actual; i < limite; i++) {
    promesas = await fetch(`https://api.tvmaze.com/shows/${i + 1}`, {
      method: "GET",
    });
    if (promesas.ok) {
      seriesJSON.push(await promesas.json());
    }
  }

  return seriesJSON;
}
function mostrarSeries(paginaAct) {
  traerSeries(paginaAct).then((listaJson) => {
    listaJson.forEach((json) => {
      let serie = Serie.createFromJsonString(json);
      let htmlSerie = serie.createHtmlElement();
      contSeries.appendChild(htmlSerie);
    });
  });
}
btnSiguiente.addEventListener("click", () => {
  contSeries.innerText = "";
  paginaAct++;
  mostrarSeries(paginaAct);
});
btnAnterior.addEventListener("click", () => {
  if (paginaAct > 1) {
    contSeries.innerText = "";
    paginaAct--;
    mostrarSeries(paginaAct);
  }
});

mostrarSeries(paginaAct);
