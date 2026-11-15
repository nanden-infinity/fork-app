import icons from "url:../../img/icons.svg";
export default class View {
  _data;

  // Display the errorMenssage
  _errorMessage = `we couldn't find that  recipe. Please try another one! 😥😥😥 `;
  _successMessage = `Your recipe it's finded`;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markUp = this._generateMarkUp();
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markUp);
  }

  // Updating Recipe
  update(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const newMarkUp = this._generateMarkUp();
    const newDom = document.createRange().createContextualFragment(newMarkUp);
    const newElements = Array.from(newDom.querySelectorAll("*"));
    const currElements = Array.from(this._parentElement.querySelectorAll("*"));
    newElements.forEach((newEl, i) => {
      const currEl = currElements[i];
      // const isIqual = newEl[i + 13].textContent === currEl[i + 13].textContent;

      const istrue =
        !newEl.isEqualNode(currEl) && newEl.firstChild?.nodeValue.trim() !== "";
      if (istrue) {
        currEl.textContent === newEl.textContent;
      }
      // Updates  the Atrribute
      if (!newEl.isEqualNode(currEl)) {
        const [, attr] = newEl.attributes;
        [attr].forEach((atrr) => {
          if (atrr) {
            currEl.setAttribute(atrr.name, atrr.value);
          }
        });
      }
      // console.log(newEl.isEqualnode(currEl));
      // if (!isIqual) currEl[i + 13].textContent = newEl[i + 13].textContent;
    });
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
