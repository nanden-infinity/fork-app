import icons from "url:../../img/icons.svg";
import View from "./view.js";

class ResultsViews extends View {
  _parentElement = document.querySelector(".results");
  _errorMessage = "No recipe found for your query! plesase try again :)";
  _generateMarkUp() {
    return this._data.map(this._generateMarkUpPreview).join("");
  }
  _generateMarkUpPreview(result) {
    const markup = `
        <li class="preview">
           <a class="preview__link  ${result.id === location.hash.slice(1) ? "preview__link--active" : ""}" href="#${result.id}">
             <figure class="preview__fig">
               <img src="${result.image}" alt="${result.title}" />
             </figure>
             <div class="preview__data">
               <h4 class="preview__title">${result.title}</h4>
               <p class="preview__publisher">${result.publisher}</p>
            </div>
           </a>
        </li>`;
    return markup;
  }
}

export default new ResultsViews();
