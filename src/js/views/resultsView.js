import icons from "url:../../img/icons.svg";
import View from "./view.js";

class ResultsViews extends View {
  _parentElement = document.querySelector(".results");
 
  _generateMarkUp() {
    return this._data
      .map((recip) => {
        return `<li class="preview">
            <a class="preview__link preview__link--active" href="#${recip.id}">
            <figure class="preview__fig">
            <img src="${recip.image}" alt="Test" />
            </figure>
            <div class="preview__data">
            <h4 class="preview__title">${recip.title}</h4>
            <p class="preview__publisher">${recip.publisher}</p>
            <div class="preview__user-generated">
            <svg>
            <use href="${icons}#icon-user"></use>
            </svg>
            </div>
            </div>
            </a>
            </li>`;
      })
      .join("");
  }
}

export default new ResultsViews();
