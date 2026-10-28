class SearchView {
  #parantElement = document.querySelector(".search");

  addHandlerSearch(handler) {
    this.#parantElement.addEventListener("submit", (e) => {
      e.preventDefault();
      this.getInput();
      handler();
      this._clearInput();
    });
  }
  getInput() {
    const input = this.#parantElement.querySelector(".search__field");
    const inputValue = input.value;
    // input.value = "";

    return inputValue;
  }
  _clearInput() {
    this.#parantElement.querySelector(".search__field").value = "";
  }
}

export default new SearchView();
