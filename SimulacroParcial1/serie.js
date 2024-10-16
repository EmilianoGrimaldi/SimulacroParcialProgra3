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

  static createFromJsonString(obj) {
    let serie = new Serie(
      obj.id,
      obj.url,
      obj.name,
      obj.language,
      obj.genres,
      obj.image.medium
    );
    return serie;
  }

  createHtmlElement() {
    let html = `
    <div class=contenedorSerie>
      <a href=${this.url} target="_blank">
      <img src="${this.image}" alt="${this.name}">
      </a>
      <p class="p">${this.name}</p>
      <p class="p">${this.language}</p>
      <p class="p">${this.generes}</p>
    </div>  
    `;
    return html;
  }
}
