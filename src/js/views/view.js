import icons from "url:../../img/icons.svg";
export default class View {
  _data;

  // Display the errorMenssage
  _errorMessage = `we couldn't find that  recipe. Please try another one! 😥😥😥 `;
  _successMessage = `Your recipe it's finded`;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    // console.log(data);
    this._data = data;
    const markUp = this._generateMarkUp();
    console.log(markUp);
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markUp);
  }

  // Load Spinner
  renderSpinner() {
    const spinner = `<div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", spinner);
  }

  // BUG RenderError
  renderError(message = this._errorMessage) {
    const markup = `
          <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  // RenderSuccess Menssage VIDEO
  renderSuccessMenssage(message = this._successMessage) {
    const markup = `
          <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  // Clear ParentElement Recipe
  _clear() {
    this._parentElement.innerHTML = "";
  }
}
